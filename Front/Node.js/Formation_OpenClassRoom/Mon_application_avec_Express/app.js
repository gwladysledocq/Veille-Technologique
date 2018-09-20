var express = require('express');
var morgan = require('morgan'); // Charge le middleware de logging
var favicon = require('serve-favicon'); // Charge le middleware de favicon

var app = express();

app.get('/', function(req, res) {
    res.setHeader('Content-Type', 'text/plain');
    res.send('Vous �tes � l\'accueil, que puis-je pour vous ?');
});

// Routes simples

app.get('/sous-sol', function(req, res) {
    res.setHeader('Content-Type', 'text/plain');
    res.send('Vous �tes dans la cave � vins, ces bouteilles sont � moi !');
});

app.get('/etage/1/chambre', function(req, res) {
    res.setHeader('Content-Type', 'text/plain');
    res.send('H� ho, c\'est priv� ici !');
});

// Routes dynamiques avec template

app.get('/etage/:etagenum/chambre', function(req, res) {
    res.render('chambre.ejs', {etage: req.params.etagenum});
});

app.get('/compter/:nombre', function(req, res) {
    var noms = ['Robert', 'Jacques', 'David'];
    res.render('page.ejs', {compteur: req.params.nombre, noms: noms});
});

// Les middlewares

app.use(morgan('combined')) // Active le middleware de logging
.use(express.static(__dirname + '/public')) // Indique que le dossier /public contient des fichiers statiques (middleware charg� de base)
.use(favicon(__dirname + '/public/favicon.ico')) // Active la favicon indiqu�e
.use(function(req, res){ // R�pond enfin
    res.send('Hello');
});

app.listen(8080);

// Erreur

app.use(function(req, res, next){
    res.setHeader('Content-Type', 'text/plain');
    res.status(404).send('Page introuvable !');
});

app.listen(8181);