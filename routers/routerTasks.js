//URL: /api/tasks
const express = require('express');

//se deberá cambiar la lógica del almacenamiento al momento de implementar la DB.
const tasks = require('../tareas/mis-tareas.json');

const routerTasks = express.Router();

const validKeys = ['userid','id','nombre','estado','fecha-objetivo','categoria'];

const {getTaskByUser, getTaskByUserCat} = require('../models/tasksModel.js');

routerTasks.get('/user/:userid',getTaskByUser);

routerTasks.get('/user/:userid/cat/:categoria',getTaskByUserCat);

//filtra por usuario y task ID
routerTasks.get('/user/:userid/task/:taskid', (req,res) => {
    const userID = req.params.userid;
    const taskid = req.params.taskid;

    try{
        let result = tasks.filter((elem) => elem.userid == userID && elem.id == taskid);

        if(result.length > 0){
            res.status(200).json({
                msg: `Devolviendo tareas del usuario con ID ${userID} y ID de tarea ${taskid}`,
                tasks: result
            })
        } else{
             res.status(204).end();
        }
    }

    catch(e){
        res.status(500).json({
            msg: 'Error del servidor.'
        });
        console.log('Error interno');
    }
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
        const data = req.body;
        const dataKeys = Object.keys(data);

        if(taskID < 0){
            res.status(400).json({
                msg: 'Error: ID de la tarea invalido.'
            });
            throw new Error('ID invalido.');
        }

        //pasada para verificar todas las claves incluidas en el body.
        //NO se permite el campo ID dentro del body de la request.
        dataKeys.forEach((key) => {
            if(!(validKeys.includes(key)) || key.toLowerCase() == "id"){
                res.status(400).json({
                    msg: `Error: Clave ${key} no valida.`
                });
                throw new Error('Clave no valida.');
            }
        });

        //pasada para actualizacion de las claves
        const targetTaskIndex = tasks.findIndex(elem => elem.id == taskID);
        if(targetTaskIndex < 0){
            res.status(404).json({
                msg: `Error: No se encontro ninguna tarea con el ID ${taskID}.`
            });
            throw new Error('Tarea no encontrada.');
        }

        dataKeys.forEach((key) => {
            console.log(targetTaskIndex);
            tasks[targetTaskIndex][key] = data[key];
        });
    }

    catch(e){
        console.log('Fallo al actualizar el/los elementos. ',e);
        return;
    }

    //status: 200 OK.
    res.status(200).json({
        msg: 'Se ha actualizado la tarea correctamente.',
        tareas: tasks
    });
    
});

routerTasks.delete('/:id', (req,res) => {
    const taskID = req.params.id;
    try{
        const targetTaskIndex = tasks.findIndex((elem) => elem.id == taskID);
    
        if(targetTaskIndex < 0){
            res.status(404).json({
                msg: `Error: No se encontro ninguna tarea con el ID ${taskID}.`
            });
            throw new Error('Tarea no encontrada.');
        }

        tasks.splice(targetTaskIndex,1);
    }

    catch(e){
        console.log('Fallo al actualizar el/los elementos. ',e);
        return;
    }

    //status: 200 OK.
    res.status(200).json({
        msg: `Se ha eliminado la tarea con ID ${taskID}.`,
        tareas: tasks
    });
})

 module.exports = routerTasks;