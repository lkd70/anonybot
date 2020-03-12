'use strict';

const { Composer } = require('telegraf');

const composer = new Composer();


const antiAddHandler = require('./anti_add');

composer.use(require('./parse_commands'));
composer.use(require('./ensure_admin'));
composer.on('new_chat_members', antiAddHandler);

module.exports = composer;
