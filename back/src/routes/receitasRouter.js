const { Router } = require('express');
 
const router = Router();
 
const { pawbuddy, getReceitas } = require('../controller/receitasController');
//importar função nova do get
 

/**
 * @swagger
 * /store/receitaCriar:
 *   get:
 *     summary: Cria a receita
 *     responses:
 *       200:
 *         description: Cria a receita no banco de dados
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
*/
router.post('/store/receitaCriar', pawbuddy);
router.post('/getReceitas', getReceitas)

//criar nova rota para o get

module.exports = router;