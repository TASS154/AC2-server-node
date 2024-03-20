var http = require('http');
var url = require('url');
const fs = require('fs');
const express = require ('express');
const path  = require('path');
const { urlencoded } = require('body-parser');

var app=express();
const port = 3000;

const bioPath = path.join(___dirname, 'biologia.json')
const quiPath = path.join(___dirname, 'quimica.json')
const fisPath = path.join(___dirname, 'fisica.json')

app.use(express.json)
app.use(urlencoded ({extended: true}))

let bioData = fs.readFileSync(bioPath,'utf8');
let quiData = fs.readFileSync(quiPath,'utf8');
let fisData = fs.readFileSync(fisPath,'utf8');
let biologia = JSON.parse(bioData);
let quimica =  JSON.parse(quiData);
let fisica = JSON.parse(fisData);

function lerJson(res, file) {
    fs.readFile(file, function(err, data) {
        res.end(data)
    });
}


function buscarAssunto(nome) {

    return

}


function callback(req, res) {

    response.writeHead(200, {"Content-type": "application/json; charset=utf-8"})

    var parts = url.parse(request.url);
    var path = part.path;

    if(path == '/biologia') {

        lerJson (response,"biologia.json");
    } else
    if(path == '/quimica') {

        lerJson (response,"quimica.json");
    } else 
    if(path == '/fisica') {

        lerJson (response,"fisica.json");
    } else {
        response.end("caminho não encontrado: " + path);
    }
 

}



function SalvarB() {
    fs.writeFileSync(bioPath ,JSON.stringify(biologia, null, 2))
}
function SalvarQ() {
    fs.writeFileSync(quiPath ,JSON.stringify(quimica, null, 2))
}
function SalvarF() {
    fs.writeFileSync(fisPath ,JSON.stringify(fisica, null, 2))
}



app.get('/adicionar-assunto-biologia', (req, res) => {
    res.sendFile(path.join(__dirname + '/addbio'));
});
app.get('/adicionar-assunto-quimica', (req, res) => {
    res.sendFile(path.join(__dirname + '/addqui'));
});
app.get('/adicionar-assunto-fisica', (req, res) => {
    res.sendFile(path.join(__dirname + '/addfis'));
});




app.post('/adicionar-assunto-biologia', (req, res) => {
    const novoAssunto  = req.body;

    if (biologia.find(biologia => biologia.nome.toLowerCase() === novoAssunto.nome.toLowerCase())) {
        res.send("<h1>Este assunto já existe!</h1>");
        return;
    }

    biologia.push(novoAssunto);

    SalvarB();

    res.send("<h1>Assunto adicionado com sucesso!</h1>");

});



app.post('/adicionar-assunto-biologia', (req, res) => {
    const novoAssunto  = req.body;

    if (biologia.find(biologia => biologia.nome.toLowerCase() === novoAssunto.nome.toLowerCase())) {
        res.send("<h1>Este assunto já existe!</h1>");
        return;
    }

    biologia.push(novoAssunto);

    SalvarB();

    res.send("<h1>Assunto adicionado com sucesso!</h1>");

});



app.post('/adicionar-assunto-biologia', (req, res) => {
    const novoAssunto  = req.body;

    if (biologia.find(biologia => biologia.nome.toLowerCase() === novoAssunto.nome.toLowerCase())) {
        res.send("<h1>Este assunto já existe!</h1>");
        return;
    }

    biologia.push(novoAssunto);

    SalvarB();

    res.send("<h1>Assunto adicionado com sucesso!</h1>");

});



var server = http.createServer(callback);

server.listen(3000);

console.log(`servidor iniciado em http://${port}`)
