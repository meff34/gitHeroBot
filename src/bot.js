const Telebot = require('telebot')
const {teleToken} = require('../config.json')

const bot = new Telebot(teleToken)

module.exports = bot
