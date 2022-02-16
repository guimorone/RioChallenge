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
exports.parametersTrip = exports.parametersCode = exports.trip = exports.qrCode = void 0;
const axios_1 = __importDefault(require("axios"));
// Endpoints
// Pontos já cadastrados no app com QRCode
function qrCode(code) {
    return __awaiter(this, void 0, void 0, function* () {
        const url = 'https://api.mobilidade.rio/qrcode/?code=' + code + '&format=json';
        try {
            const response = yield axios_1.default.get(url);
            return response.data.results;
        }
        catch (exception) {
            process.stderr.write(`ERROR received from ${url}: ${exception}\n`);
        }
    });
}
exports.qrCode = qrCode;
// Itinerário de todas as linhas cadastradas
function trip() {
    return __awaiter(this, void 0, void 0, function* () {
        const url = 'https://api.mobilidade.rio/trip/?format=json';
        try {
            const response = yield axios_1.default.get(url);
            return response.data.results;
        }
        catch (exception) {
            process.stderr.write(`ERROR received from ${url}: ${exception}\n`);
        }
    });
}
exports.trip = trip;
// Parâmetros
// Filtra itinerários que PASSAM num ponto a partir do seu QRCode (numero da PARADA)
function parametersCode(code) {
    return __awaiter(this, void 0, void 0, function* () {
        const url = ' https://api.mobilidade.rio/trip/?code=' + code + '&format=json';
        try {
            const response = yield axios_1.default.get(url);
            return response.data.results;
        }
        catch (exception) {
            process.stderr.write(`ERROR received from ${url}: ${exception}\n`);
        }
    });
}
exports.parametersCode = parametersCode;
// Filtra paradas de um itinerário específico (numero do onibus, metro etc)
function parametersTrip(trip_id) {
    return __awaiter(this, void 0, void 0, function* () {
        const url = ' https://api.mobilidade.rio/sequence/?trip_id=' + trip_id + '&format=json';
        try {
            const response = yield axios_1.default.get(url);
            return response.data.results;
        }
        catch (exception) {
            process.stderr.write(`ERROR received from ${url}: ${exception}\n`);
        }
    });
}
exports.parametersTrip = parametersTrip;
