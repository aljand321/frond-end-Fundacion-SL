const path = require('path');
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');

const app = express();

//este codigo conenta a la base de datos
mongoose.connect('mongodb://localhost/USer')
 .then(db => console.log('Db connected'))
 .catch(err => console.log('err'));

//importing routes
const indexRoutes = require('./routes/index');

// seting
app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs', 'css', 'js');

app.use(express.static("public"));

//app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));

//routes
app.use('/', indexRoutes);

//starting the server
app.listen(app.get('port'), () => {
  console.log(`Server on port ${app.get('port')}`);
});
