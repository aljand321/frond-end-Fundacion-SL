const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
var bodyParser = require('body-parser');

var Recaptcha = require('express-recaptcha').Recaptcha;

var recaptcha = new Recaptcha('6LdxcI8UAAAAANEc3nAaTTbMcJI1Fe-0DeNsasrD', '6LdxcI8UAAAAAJ-RuzN-uXXvvSLGlIoTOYJVQv_B');

router.get('/', (req, res) => {
  res.render('index');
});

//servicio para cambiar de pestaña
router.get('/regUSer', (req, res) => {
   res.render('regUSer');
});
//mostrar login
router.get('/log', (req, res) => {
   res.render('login');
});
//prueva

// router.post('/reCapcha1', (req, res) => {
//   var captchaUser = {
//     nombre: req.body.nombre,
//     apellidoP: req.body.apellidoP,
//     apellidoM: req.body.apellidoM,
//     email: req.body.email,
//     clave: req.body.clave,
//     clave2: req.body.clave2,
//     celular: req.body.celular,
//     direccion: req.body.direccion
//     //captcha: recaptcha.verify(req, function(error, data))
//   };
//   var esto={
//   method: 'POST',
//   body: JSON.stringify(captchaUser),
//   headers:{
//     'Content-type' : "application/json"
//   }
// };
//   fetch('http://192.168.43.107:3000/reCAPTCHA1',esto)
//   .then(res => res.json())
//   .catch(error => console.error('Error:', error))
//   .then(data => {
//     console.log(data);
//     res.send(data);
//   })
//
// });
// este servicio sirve para añadir usarios
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
    fetch('http://192.168.43.107:3000/addUser',esto)
    .then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(data => {
      console.log(data);
      mensaje = data.msn;
      if(mensaje == "enviado"){
        res.redirect('/userlist');
      }else {
        res.send(mensaje);
      }
    })

  }else {
    console.log("las contraceñas no son iguales");
    res.send("las contraceñas no son iguales");
  }
});

// este servicio sirve para mostrar todos los usarios
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

router.get('/listaUser',(req, res, next)=>{

    fetch('http://192.168.43.107:3000/usersGET')
    .then(resp => resp.json())
    .then(resp =>{
        res.status(200).json(resp);
    });
});
// este servicio sirve para cambiar el estado de un usario
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

//Este servicio sirve para elminar un usario
router.get('/delUser/:id', (req, res) => {
  var delR = req.url;
  fetch('http://192.168.43.107:3000'+delR)
  .then(resp => resp.json())
  .catch(error => console.error('Error:', error))
  .then(resp =>{
      console.log(resp);
      res.redirect('/userlist');
  });
});

//login
router.post('/login',(req, res) => {
  var userL = {
    email: req.body.email,
    clave: req.body.clave
  };
  var loger={
  method: 'POST',
  body: JSON.stringify(userL),
  headers:{
    'Content-type' : "application/json"
   }
  };
  fetch('http://localhost:3000/sessions', loger)
  .then(res => res.json())
  .catch(error => console.error('Error:', error))
  .then(data => {
    console.log(data);
    res.redirect('/log');
  })
});

//captcha
router.post('/reCAPTCHA', (req, res) => {
  var cap = {
    nombre: req.body.nombre,
    apellidoP: req.body.apellidoP,
    apellidoM: req.body.apellidoM,
    email: req.body.email,
    clave: req.body.clave,
    clave2: req.body.clave2,
    celular: req.body.celular,
    direccion: req.body.direccion,
    captcha: req.body.captcha
  };
  var enviarCaptcha = {
    method: 'POST',
    body: JSON.stringify(cap),
    headers:{
      'Content-type':'application/json'
     }
  };
  fetch('http://localhost:3000/reCAPTCHA',enviarCaptcha)
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
    mensaje = data.msn;
    if(mensaje == "enviado"){
      res.status(200).json({
                "msn" : data
              });

    }else {
      res.status(200).json({
                "msn" : data
              });
    }
    // res.status(200).json({
    //           "msn" : data
    //         });
  });
});



module.exports = router;
