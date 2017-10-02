"use strict"

//test démarrage server
console.log('wesh alors')

//-------Module


//utilsation du module express
let express = require('express')
let app = express()

//permet d'utiliser les donnees reçu en post
let bodyParser = require('body-parser')

//pour utiliser les sessions
let session = require('express-session')


//------- Moteur de template

//Utilistion "sosu-module ejs"=> formatage des pages
app.set('view engine', 'ejs')


//--------Middleware (attention  l'ordre)

//permet de préciser où ller chercher le css (public/semantic)
//semanticUi pour css
//'/asset' permet de préfixer l'url
app.use('/assets', express.static('public'))

//Récupérer les infos du post
app.use(bodyParser.urlencoded({extended : false}))
app.use(bodyParser.json())

//utiliser les sessions
app.use(session({
	secret: 'cryptagetrotrosecret',
	resave: false,
	saveUninitialized: true,
	cookie: { secure : false }
}))

//mon module pour générer des essages flash
app.use(require('./middlewares/flash'))


//---------Routes


//AFFICHAGE PRINCICPAL
app.get('/', (request, response) =>
{
	//erreur levée ici : missing ) l 56:16 ????????????
	let Message = require('./models/messages')
	Message.all(function (messages)
	{
		response.render('pages/index', {messages: messages})	
	})
})


//Récupération des données du post et traitement de l'erreur et redirection grace aux sessions
app.post('/', (request, response) =>
{
	if(request.body.message === undefined || request.body.message === '')
	{
		request.flash('error', 'T\'as rien écrit gros !')
		response.redirect('/')
	} else {
		let Message = require('./models/messages')
		Message.create(request.body.message, function()
		{
			request.flash('succes', 'Merci !')
			response.redirect('/')
		})
	}
})


app.listen(8080)