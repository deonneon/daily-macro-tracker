const mysql = require('mysql');

const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
});

exports.handler = async function (event, context) {
    return new Promise((resolve, reject) => {
        const query = `
        SELECT dailyDiet.id, DATE_FORMAT(dailyDiet.date, "%Y-%m-%d") as date, foods.name, foods.protein, foods.calories, foods.unit
        FROM dailyDiet
        JOIN foods ON dailyDiet.food_id = foods.id
    `;
        db.query(query, (err, results) => {
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
