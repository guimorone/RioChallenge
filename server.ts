import express from 'express'
import bodyParser from 'body-parser'
import 'dotenv/config'
import console from 'console'

const app = express()

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static('public'))

const apiKey = process.env.API_KEY

app.get('/', (req, res) => {
	res.render('index', {
        apiKey: apiKey
    })
})

// Se tiver alguma porta específica
let port = process.env.PORT
if(port == null || port == '') {
  port = '3000'
}

// Botei parseInt porque nesse caso vou usar 3000 mesmo
app.listen(parseInt(port), () => console.log('Server is running!'))