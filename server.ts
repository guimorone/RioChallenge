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

app.listen(3000, () => console.log('Server is running!'))