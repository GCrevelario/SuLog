const express = require('express');
const exphbs = require('express-handlebars');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const flash = require('express-flash');
const req = require('express/lib/request');
const res = require('express/lib/response');

const app = express()

const conn = require('./db/conn')

const pontos = require('./models/pontos');

const Usuario = require('./models/usuario');

app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");

app.use(
    express.urlencoded({
        extended: true
    })
)

app.use(express.json())

app.use(
    session({
        name:"session",
        secret:"secret",
        resave: false,
        saveUninitialized: false,
        store: new FileStore({
            logFn: function() {},
            path: require('path').join(require('os').tmpdir(), 'sessions'),
        }),
        cookie: {
            secure: false,
            maxAge: 360000,
            expires: new Date(Date.now() + 360000),
            httpOnly: true
        }
    }),
)

app.use(flash())

app.use(express.static('public'))

app.use((req, res, next) =>{
    if(req.session.userid){
        res.locals.session = req.session
    }

    next()
})

conn
    //.sync({ force: true})
    .sync()
    .then(() =>{
        app.listen(3000)
    })
    .catch((err) => console.log(err))


//Models



const suRoutes = require('./routes/suRoutes');
const AutenticacaoRoutes = require('./routes/AutenticacaoRoutes');


const SuController = require('./controllers/SuController');


app.use('/pontos', suRoutes)
app.use('/', AutenticacaoRoutes)

app.get('/', SuController.showPontos)
