'use strict';
require('dotenv').config();
const Telegraf = require('telegraf');
const commands = require('./handlers/commands');
const locale = require('./locale');

const bot = new Telegraf(process.env.BOT_TOKEN);

if ('locale' in process.env) {
	bot.context.strings = locale[process.env.locale];
} else {
	bot.context.strings = locale.EN;
}
bot.use(require('./handlers/middleware/parse_commands'));

bot.help(commands.helpCommand());
bot.start(commands.helpCommand());

bot.command('create', commands.createCommand());
bot.command('join', commands.joinCommand());
bot.command('info', commands.infoCommand());

bot.use(require('./handlers/middleware'));
bot.use(require('./handlers/messages'));

bot.launch();
