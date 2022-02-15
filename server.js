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
const axios_1 = __importDefault(require("axios"));
const url = 'https://api.mobilidade.rio/qrcode/?format=json';
function teste() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield axios_1.default.get(url);
            console_1.default.log(response.data.results);
        }
        catch (exception) {
            process.stderr.write(`ERROR received from ${url}: ${exception}\n`);
        }
    });
}
teste();
const app = (0, express_1.default)();
app.set('view engine', 'ejs');
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(express_1.default.static('public'));
const apiKey = process.env.API_KEY;
app.get('/', (req, res) => {
    res.render('index', {
        apiKey: apiKey
    });
});
// Se tiver alguma porta específica
let port = process.env.PORT;
if (port == null || port == '') {
    port = '3000';
}
// Botei parseInt porque nesse caso vou usar 3000 mesmo
app.listen(parseInt(port), () => console_1.default.log('Server is running!'));
