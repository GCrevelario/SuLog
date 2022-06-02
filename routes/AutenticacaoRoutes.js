const express = require('express')
const router = express.Router()
const AutenticacaoController = require('../controllers/AutenticacaoController')


router.get('/login', AutenticacaoController.login)
router.post('/login', AutenticacaoController.loginPost)
router.get('/registrar', AutenticacaoController.registrar)
router.post('/registrar', AutenticacaoController.registrarpost)
router.get('/logout', AutenticacaoController.logout)

module.exports = router