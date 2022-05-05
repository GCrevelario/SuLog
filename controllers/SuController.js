module.exports = class SuController{
    static async showPontos(req, res){
        res.render('pontos/home')
    }

    static async dashboard(req, res){
        res.render('pontos/dashboard')
    }

    static async criacaoPontos(req, res){
        res.render('pontos/criar')
    }
}