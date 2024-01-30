// models/funcionariosModel.js

class FuncionarioModel {
    constructor(db) {
        this.db = db;
    }

    listarFuncionarios() {
        return new Promise((resolve, reject) => {
            this.db.query('SELECT * FROM funcionarios', (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    }

    cadastrarFuncionario(nome, cargo, salario) {
        return new Promise((resolve, reject) => {
            const query = 'INSERT INTO funcionarios (nome, cargo, salario) VALUES (?, ?, ?)';
            this.db.query(query, [nome, cargo, salario], (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results.insertId);
                }
            });
        });
    }

    obterFuncionarioPorId(id) {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM funcionarios WHERE id = ?';
            this.db.query(query, [id], (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    if (results.length === 0) {
                        resolve(null);
                    } else {
                        resolve(results[0]);
                    }
                }
            });
        });
    }

    editarFuncionario(id, nome, cargo, salario) {
        return new Promise((resolve, reject) => {
            const query = 'UPDATE funcionarios SET nome = ?, cargo = ?, salario = ? WHERE id = ?';
            this.db.query(query, [nome, cargo, salario, id], (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }

    excluirFuncionario(id) {
        return new Promise((resolve, reject) => {
            const query = 'DELETE FROM funcionarios WHERE id = ?';
            this.db.query(query, [id], (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }
}

module.exports = FuncionarioModel;