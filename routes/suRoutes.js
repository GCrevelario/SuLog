const express = require('express')
const router = express.Router()
const SuController = require('../controllers/SuController')


router.get('/add', SuController.criacaoPontos)
router.get('/dashboard', SuController.dashboard)
router.get('/', SuController.showPontos)

module.exports = router
