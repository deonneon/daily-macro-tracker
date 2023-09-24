// Import required packages
import express, { Router } from 'express';
import mysql from 'mysql';
import cors from 'cors';
import bodyParser from 'body-parser';
import serverless from 'serverless-http';

// Initialize express and other settings
const api = express();

const corsOptions = {
    origin: 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204,
};

api.use(cors(corsOptions));
api.use(bodyParser.json());

// Database setup
const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
});

// Define API routes
const router = Router();

router.get('/foods', /* your logic here */);
router.get('/dailyDiet', /* your logic here */);
router.post('/foods', /* your logic here */);
router.delete('/foods/:name', /* your logic here */);
router.post('/dailyDiet', /* your logic here */);
router.delete('/dailyDiet/:id', /* your logic here */);

api.use('/api/', router);

// Export for serverless
export const handler = serverless(api);
