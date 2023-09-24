import express, { Router } from 'express';
import serverless from 'serverless-http';
import mysql from 'mysql';

const api = express();

const router = Router();
router.get('/hello', (req, res) => res.send('Hello World!'));

const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

router.get('/food', (req, res) => {
    db.query('SELECT * FROM foods', (err, results) => {
        if (err) {
            console.log(err);
            res.status(500).send('Internal Server Error');
        } else {
            res.json(results);
        }
    });
});

api.use('/api/', router);

export const handler = serverless(api);