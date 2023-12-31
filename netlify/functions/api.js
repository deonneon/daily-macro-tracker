import express, { Router } from 'express';
import serverless from 'serverless-http';
import mysql from 'mysql';
import cors from 'cors';

const api = express();
api.use(express.json());
const corsOptions = {
    origin: 'https://shimmering-figolla-53e06a.netlify.app',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204,
};

api.use(cors(corsOptions));

const router = Router();
router.get('/hello', (req, res) => res.send('Hello World!'));



const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

router.get('/foods', (req, res) => {
    db.query('SELECT * FROM foods', (err, results) => {
        if (err) {
            console.log(err);
            res.status(500).send('Internal Server Error');
        } else {
            res.json(results);
        }
    });
});

router.get('/dailyDiet', (req, res) => {
    const query = `
    SELECT dailyDiet.id, DATE_FORMAT(dailyDiet.date, "%Y-%m-%d") as date, foods.name, foods.protein, foods.calories, foods.unit
    FROM dailyDiet
    JOIN foods ON dailyDiet.food_id = foods.id
  `;
    db.query(query, (err, results) => {
        if (err) {
            console.log(err);
            res.status(500).send('Internal Server Error');
        } else {
            res.json(results);
        }
    });
});

router.post('/foods', (req, res) => {
    const { name, protein, calories, unit } = req.body;
    const query = 'INSERT INTO foods (name, protein, calories, unit) VALUES (?, ?, ?, ?)';
    db.query(query, [name, protein, calories, unit], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send('Internal Server Error');
        } else {
            res.json({ id: result.insertId, name, protein, calories, unit });
        }
    });
});

router.delete('/foods/:name', (req, res) => {
    const { name } = req.params;
    db.query('DELETE FROM foods WHERE name = ?', [name], (err) => {
        if (err) {
            console.log(err);
            res.status(500).send('Internal Server Error');
        } else {
            res.json({ message: 'Deleted successfully' });
        }
    });
});

router.post('/dailyDiet', (req, res) => {
    console.log(req.body);  // Debug line
    const { date, food_id } = req.body;
    const query = 'INSERT INTO dailyDiet (date, food_id) VALUES (?, ?)';
    db.query(query, [date, food_id], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send('Internal Server Error');
        } else {
            res.json({ id: result.insertId, date, food_id });
        }
    });
});

router.delete('/dailyDiet/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM dailyDiet WHERE id = ?', [id], (err) => {
        if (err) {
            console.log(err);
            res.status(500).send('Internal Server Error');
        } else {
            res.json({ message: 'Deleted successfully' });
        }
    });
});

api.use('/api/', router);

export const handler = serverless(api);