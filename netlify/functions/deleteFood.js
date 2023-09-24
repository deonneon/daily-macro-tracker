const mysql = require('mysql');

const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
});

exports.handler = async function (event, context) {
    if (event.httpMethod !== 'DELETE') {
        return { statusCode: 405, body: 'Method Not Allowed' };
    }

    const { name } = JSON.parse(event.body);

    return new Promise((resolve) => {
        db.query('DELETE FROM foods WHERE name = ?', [name], (err) => {
            if (err) {
                resolve({
                    statusCode: 500,
                    body: JSON.stringify({ error: 'Internal Server Error' }),
                });
            } else {
                resolve({
                    statusCode: 200,
                    body: JSON.stringify({ message: 'Deleted successfully' }),
                });
            }
        });
    });
};
