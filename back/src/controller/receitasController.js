const connection = require('../config/db');
 
async function pawbuddy(request, response) {
   
    const params = Array(
        request.body.title,
        request.body.conteudo,
    );
 
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

module.exports = {
    pawbuddy
};