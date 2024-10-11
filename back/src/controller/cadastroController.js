const connection = require('../config/db');
const dotenv = require('dotenv').config();
 
async function storeUsuario(request, response) {
    const params = [
        request.body.nome,
        request.body.email,
        request.body.senha
    ];
 
    const query = 'INSERT INTO cadastro(nome,email,senha) VALUES(?,?,?)';
 
    connection.query(query, params, (err, results) => {
        if (results) {
            response.status(201).json({
                success: true,
                message: "Sucesso!",
                data: results
            });
           
        } else {
            response.status(400).json({
                success: false,
                message: "Ops, deu problema!",
                data: err
            });
        }
    });
}


async function login(request, response) {
    const params = [
        request.body.email,
        request.body.senha
    ]

    const query = 'SELECT email, senha FROM cadastro WHERE email = ? AND senha = ?'

    connection.query(query, params, (err, results) => {
        if (results && results.length > 0) {
            response.status(201).json({
                success: true,
                message: "Sucesso!",
                data: results
            });
           
        } else {
            response.status(400).json({
                success: false,
                message: "Ops, deu problema!",
                data: err
            });
        }
    });
}
 
module.exports = {
    storeUsuario, 
    login
};