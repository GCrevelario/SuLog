const Ponto = require('../models/pontos')
const Usuario = require('../models/usuario')

module.exports = class SuController{
    static async showPontos(req, res){
        res.render('pontos/home')
    }

    static async dashboard(req, res){
        const userId = req.session.userid

        const user = await Usuario.findOne({
            where: {
                id: userid,
            },
        })

        if(user){
            res.redirect('/login')
        }
        res.render('pontos/dashboard')
    }

    static criacaoPontos(req, res){
        res.render('pontos/criar')
    }

    static async criacaoPontosSalvar(req, res){
        const ponto ={
            title: req.body.titulo,
            usuarioId: req.session.userid,
        }

        try{
            await Ponto.create(ponto)

        req.flash('message', 'Ponto criado com sucesso')

        req.session.save(() =>{
            res.redirect('/pontos/dashboard')
        })
        }catch (error){
            console.log(error)
        }
        
    }
    
}