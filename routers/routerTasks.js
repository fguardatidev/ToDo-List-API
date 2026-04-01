const express = require('express');

const tasks = require('../tareas/mis-tareas.json');

const routerTasks = express.Router();

//agregar manejo de errores
routerTasks.get('/', (req,res) => {
    const {cat} = req.query;
    console.log(`La categoria solicitada es: ${cat}`);
    
    let result = null;

    if(cat == null){
         result = tasks;
    } else {
         result = tasks.filter(task => task.categoria === cat);
    }

    if(result.length > 0){
        res.send(result);
    } else{
        //status: 204 No content.
        res.sendStatus(204);
    }
    console.log(req.query);
});

//acepta unicamente un array
routerTasks.post('/',(req,res) => {
    const newTasks = req.body;

    //status: 400 Bad request.
    if(!Array.isArray(newTasks)){
        res.status(400).json({
            error: "se esperaba un array de tareas"
        });
    }

    tasks.push(...req.body)

    console.log(tasks);

    //status: 201 Created.
    res.status(201).json({
        msg: "Se han agregado las tareas correctamente.",
        tareas: tasks
    });

});

 module.exports = routerTasks;