const mysql = require('mysql');

const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
});

exports.handler = async function (event, context) {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM foods', (err, results) => {
            if (err) {
                resolve({
                    statusCode: 500,
                    headers: {
                        "Access-Control-Allow-Origin": "http://localhost:3000",
                        "Access-Control-Allow-Methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
                        "Access-Control-Allow-Credentials": "true",
                    },
                    body: JSON.stringify({ error: 'Internal Server Error' }),
                });
            } else {
                resolve({
                    statusCode: 200,
                    headers: {
                        "Access-Control-Allow-Origin": "http://localhost:3000",
                        "Access-Control-Allow-Methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
                        "Access-Control-Allow-Credentials": "true",
                    },
                    body: JSON.stringify(results),
                });
            }
        });
    });
};
