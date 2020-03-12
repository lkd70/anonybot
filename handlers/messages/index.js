'use strict';

const { Composer } = require('telegraf');

const composer = new Composer();


composer.on('text', require('./text'));
composer.on('photo', require('./photo'));
composer.on('animation', require('./animation'));
composer.on('sticker', require('./sticker'));
composer.on('video', require('./video'));

module.exports = composer;
