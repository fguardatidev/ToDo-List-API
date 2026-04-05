const mysql = require('mysql2/promise');

const db = mysql.createPool({
    host: 'localhost',
    user: 'api',
    password: '12345678',
    database: 'todolistdb'
});

(
    async () => {
        try{
            const connection = await db.getConnection();
            console.log('Base de datos conectada!');
            connection.release();
        }

        catch(e){
            console.log('Error al conectar la base de datos: ', e);
        }
    }
)();

module.exports = db;