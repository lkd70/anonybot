'use strict';
require('dotenv').config();
const Telegraf = require('telegraf');
const commands = require('./handlers/commands');
const Datastore = require('nedb');
const locale = require('./locale');

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.context.db = {};
bot.context.db.boards = new Datastore('./store/boards.db');
bot.context.db.groups = new Datastore('./store/groups.db');
bot.context.db.boards.loadDatabase();
bot.context.db.groups.loadDatabase();

if ('locale' in process.env) {
	bot.context.strings = locale[process.env.locale];
} else {
	bot.context.strings = locale.EN;
}

bot.help(commands.helpCommand());
bot.start(commands.helpCommand());

bot.command('create', commands.createCommand());
bot.command('join', commands.joinCommand());
bot.command('info', commands.infoCommand());

bot.use(require('./handlers/middleware'));
bot.use(require('./handlers/messages'));

bot.launch();
