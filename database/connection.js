const mysql = require('mysql2/promise');

const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
});

(
    async () => {
        try{
            console.log('Realizando conexión con la base de datos...');
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