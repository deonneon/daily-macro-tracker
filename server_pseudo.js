const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Mock data
const foods = [
    { id: 1, name: 'Apple', protein: 0.3, calories: 52, unit: '100g' },
    { id: 2, name: 'Banana', protein: 1.3, calories: 89, unit: '100g' },
];

const dailyDiet = [
    { id: 1, date: '2023-09-23', food_id: 1 },
    { id: 2, date: '2023-09-23', food_id: 2 },
];

// API Routes

// Get all foods
app.get('/foods', (req, res) => {
    res.json(foods);
});

// Get all daily diets
app.get('/dailyDiet', (req, res) => {
    res.json(dailyDiet);
});

// Add a new food (Mock)
app.post('/foods', (req, res) => {
    const newFood = { id: foods.length + 1, ...req.body };
    foods.push(newFood);
    res.json(newFood);
});

// Delete a food (Mock)
app.delete('/foods/:name', (req, res) => {
    const { name } = req.params;
    const index = foods.findIndex(food => food.name === name);
    if (index !== -1) {
        foods.splice(index, 1);
    }
    res.json({ message: 'Deleted successfully' });
});

// Add a new daily diet entry (Mock)
app.post('/dailyDiet', (req, res) => {
    const newEntry = { id: dailyDiet.length + 1, ...req.body };
    dailyDiet.push(newEntry);
    res.json(newEntry);
});

// Delete a daily diet entry (Mock)
app.delete('/dailyDiet/:id', (req, res) => {
    const { id } = req.params;
    const index = dailyDiet.findIndex(entry => entry.id === parseInt(id));
    if (index !== -1) {
        dailyDiet.splice(index, 1);
    }
    res.json({ message: 'Deleted successfully' });
});

// Start server
app.listen(3001, () => {
    console.log('Server running on http://localhost:3001');
});
