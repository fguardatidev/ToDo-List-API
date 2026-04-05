const express = require('express');
const db = require('../database/connection.js');

function getTaskByUser(req,res){
    const userID = req.params.userid;

    db.query(
        'SELECT * FROM tasks AS T JOIN users AS U ON T.userID = U.userID WHERE U.userID = ?',
        [userID],
        (err,results,fields) => {
            if(err){
                throw new Error(err);
            }
            console.log(results);
        }
    );

    res.status(200).send(); 
}

module.exports = {
    getTaskByUser
};