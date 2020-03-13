'use strict';

const {	Composer } = require('telegraf');

const composer = new Composer();

composer.start(require('./help'));
composer.help(require('./help'));
composer.command('create', require('./create'));
composer.command('join', require('./join'));
composer.command('info', require('./info'));

module.exports = composer;
