const mysql = require('mysql');

const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
});

exports.handler = async function (event, context) {
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Method Not Allowed' };
    }

    const { name, protein, calories, unit } = JSON.parse(event.body);
    const query = 'INSERT INTO foods (name, protein, calories, unit) VALUES (?, ?, ?, ?)';

    return new Promise((resolve) => {
        db.query(query, [name, protein, calories, unit], (err, result) => {
            if (err) {
                resolve({
                    statusCode: 500,
                    body: JSON.stringify({ error: 'Internal Server Error' }),
                });
            } else {
                resolve({
                    statusCode: 200,
                    body: JSON.stringify({ id: result.insertId, name, protein, calories, unit }),
                });
            }
        });
    });
};
