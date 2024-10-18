const connection = require('../config/db');

async function pawbuddy(request, response) {
    
    const params = Array(
        request.body.title,
        request.body.conteudo,
    );
    //id está como 1, tem que buscar o id ao logar para popular a tabela com o id do user
    const query = 'INSERT INTO receitas(title,desc_receita,user_id) VALUES(?,?,1)';
 
    connection.query(query, params, (err, results) => {
        if (results) {
            response
                .status(201)
                .json({
                    success: true, 
                    message: "Sucesso!",
                    data: results
                })
        } else {
            response
                .status(400)
                .json({
                    success: false,
                    message: "Ops, deu problema!",
                    data: err
                })
        }
    })
}

async function getReceitas(request, response) {
    const params = [
        request.body.email,
        request.body.senha
    ];

    const query = 'SELECT * FROM receitas';

    connection.query(query, params, (err, results) => {
        if (results) {
            response.status(201).json({
                success: true,
                message: "Sucesso!",
                data: { 
                    userId: userId, // Retorne o ID do usuário
                    userInfo: results[0] // Outras informações do usuário, se necessário
                }
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

//copiar a função de GET do cadastro e retirar os parâmetros, a query é SELECT * FROM receitas
//também exportar junto com o module.exports
module.exports = {
    pawbuddy,
    getReceitas
};