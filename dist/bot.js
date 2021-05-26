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
const telegraf_1 = require("telegraf");
const dotenv_1 = __importDefault(require("dotenv"));
const node_fetch_1 = __importDefault(require("node-fetch"));
dotenv_1.default.config();
const botToken = process.env.TELEGRAM_TOKEN;
const apiKey = process.env.API_KEY;
const bot = new telegraf_1.Telegraf(botToken);
bot.start((ctx) => ctx.reply(`Приветствую, ${ctx.from.first_name ? ctx.from.first_name : 'хороший человек'}! Напиши свой город.`));
bot.help((ctx) => ctx.reply(`Покажу погодку для ${ctx.from.first_name}`));
bot.on('text', (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    const cityName = ctx.message.text;
    const url = encodeURI(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${apiKey}&lang=ru`);
    const response = yield node_fetch_1.default(url, {
        method: 'get',
        headers: { 'Content-Type': 'application/json' },
    });
    if (response.ok) {
        const data = yield response.json();
        ctx.reply(`Температура в ${cityName}: +${Math.round(data.main.temp)}°`);
    }
    else {
        ctx.reply('Ошибка в городе, ты че не русский?');
    }
}));
bot.launch().then(() => {
    console.log('bot up');
});
//# sourceMappingURL=bot.js.map