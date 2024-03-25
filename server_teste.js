var express = require('express');
var path = require('path');
var fs = require('fs');

var app = express();
const port = 3002;

const bioPath = path.join(__dirname, 'biologia.json');
const quiPath = path.join(__dirname, 'quimica.json');
const fisPath = path.join(__dirname, 'fisica.json');

// Corrigindo a utilização do middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rota para servir biologia.json
app.get('/biologia', function(req, res) {
    res.sendFile(bioPath);
});

// Rota para servir quimica.json
app.get('/quimica', function(req, res) {
    res.sendFile(quiPath);
});

// Rota para servir fisica.json
app.get('/fisica', function(req, res) {
    res.sendFile(fisPath);
});

// Rotas para servir os formulários HTML
app.get('/adicionar-assunto-biologia', (req, res) => {
    res.sendFile(path.join(__dirname, 'addbio.html')); // Ajuste no nome do arquivo se necessário
});

app.get('/addqui', (req, res) => {
    res.sendFile(path.join(__dirname, 'addqui.html'));
});

app.get('/adicionar-assunto-fisica', (req, res) => {
    res.sendFile(path.join(__dirname, 'addfis.html')); // Ajuste no nome do arquivo se necessário
});

// Exemplo de rota POST para adicionar um assunto a biologia
app.post('/adicionar-assunto-biologia', (req, res) => {
    // Suponha que o corpo da requisição é diretamente o novo assunto
    const novoAssunto = req.body;

    // Carregue a lista atual de assuntos de biologia
    let biologia = JSON.parse(fs.readFileSync(bioPath, 'utf8'));

    if (biologia.some(b => b.nome.toLowerCase() === novoAssunto.nome.toLowerCase())) {
        res.send("<h1>Este assunto já existe!</h1>");
        return;
    }

    biologia.push(novoAssunto);

    fs.writeFileSync(bioPath, JSON.stringify(biologia, null, 2));

    res.send("<h1>Assunto adicionado com sucesso!</h1>");
});

// Remova as rotas POST duplicadas aqui, mantenha apenas uma versão correta para cada tipo de assunto

app.listen(port, () => {
    console.log(`Servidor iniciado em http://localhost:${port}`);
});