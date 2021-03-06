import express from 'express'
import bodyParser from 'body-parser'
import 'dotenv/config'
import console from 'console'
import { qrCode, trip, parametersCode, parametersTrip } from './components/requisitions'

const app = express()
const apiKey = process.env.API_KEY

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static('public'))

// Especificações passadas para o front
let context = {
  apiKey: apiKey,
  show: false,
  // Ponto específico abaixo
  ls: true,
  qrCode: '',
  nome: '',
  posi: {},
  modo: '',
  intinerarios: [{}],
  // FIM DE PONTO ESPECÍFICO
  // Intinerário específico abaixo
  nomeInti: '',
  numInti: '',
  tipoInti: '',
  sentidoInti: '',
  paradas: [{}]
}

app.get('/', (req, res) => {
  res.render('index', context)
  // Retirar atualizações feitas no context
  context.show = false
  context.qrCode = ''
  context.nome = ''
  context.posi = {}
  context.modo = ''
  context.intinerarios = [{}]

  // Intinerários
  context.nomeInti = ''
  context.numInti = ''
  context.tipoInti = ''
  context.sentidoInti = ''
  context.paradas = [{}]
})

app.get('/ponto/:code', (req, res) => {
  async function getPonto() {
    const ponto = await qrCode(req.params.code)
    if(!ponto.count) res.status(400).json({error: 'Bad Request! Check your request', request: 'Code ' + req.params.code})
    return ponto.results
  }
  async function getIntinerarios() {
    const int = await parametersCode(req.params.code)
    if(!int.count) res.status(400).json({error: 'Bad Request! Check your request', request: 'Code ' + req.params.code})
    return int.results
  }

  getPonto().then(response => {
    context.show = true
    context.ls = true
    context.qrCode = req.params.code
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

app.get('/inti/:typeId', (req, res) => {
  async function getParadasIntinerario() {
    const paradas = await parametersTrip(req.params.typeId)
    if(!paradas.count) res.status(400).json({error: 'Bad Request! Check your request', request: 'Trip ' + req.params.typeId})
    return paradas.results
  }

  getParadasIntinerario().then(response => {
    context.show = true
    context.ls = false
    context.nomeInti = response[0].trip.route.vista
    context.numInti = response[0].trip.route.short_name
    context.tipoInti = response[0].trip.route.mode.name
    context.sentidoInti = response[0].trip.headsign

    response.forEach((element: { stop: { name: any; address: any; latitude: any; longitude: any } }) => {
      context.paradas.push({
        nomeParada: element.stop.name,
        endParada: element.stop.address,
        latParada: element.stop.latitude,
        lngParada: element.stop.longitude
      })
    })

    res.redirect('/')
  })
})

// Se tiver alguma porta específica
let port = process.env.PORT || 3000

// Botei parseInt porque nesse caso vou usar 3000 mesmo
app.listen(port, () => console.log('Server is running on port ' + port + '!'))