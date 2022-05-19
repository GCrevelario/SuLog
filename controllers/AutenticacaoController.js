const bcrypt = require('bcryptjs')

module.exports = class AutenticacaoController{
    static login(req, res){
        res.render('autenticacao/login')
    }

    static registrar(req, res){
        res.render('autenticacao/registrar')
    }

    static async registrarpost(req, res){
        const { nome, email, senha, confirmasenha } = req.body

        if(senha != confirmasenha){
            req.flash('message', 'Senhas não conferem, tente novamente')
            res.render('autenticacao/registrar')

            return
        }
        else{
            res.render('pontos/dashboard');
        }
    }
}