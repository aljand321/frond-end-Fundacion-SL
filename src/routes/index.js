const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
var bodyParser = require('body-parser');

router.get('/', (req, res) => {
  res.render('index');
});

//servicio para cambiar de pestaña
router.get('/regUSer', (req, res) => {
  res.render('regUSer');
});

router.post('/addUser', (req, res) => {
  var regU = {
    nombre: req.body.nombre,
    apellidoP: req.body.apellidoP,
    apellidoM: req.body.apellidoM,
    email: req.body.email,
    clave: req.body.clave,
    clave2: req.body.clave2,
    celular: req.body.celular,
    direccion: req.body.direccion

  };
  //convertir a un objeto para que envie los dotos
  var esto={
    method: 'POST',
    body: JSON.stringify(regU),
    headers:{
      'Content-type' : "application/json"
    }
  };
  console.log(esto);
  fetch('http://192.168.43.107:3000/userReg',esto)
  .then(res => res.json())
  .catch(error => console.error('Error:', error))
  .then(data => {
    console.log(data)
  }),
  res.send(esto);

});
module.exports = router;
