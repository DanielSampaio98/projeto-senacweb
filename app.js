const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const funcionariosController = require('./controllers/funcionariosController')

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.set('view engine', 'ejs');

//app.set('views', './cadastro-funcionarsios/views')

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'usbw',
    database: 'cadastro_funcionarios'
});

db.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
    } else {
        console.log('Conectado ao banco de dados MySQL');
    }
});

app.use('/funcionarios', funcionariosController(db));

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});