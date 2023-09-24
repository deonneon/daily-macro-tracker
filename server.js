const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();


const corsOptions = {
    origin: 'http://localhost:3000',  // my frontend server
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204
};

app.use(cors(corsOptions));

app.use(bodyParser.json());

// Database setup
// Running the command creatConnection() failed as it would cause a timeout issue ERRORREST paired with listen command
// swithing to createPool help with keeping that connection alive. 
const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

// API Routes

// Get all foods
app.get('/foods', (req, res) => {
    db.query('SELECT * FROM foods', (err, results) => {
        if (err) {
            console.log(err);
            res.status(500).send('Internal Server Error');
        } else {
            res.json(results);
        }
    });
});

// Get all daily diets
app.get('/dailyDiet', (req, res) => {
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

// Add a new food
app.post('/foods', (req, res) => {
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

// Delete a food
app.delete('/foods/:name', (req, res) => {
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

// Add a new daily diet entry
app.post('/dailyDiet', (req, res) => {
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

// Delete a daily diet entry
app.delete('/dailyDiet/:id', (req, res) => {
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


app.get("/", (req, res) => {
    // listen for the 'close' event on the request
    req.on("close", () => {
        console.log("closed connection");
    });

    console.log(res.socket.destroyed); // true if socket is closed
});


// Start server
app.listen(3001, () => {
    console.log('Server running on http://localhost:3001');
});


