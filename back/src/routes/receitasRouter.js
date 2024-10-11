const { Router } = require('express');
 
const router = Router();
 
const { pawbuddy } = require('../controller/receitasController');
 
router.post('/store/receitaCriar', pawbuddy);
 
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

module.exports = router;