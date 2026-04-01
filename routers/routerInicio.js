 const express = require('express');

 const routerInicio = express.Router();

 routerInicio.get('/', (req,res) => {
    res.send('Devolviendo INICIO');
 });

 module.exports = routerInicio;