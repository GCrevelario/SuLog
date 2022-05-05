const express = require('express')
const router = express.Router()
const AutenticacaoController = require('../controllers/AutenticacaoController')


router.get('/login', AutenticacaoController.login)
router.get('/registrar', AutenticacaoController.registrar)
router.post('/registrar', AutenticacaoController.registrarpost)

module.exports = router