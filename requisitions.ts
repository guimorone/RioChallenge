import axios from 'axios'
    
// Endpoints
// Pontos já cadastrados no app com QRCode
export async function qrCode() {
    const url: string = 'https://api.mobilidade.rio/qrcode/?format=json'
    try {
        const response = await axios.get(url)
        console.log(response.data.results)
    } catch (exception) {
        process.stderr.write(`ERROR received from ${url}: ${exception}\n`)
    }
}

// Itinerário de todas as linhas cadastradas
export async function trip() {
    const url: string = 'https://api.mobilidade.rio/trip/?format=json'
    try {
        const response = await axios.get(url)
        console.log(response.data.results)
    } catch (exception) {
        process.stderr.write(`ERROR received from ${url}: ${exception}\n`)
    }
}

// Parâmetros
// Filtra itinerários que PASSAM num ponto a partir do seu QRCode (numero da PARADA)
export async function parametersCode(code: string) {
    const url: string = ' https://api.mobilidade.rio/trip/?code=' + code
    try {
        const response = await axios.get(url)
        console.log(response.data.results)
    } catch (exception) {
        process.stderr.write(`ERROR received from ${url}: ${exception}\n`)
    }
}

// Filtra paradas de um itinerário específico (numero do onibus, metro etc)
export async function parametersTrip(trip_id: string) {
    const url: string = ' https://api.mobilidade.rio/sequence/?trip_id=' + trip_id
    try {
        const response = await axios.get(url)
        console.log(response.data.results)
    } catch (exception) {
        process.stderr.write(`ERROR received from ${url}: ${exception}\n`)
    }
}