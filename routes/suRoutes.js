const express = require('express')
const router = express.Router()
const SuController = require('../controllers/SuController')

const checkAuten = require('../helpers/autenticacao').checkAuten


router.get('/add', checkAuten, SuController.criacaoPontos)
router.post('/add', checkAuten, SuController.criacaoPontosSalvar)
router.get('/dashboard', checkAuten, SuController.dashboard)
router.get('/', SuController.showPontos)

module.exports = router
