'use strict';

const { Composer } = require('telegraf');

const composer = new Composer();

composer.on('new_chat_members', require('./added'));
composer.use(require('./ensure_admin'));
composer.on('new_chat_members', require('./anti_add'));

module.exports = composer;
