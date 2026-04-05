const express = require('express');
const db = require('../database/connection.js');

async function getTaskByUser(req,res){
    const userID = req.params.userid;

    try{
      const [results] = await db.query(
            `SELECT T.taskID,T.taskName,t.taskDescription,C.nameCat,T.expDate
             FROM tasks AS T 
             JOIN users AS U
             JOIN categories AS C
             ON T.userID = U.userID AND T.catID = C.idCat
             WHERE U.userID = ?`,
            [userID]
        );
        
        if(results.length < 0){
            res.status(204).end();
        }

        res.status(200).json({
            results
        });
    }

    catch(e){
        res.status(500).json({
            msg: 'Error al obtener las tareas.'
        });
        console.error(e);
    }
 
}

module.exports = {
    getTaskByUser
};