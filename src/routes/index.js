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
  if(regU.clave == regU.clave2){
      var esto={
      method: 'POST',
      body: JSON.stringify(regU),
      headers:{
        'Content-type' : "application/json"
      }
    };
    console.log(esto);
    fetch('http://192.168.43.107:3000/addUser',esto)
    .then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(data => {
      console.log(data)
    }),
    res.send(esto);

  }else {
    console.log("las contraceñas no son iguales");
    res.send("las contraceñas no son iguales");
  }
});

router.get('/userlist',(req, res, next)=>{

    fetch('http://192.168.43.107:3000/usersGET')
    .then(resp => resp.json())
    .then(resp =>{
        //console.log(resp)
        res.render('mostrarUser',{
          resp : resp
        });
    });
});

router.get('/turn/:id',(req, res, next) => {
  var ruta =  req.url
  fetch('http://192.168.43.107:3000'+ruta)
  .then(resp => resp.json())
  .catch(error => console.error('Error:', error))
  .then(resp =>{
      console.log(resp);
      res.redirect('/userlist');
  });

});

router.get('/delUser/:id', async (req, res) => {
  var delR = req.url;
  fetch('http://192.168.43.107:3000'+delR)
  .then(resp => resp.json())
  .catch(error => console.error('Error:', error))
  .then(resp =>{
      console.log(resp);
      res.redirect('/userlist');
  });
});



module.exports = router;
