const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');

app.use(express.static(__dirname + '/public/estilo.css'));


// Simular banco de dados
const produtos = [
    {
        nome: 'geladeira eletrolux',
        preco: 1990.90,
        categoria: 'eletrodomestico'
    },
    {
        nome: 'TV 4K LG',
        preco: 3400.90,
        categoria: 'eletrodomestico'
    },
    {
        nome: 'Sofá cama',
        preco: 2000.99,
        categoria: 'moveis'
    },
    {
        nome: 'Mesa de jantar',
        preco: 1500.00,
        categoria: 'moveis'
    },
    {
        nome: 'Micro-ondas Panasonic',
        preco: 500.00,
        categoria: 'eletrodomestico'
    },
    {
        nome: 'Notebook Dell',
        preco: 3500.00,
        categoria: 'eletronico'
    },
    {
        nome: 'Smartphone Samsung Galaxy',
        preco: 2000.00,
        categoria: 'eletronico'
    },
    {
        nome: 'Forno elétrico',
        preco: 800.00,
        categoria: 'eletrodomestico'
    },
    {
        nome: 'Cadeira de escritório',
        preco: 400.00,
        categoria: 'moveis'
    },
    {
        nome: 'Liquidificador Philips',
        preco: 150.00,
        categoria: 'eletrodomestico'
    },
];

// Configuração do Express
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

// Rota principal
app.get('/', (req, res) => {
    const categoriaSelecionada = req.query.categoria; // Obtenha a categoria selecionada do query string
    let produtosFiltrados = produtos;

    if (categoriaSelecionada && categoriaSelecionada !== '0') {
        // Filtrar produtos pela categoria selecionada
        produtosFiltrados = produtos.filter(produto => produto.categoria === categoriaSelecionada);
    }

    res.render('index', { produtos: produtosFiltrados });
});

// Rota para adicionar produto
app.get('/add', (req, res) => {
    res.render('add');
});

app.post('/add', (req, res) => {
    const { nome, preco, categoria } = req.body;
    produtos.push({ nome, preco, categoria });
    res.redirect('/');
});

// Rota para visualizar produto
app.get('/produto/:nome', (req, res) => {
    const nome = req.params.nome;
    const produto = produtos.find(produto => produto.nome === nome);
    res.render('produto', { produto });
});

// Iniciar servidor
app.listen(port, () => {
    console.log('Servidor rodando na porta', port);
});
