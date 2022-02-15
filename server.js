"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
require("dotenv/config");
const console_1 = __importDefault(require("console"));
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
