const express = require('express')
const router = express.Router()
const SuController = require('../controllers/SuController')

const checkAuten = require('../helpers/autenticacao').checkAuten


router.get('/add', checkAuten, SuController.criacaoPontos)
router.post('/add', checkAuten, SuController.criacaoPontosSalvar)
router.get('/edit/:id', checkAuten, SuController.editPontos)
router.post('/edit', checkAuten, SuController.editPontosSalvar)
router.get('/dashboard', checkAuten, SuController.dashboard)
router.post('/remove', checkAuten, SuController.removePonto)
router.get('/', SuController.showPontos)

module.exports = router
