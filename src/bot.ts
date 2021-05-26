import { Telegraf } from 'telegraf'
import dotenv from 'dotenv'
import fetch from 'node-fetch'

dotenv.config()

const botToken = process.env.TELEGRAM_TOKEN
const apiKey = process.env.API_KEY
const bot = new Telegraf(botToken)

bot.start((ctx) =>
  ctx.reply(
    `Приветствую, ${
      ctx.from.first_name ? ctx.from.first_name : 'хороший человек'
    }! Напиши свой город.`,
  ),
)

bot.help((ctx) => ctx.reply(`Покажу погодку для ${ctx.from.first_name}`))

bot.on('text', async (ctx) => {
  const cityName = ctx.message.text
  const url = encodeURI(
    `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${apiKey}&lang=ru`,
  )
  const response = await fetch(url, {
    method: 'get',
    headers: { 'Content-Type': 'application/json' },
  })
  if (response.ok) {
    const data = await response.json()
    ctx.reply(`Температура в ${cityName}: +${Math.round(data.main.temp)}°`)
  } else {
    ctx.reply('Ошибка в городе, ты че не русский?')
  }
})

bot.launch().then(() => {
  console.log('bot up')
})
