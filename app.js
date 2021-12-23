const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const express = require('express');
const register = require('@react-ssr/express/register');
const cors = require('cors')
const server = express();
const fetch = require('node-fetch');
const ReactDOMServer = require('react-dom/server');

const index = require('./routes.js');
const db1 = require('./db1.js');

(async () => {
  await register(server);

server.set('views', path.join(__dirname, 'views'));
server.set('view engine', 'jsx'); 

server.get('/favicon.ico', function(req, res) { 
  res.sendStatus(204); 
});

server.use(logger('dev'));
server.use(express.json());
server.use(express.urlencoded({ extended: false }));
server.use(cookieParser());
server.use(cors({ origin: true, credentials: true }));
  

/*server.get('/a', function(req, res, next) {
  let href = "https://spreadsheets.google.com/feeds/list/18GAUw1YmWC2pcCug6jqU_atcIn51fQSrDLNmcuqdoP8/od6/public/values?alt=json"
  fetch(href)
      .then(response => response.json())
      .then(data => { res.json (data) })
	    .catch(err => res.status(404).json(err))
});*/

server.use('/', db1);
server.use('/', index);

server.use(function(req, res, next) {
  next(createError(404));
});

// error handler
server.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  //res.locals.error = req.server.get('env') === 'development' ? err : {};
  res.locals.error = err;
  
  // render the error page
  res.status(err.status || 500);
  res.render('./error');
});

})();


module.exports = server;