var express =  require ('express');
var bodyParser = require('body-parser');

var homeController = require('../app/controllers/home')();

module.exports = function(){
    var app = express();

    app.set('port', 3000);//Porta da aplicação
    app.use(express.static('./public'));
    app.use(bodyParser.text()); //Devolve texto para nossa aplicação

    app.get('/', );
    app.get('/metrics', homeController.index);
    return app;
}


