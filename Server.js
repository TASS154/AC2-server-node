var http = require('http');
var url = require('url');
const fs = require('fs');
const express = require ('express');
const path  = require('path');
const { urlencoded } = require('body-parser');

var app=express();
const port = 3001;

const bioPath = path.join(__dirname, 'biologia.json')
const quiPath = path.join(__dirname, 'quimica.json')
const fisPath = path.join(__dirname, 'fisica.json')

app.use(express.json())
app.use(urlencoded ({extended: true}))

let bioData = fs.readFileSync(bioPath,'utf8');
let quiData = fs.readFileSync(quiPath,'utf8');
let fisData = fs.readFileSync(fisPath,'utf8');
let biologia = JSON.parse(bioData);
let quimica =  JSON.parse(quiData);
let fisica = JSON.parse(fisData);

function lerJson(res, file) {
    fs.readFile(file, function(err, data) {
        res.end(data);
    });
}


app.get('/addbio', (req, res) => {
    res.sendFile(path.join(__dirname + '/addbio.html'));
});
app.get('/addqui', (req, res) => {
    res.sendFile(path.join(__dirname + '/addqui.html'));
});
app.get('/addfis', (req, res) => {
    res.sendFile(path.join(__dirname + '/addfis.html'));
});
app.get('/biologia', (req, res) => {
    res.sendFile(path.join(__dirname + '/biologia.json'));
});
app.get('/quimica', (req, res) => {
    res.sendFile(path.join(__dirname + '/quimica.json'));
});
app.get('/fisica', (req, res) => {
    res.sendFile(path.join(__dirname + '/fisica.json'));
});




function SalvarB() {
    fs.writeFileSync(bioPath ,JSON.stringify(biologia, null, 2))
}
function SalvarQ() {
    fs.writeFileSync(quiPath ,JSON.stringify(quimica, null, 2))
}
function SalvarF() {
    fs.writeFileSync(fisPath ,JSON.stringify(fisica, null, 2))
}


app.post('/addbio', (req, res) => {
    console.log(req.body)
    const novoAssuntoB  = req.body;

    if (biologia.find(biologia => biologia.titulo.toLowerCase() === novoAssuntoB.titulo.toLowerCase())) {
        res.send("<h1>Este assunto já existe!</h1>");
        return;
    }

    biologia.push(novoAssuntoB);

    SalvarB();

    res.send("<h1>Assunto adicionado com sucesso!</h1>");

});



app.post('/addqui', (req, res) => {
    const novoAssuntoQ = req.body;
    if (!novoAssuntoQ.titulo || quimica.find(q => q.titulo.toLowerCase() === novoAssuntoQ.titulo.toLowerCase())) {
        res.send("<h1>Este assunto já existe ou título não fornecido!</h1>");
        return;
    }

    quimica.push(novoAssuntoQ);
    SalvarQ();
    res.send("<h1>Assunto adicionado com sucesso!</h1>");
});



app.post('/addfis', (req, res) => {
    const novoAssuntoF  = req.body;

    if (fisica.find(fisica => fisica.titulo.toLowerCase() === novoAssuntoF.titulo.toLowerCase())) {
        res.send("<h1>Este assunto já existe!</h1>");
        return;
    }

    fisica.push(novoAssunto);

    SalvarF();

    res.send("<h1>Assunto adicionado com sucesso!</h1>");

});

app.listen(port, () => {
console.log(`servidor iniciado em http://localhost:${port}`)
});