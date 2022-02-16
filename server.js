"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
require("dotenv/config");
const console_1 = __importDefault(require("console"));
const requisitions_1 = require("./requisitions");
const app = (0, express_1.default)();
const apiKey = process.env.API_KEY;
app.set('view engine', 'ejs');
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(express_1.default.static('public'));
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
};
app.get('/', (req, res) => {
    res.render('index', context);
    // Retirar atualizações feitas no context
    context.show = false;
    context.qrCode = '';
    context.nome = '';
    context.posi = {};
    context.modo = '';
    context.intinerarios = [{}];
    // Intinerários
    context.nomeInti = '';
    context.numInti = '';
    context.tipoInti = '';
    context.sentidoInti = '';
    context.paradas = [{}];
});
app.get('/ponto/:code', (req, res) => {
    function getPonto() {
        return __awaiter(this, void 0, void 0, function* () {
            const ponto = yield (0, requisitions_1.qrCode)(req.params.code);
            return ponto;
        });
    }
    function getIntinerarios() {
        return __awaiter(this, void 0, void 0, function* () {
            const int = yield (0, requisitions_1.parametersCode)(req.params.code);
            return int;
        });
    }
    getPonto().then(response => {
        context.show = true;
        context.ls = true;
        context.qrCode = req.params.code;
        context.nome = response[0].stop.name;
        context.posi = {
            lat: response[0].stop.latitude,
            lng: response[0].stop.longitude
        };
        context.modo = response[0].stop.mode.name;
    });
    getIntinerarios().then(response => {
        // tive q botar isso no forEach se n dava erro
        response.forEach((element) => {
            context.intinerarios.push({
                num: element.route.short_name,
                vista: element.route.vista,
                sentido: element.headsign
            });
        });
        res.redirect('/');
    });
});
app.get('/inti/:typeId', (req, res) => {
    function getParadasIntinerario() {
        return __awaiter(this, void 0, void 0, function* () {
            const paradas = yield (0, requisitions_1.parametersTrip)(req.params.typeId);
            return paradas;
        });
    }
    getParadasIntinerario().then(response => {
        context.show = true;
        context.ls = false;
        context.nomeInti = response[0].trip.route.vista;
        context.numInti = response[0].trip.route.short_name;
        context.tipoInti = response[0].trip.route.mode.name;
        context.sentidoInti = response[0].trip.headsign;
        response.forEach((element) => {
            context.paradas.push({
                nomeParada: element.stop.name,
                endParada: element.stop.address,
                latParada: element.stop.latitude,
                lngParada: element.stop.longitude
            });
        });
        res.redirect('/');
    });
});
// Se tiver alguma porta específica
let port = process.env.PORT || 3000;
// Botei parseInt porque nesse caso vou usar 3000 mesmo
app.listen(port, () => console_1.default.log('Server is running on port ' + port + '!'));
