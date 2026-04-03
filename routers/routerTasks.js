//URL: /api/tasks
const express = require('express');

//se deberá cambiar la lógica del almacenamiento al momento de implementar la DB.
const tasks = require('../tareas/mis-tareas.json');

const routerTasks = express.Router();

const validKeys = ['id','nombre','estado','fecha-objetivo','categoria'];

//filtra solamente por categoria
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
    try{
        const newTasks = req.body;
        //status: 400 Bad request.
        if(!Array.isArray(newTasks)){
                res.status(400).json({
                error: 'se esperaba un array de tareas'
            });
            throw new Error('El cuerpo de la solicitud no es un array.');
        }
        
        newTasks.forEach((currTask) => {
            const keys = Object.keys(currTask);
            
            if(keys.length != validKeys.length){
                res.status(400).json({
                    msg: 'Error: Objeto invalido.'
                });
                throw new Error('Objeto invalido.');
            }

            keys.forEach((currKey) => {
                if(!(validKeys.includes(currKey))){
                        res.status(400).json({
                            msg: `Error: Clave '${currKey}' no valida.`
                        });
                        throw new Error('Clave no valida.');
                }
            });
        });

        tasks.push(...newTasks);
    }

    catch(e){
        console.log('Fallo en la creación del elemento. ', e);
        return;
    }

    //status: 201 Created.
    res.status(201).json({
        msg: 'Se han agregado las tareas correctamente.',
        tareas: tasks
    });

});

routerTasks.put('/:id', (req,res) => {
    try{
        const taskID = req.params.id;
        
        if(taskID < 0){
            res.status(400).json({
                msg: 'Error: ID de la tarea invalido.'
            });
            throw new Error('ID invalido.');
        }

    }

    catch(e){
        console.log('Fallo al actualizar el/los elementos. ',e);
        return;
    }

    //status: 200 OK.
    res.status(200).json({
        msg: 'Se han actualizado las tareas correctamente.',
        tareas: tasks
    });
    
});

 module.exports = routerTasks;