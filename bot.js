'use strict';
require('dotenv').config();
const Telegraf = require('telegraf');
const locale = require('./locale');

const bot = new Telegraf(process.env.BOT_TOKEN);

if ('locale' in process.env) {
	bot.context.strings = locale[process.env.locale];
} else {
	bot.context.strings = locale.EN;
}
bot.use(require('./handlers/middleware/parse_commands'));
bot.use(require('./handlers/commands'));
bot.use(require('./handlers/middleware'));
bot.use(require('./handlers/messages'));

bot.launch();
