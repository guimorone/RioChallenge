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
  nome: '',
  posi: {},
  modo: '',
  intinerarios: [{}]
}

app.get('/', (req, res) => {
  res.render('index', context)
  // Retirar atualizações feitas no context
  context.nome = ''
  context.posi = {}
  context.modo = ''
  context.intinerarios = [{}]
})

app.get('/ponto/:code', (req, res) => {
  async function getPonto() {
    const ponto = await qrCode(req.params.code)
    return ponto
  }
  async function getIntinerarios() {
    const int = await parametersCode(req.params.code)
    return int
  }

  getPonto().then(response => {
    context.nome = response[0].stop.name
    context.posi = {
      lat: response[0].stop.latitude,
      lng: response[0].stop.longitude
    }
    context.modo = response[0].stop.mode.name
  })
  getIntinerarios().then(response => {
    // tive q botar isso no forEach se n dava erro
    response.forEach((element: { route: { short_name: any; vista: any }, headsign: any }) => {
      context.intinerarios.push({
        num: element.route.short_name,
        vista: element.route.vista,
        sentido: element.headsign
      })
    });

    res.redirect('/')
  })
})

// Se tiver alguma porta específica
let port = process.env.PORT || 3000

// Botei parseInt porque nesse caso vou usar 3000 mesmo
app.listen(port, () => console.log('Server is running on port ' + port + '!'))