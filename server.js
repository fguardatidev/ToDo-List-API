const express = require('express');

const db = require('./database/connection.js');

const app = express();
const PORT = 3000;

//ejemplo de query
function dbTest(req,res) {
    db.query(
      'SELECT * FROM users'
    ,
    (err,results,fields) => {
      if(err){
        throw err;
      }
      console.log(results);
    }
  );
  res.status(200).send();
}



app.use(express.json());

//Routers
const routerInicio = require('./routers/routerInicio.js');
app.use('/api/inicio',routerInicio);

const routerTasks = require('./routers/routerTasks.js');
app.use('/api/tasks',routerTasks);

app.get('/api/dbtest', dbTest);

//Server
app.listen(PORT, () => {
  console.log(`Tasks managment API listening on port ${PORT}!`);
});
