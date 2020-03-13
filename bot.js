'use strict';
require('dotenv').config();
const Telegraf = require('telegraf');
const locales = require('./locale');

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.context.strings = 'locale' in process.env ? locales[process.env.locale] : locales.EN;

bot.use(require('./handlers/middleware/parse_commands'));
bot.use(require('./handlers/commands'));
bot.use(require('./handlers/middleware'));
bot.use(require('./handlers/messages'));

bot.launch();
