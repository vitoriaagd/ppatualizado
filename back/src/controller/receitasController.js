const connection = require('../config/db');

async function pawbuddy(request, response) {
    
    const params = Array(
        request.body.title,
        request.body.conteudo,
        request.body.userId
    );
    
    const query = 'INSERT INTO receitas(title,desc_receita,user_id) VALUES(?,?,?)';
 
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
    const params = Array (
        request.body.user_id
    )
    //filtrar pelo ID do user e mostrar o nome do usuário referente ao ID dele na tabela
    const query = 'SELECT * FROM receitas WHERE user_id = ?';

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

//copiar a função de GET do cadastro e retirar os parâmetros, a query é SELECT * FROM receitas
//também exportar junto com o module.exports
module.exports = {
    pawbuddy,
    getReceitas
};