const pontos = require('../models/pontos')
const Ponto = require('../models/pontos')
const Usuario = require('../models/usuario')

const { Op } = require('sequelize')
const { query } = require('express')

module.exports = class SuController{
    static async showPontos(req, res){

        let search=''

        if(req.query.search){
            search = req.query.search
        }

        let order = 'DESC'

        if (req.query.order === 'old'){
            order = 'ASC'
        }else{
            order = 'DESC'
        }

        const todosPontos = await Ponto.findAll({
            include: Usuario,
            where: {
                title: { [Op.like]: `%${search}%` },
            },
            
            order: [['createdAt', order]],
        })
        
        const Pontos = todosPontos.map((result) => result.get({plain: true}))

        let pontosQty = Pontos.length

        if(pontosQty ===0){
            pontosQty = false
        }

        res.render('pontos/home', {Pontos, search, pontosQty})
    }

    static async dashboard(req, res){
        const userId = req.session.userid

        const user = await Usuario.findOne({
            where: {
                id: userId,
            },
            include: Ponto,
            plain: true,
        })

        if(!user){
            res.redirect('pontos/login')
        }

        const Pontos = user.pontos.map((result) => result.dataValues)

        let pontosVazios = false

        if(Pontos.length === 0){
            pontosVazios = true
        }

        console.log(Pontos)

        res.render('pontos/dashboard', { Pontos, pontosVazios })
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

    static async removePonto(req,res){
        const id = req.body.id
        const UserId = req.session.userid

        try{
            await Ponto.destroy({where: {id:id, usuarioId: UserId}})

            req.flash('message', 'Ponto removido com sucesso')

            req.session.save(() =>{
                res.redirect('/pontos/dashboard')
            })
      
        }catch (error){
            console.log(error)
        }
    }

    static async editPontos(req, res){

        const id = req.params.id

        const ponto = await Ponto.findOne({where: {id:id}, raw:true})

        res.render('pontos/edit', {ponto})
    }

    static async editPontosSalvar(req, res){

        const id = req.body.id

        const ponto = {
            title: req.body.titulo,
        }

        try{
            await Ponto.update(ponto, {where: {id: id}})

            req.flash('message', 'Ponto atualizado com sucesso')
    
            req.session.save(() =>{
                res.redirect('/pontos/dashboard')
            })
        }catch(error){
            console.log(error)
        }
    }
    
}