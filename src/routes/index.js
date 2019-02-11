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
//     direccion: req.body.direccion,
//     captcha: req.body['g-recaptcha-response']
//   };
//   var esto={
//   method: 'POST',
//   body: JSON.stringify(captchaUser),
//   headers:{
//     'Content-type' : "application/json"
//   }
// };
//   fetch('http://192.168.43.107:3000/reCAPTCHA',esto)
//   .then(res => res.json())
//   .catch(error => console.error('Error:', error))
//   .then(data => {
//     console.log(data);
//     res.send(data);
//   })
//
// });

// este servicio sirve para añadir usarios y incluye captcha
router.post('/addUser', (req, res) => {
  var regU = {
    nombre: req.body.nombre,
    apellidoP: req.body.apellidoP,
    apellidoM: req.body.apellidoM,
    email: req.body.email,
    clave: req.body.clave,
    clave2: req.body.clave2,
    celular: req.body.celular,
    direccion: req.body.direccion,
    captcha: req.body['g-recaptcha-response']
  };
  if(regU.clave == regU.clave2){
      var esto={
      method: 'POST',
      body: JSON.stringify(regU),
      headers:{
        'Content-type' : "application/json"
      }

    };
    fetch('http://localhost:3000/reCAPTCHA',esto)
    .then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(data => {
      console.log(data);
      mensaje = data.msn;
      if(mensaje == "enviado"){
        res.redirect('/userlist');
      }else {
        res.send(data);
      }
    })

  }else {
    console.log("las contraseñas no son iguales");
    res.send("las contraseñas no son iguales");
  }
});

// este servicio sirve para mostrar todos los usarios
router.get('/userlist',(req, res, next)=>{

    fetch('http://localhost:3000/usersGET')
    .then(resp => resp.json())
    .then(resp =>{
        //console.log(resp)
        console.log(recuperar);
        res.render('mostrarUser',{
          resp : resp
        });
    });
});

router.get('/listaUser',(req, res, next)=>{

    fetch('http://localhost:3000/usersGET')
    .then(resp => resp.json())
    .then(resp =>{
        res.status(200).json(resp);
    });
});
// este servicio sirve para cambiar el estado de un usario
router.get('/turn/:id',(req, res, next) => {
  var ruta =  req.url
  fetch('http://localhost:3000'+ruta)
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
  fetch('http://localhost:3000'+delR)
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
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
router.get('/mostrarinsertar', (req, res) =>{
  res.render('zinsertarP');
});

//<<<>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
var recuperar;
router.get('/test',(req, res, next)=>{

    fetch('http://localhost:3000/getP')
    .then(resp => resp.json())
    .then(resp =>{
        //console.log(resp)
        recuperar = resp;
        console.log(recuperar);
        res.send(resp);
    });
});

//>>>>>>>>>>>>>>>>>>>>>>>>>>><
router.post('/test', (req, res) => {
  var test1 = {
    name: req.body.name,
    price: req.body.price,
    description: req.body.description
  };
  var esto={
  method: 'POST',
  body: JSON.stringify(test1),
  headers:{
    'Content-type' : "application/json"
  }
};
  fetch('http://localhost:3000/addUser1',esto)
  .then(res => res.json())
  .catch(error => console.error('Error:', error))
  .then(data => {
    console.log(data);
    res.redirect('/mostrarinsertar');
  })

});

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
router.get('/mostrarPrueva', (req, res) =>{
  res.render('enviar');
});

//rutas de envio
router.post('/enviar',(req ,res) => {
  console.log(recuperar);

  for(var i=0; i < recuperar.length; i++){
    var loger={
    method: 'POST',
    body: JSON.stringify(recuperar[i]),
    headers:{
      'Content-type' : "application/json"
     }
    };
    fetch('http://localhost:3000/addUser2', loger)
    .then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(data => {
      if(error){
        res.send(error);
      }else{
        console.log(data);
        res.redirect('/mostrarPrueva');        
      }
    })
  }

});



module.exports = router;
