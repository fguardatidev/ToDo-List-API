const express = require('express');


const app = express();
const PORT = 3000;

app.use(express.json());

//Routers
const routerInicio = require('./routers/routerInicio.js');
app.use('/api/inicio',routerInicio);

const routerTasks = require('./routers/routerTasks.js');
app.use('/api/tasks',routerTasks);

//Server
app.listen(PORT, () => {
  console.log(`Tasks managment API listening on port ${PORT}!`);
});