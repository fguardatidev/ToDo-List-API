 const express = require('express');

const tasks = require('../tareas/mis-tareas.json');

 const routerTasks = express.Router();

 routerTasks.get('/', (req,res) => {
    res.send(tasks);
 });


routerTasks.get('/categoria', (req,res) => {
    const {cat} = req.params;
    res.send("categoria");
});


//agregar manejo de errores
routerTasks.get('/categoria/:cat', (req,res) => {
    const {cat} = req.params;
    console.log(`La categoria solicitada es: ${cat}`);
    res.send(tasks.filter(task => task.categoria === cat));
});

 module.exports = routerTasks;