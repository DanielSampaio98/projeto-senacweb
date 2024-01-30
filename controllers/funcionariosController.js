const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: true }));

module.exports = (db) => {
    router.get('/', async(req, res) => {
        try {
            const page = req.query.page || 1;
            const perPage = 10; // Número de funcionários por página
            const offset = (page - 1) * perPage;

            const query = `SELECT * FROM funcionarios LIMIT ?, ?`;
            const funcionarios = await db.query(query, [offset, perPage]);

            res.render('listar', { funcionarios, currentPage: page });
            console.log(funcionarios.length)

        } catch (error) {
            console.error(error);
            res.status(500).send('Erro interno no servidor');


        }
    });

    router.get('/cadastrar', (req, res) => {
        res.render('cadastrar');
    });

    router.post('/cadastrar', async(req, res) => {
        try {
            // Obtém os dados do formulário de cadastro
            const { nome, cargo, salario } = req.body;

            // Insere um novo funcionário no banco de dados
            await db.query('INSERT INTO funcionarios (nome, cargo, salario) VALUES (?, ?, ?)', [nome, cargo, salario]);

            res.redirect('/funcionarios');
        } catch (error) {
            console.error(error);
            res.status(500).send('Erro interno no servidor');
        }
    });

    router.get('/editar/:id', async(req, res) => {
        try {
            // Obtém o ID do funcionário a ser editado
            const funcionarioId = req.params.id;

            // Busca os detalhes do funcionário no banco de dados
            const funcionario = await db.query('SELECT * FROM funcionarios WHERE id = ?', [funcionarioId]);

            res.render('editar', { funcionario });
        } catch (error) {
            console.error(error);
            res.status(500).send('Erro interno no servidor');
        }
    });

    router.post('/editar/:id', async(req, res) => {
        try {
            // Obtém o ID do funcionário a ser editado
            const funcionarioId = req.params.id;

            // Obtém os novos dados do formulário de edição
            const { nome, cargo, salario } = req.body;

            // Atualiza os dados do funcionário no banco de dados
            await db.query('UPDATE funcionarios SET nome = ?, cargo = ?, salario = ? WHERE id = ?', [nome, cargo, salario, funcionarioId]);

            res.redirect('/funcionarios');
        } catch (error) {
            console.error(error);
            res.status(500).send('Erro interno no servidor');
        }
    });

    router.get('/excluir/:id', async(req, res) => {
        try {
            // Obtém o ID do funcionário a ser excluído
            const funcionarioId = req.params.id;

            // Exclui o funcionário do banco de dados
            await db.query('DELETE FROM funcionarios WHERE id = ?', [funcionarioId]);

            res.redirect('/funcionarios');
        } catch (error) {
            console.error(error);
            res.status(500).send('Erro interno no servidor');
        }
    });

    return router;
};