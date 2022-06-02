const Usuario = require('../models/usuario')
const bcrypt = require('bcryptjs')

module.exports = class AutenticacaoController{
    static login(req, res){
        res.render('autenticacao/login')
    }

    static async loginPost(req,res){
        const {email, senha} = req.body

        const user = await Usuario.findOne({where: {email: email}})

        if(!user){
            req.flash('message', 'Usuario não encontrado')
            res.render('autenticacao/login')

            return
        }

        const passwordMatch = bcrypt.compareSync(senha, user.senha)

        if(!passwordMatch){
            req.flash('message', 'Senha invalida')
            res.render('autenticacao/login')

            return
        }

        req.session.userid = user.id
            req.flash('message', 'Autenticação realizada com sucesso')
            req.session.save(()=>{
                res.redirect('/')
            })
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
        
        const checkifUserExists = await Usuario.findOne({ where: { email: email}})

        if(checkifUserExists){
            req.flash('message', 'Email já registrado')
            res.render('autenticacao/registrar')
            return
        }

        const salt = bcrypt.genSaltSync(10)
        const hashedSenha = bcrypt.hashSync(senha, salt)

        const user = {
            nome,
            email,
            senha: hashedSenha
        }

        try{
            const createUser =  await Usuario.create(user)
            req.session.userid = createUser.id
            req.flash('message', 'Cadastro realizado com sucesso')
            req.session.save(()=>{
                res.redirect('/')
            })
            
        }catch(err){
            console.log(err)
        }
    }

    static logout(req, res){
        req.session.destroy()
        res.redirect('/login')
    }
}