const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'api',
    password: '12345678',
    database: 'todolistdb'
});

db.connect((err) => {
    if(err) {
        console.log(err);
    } else {
        console.log('Base de datos conectada!');
    }
});

module.exports = db;