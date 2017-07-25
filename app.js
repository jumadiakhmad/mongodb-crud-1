const express = require('express'),
      bodyParser = require('body-parser'),
      logger = require('morgan'),
      index = require('./routes/index'),
      books = require('./routes/api/books');


var app = express();

app.use(logger('dev'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));
app.use('/', index);
app.use('/books', books);

app.listen(3000)
