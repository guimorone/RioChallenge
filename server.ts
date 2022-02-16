import express from 'express'
import bodyParser from 'body-parser'
import 'dotenv/config'
import console from 'console'
import { qrCode, trip, parametersCode, parametersTrip } from './requisitions'

const app = express()
const apiKey = process.env.API_KEY

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static('public'))

let context = {
  apiKey: apiKey,
  nome: ''
}

app.get('/', (req, res) => {
  res.render('index', context)
})

app.get('/ponto/:code', (req, res) => {
  async function getPonto() {
    const ponto = await qrCode(req.params.code)
    context.nome = ponto[0].stop.name
    res.render('index', context)
    // Retirar atualizações feitas no context
    context.nome = ''
  }
  getPonto()
})

// Se tiver alguma porta específica
let port = process.env.PORT || 3000

// Botei parseInt porque nesse caso vou usar 3000 mesmo
app.listen(port, () => console.log('Server is running on port ' + port + '!'))