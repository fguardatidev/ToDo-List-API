const mysql = require('mysql2/promise');

const db = mysql.createPool({
    host: '192.168.1.41',
    user: 'api',
    password: '12345678',
    database: 'todolistdb',
    port: 3306
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