const Telegraf = require('telegraf');
const Extra = require('telegraf/extra');
require('dotenv').config();
const args = require('./middleware/args');
const commands = require('./commands');
const Datastore = require('nedb');
const { getMeFakeName } = require('./utils/db');

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.context.db = {};
bot.context.db.boards = new Datastore('./store/boards.db');
bot.context.db.groups = new Datastore('./store/groups.db');
bot.context.db.boards.loadDatabase();
bot.context.db.groups.loadDatabase();

bot.use(args());

bot.help(commands.helpCommand());
bot.start(commands.helpCommand());

bot.command('create', commands.createCommand());
bot.command('join', commands.joinCommand());
bot.command('info', commands.infoCommand());

bot.on('text', ctx => {
    ctx.deleteMessage().catch(() => ctx.reply('Make this bot admin to auto-manage messages: Requires `delete messages` permission'));
    const message = ctx.update.message.text;
    const group_id = ctx.update.message.chat.id;
    getMeFakeName(bot.context.db.groups, group_id).then(doc => {
        const {
            owner,
            boardUID
        } = doc;
        bot.context.db.groups.find({
            boardUID: boardUID
        }, (err, groupDocs) => groupDocs.forEach(group =>
            bot.telegram.sendMessage(
                group.group_id,
                `*[${owner}]* - ${message}`, Extra.markdown())
        ));
    });
});

bot.on('photo', ctx => {
    ctx.deleteMessage().catch(() => ctx.reply('Make this bot admin to auto-manage messages: Requires `delete messages` permission'));
    const img = ctx.update.message.photo[ctx.update.message.photo.length-1];
    const group_id = ctx.update.message.chat.id;
    getMeFakeName(bot.context.db.groups, group_id).then(doc => {
        const {
            owner,
            boardUID
        } = doc;
        bot.context.db.groups.find({
            boardUID: boardUID
        }, (err, groupDocs) => groupDocs.forEach(group => 
            bot.telegram.sendPhoto(group.group_id, img.file_id, Extra.caption(`From: ${owner}`))
        ));
    });
});

bot.on('animation', ctx => {
    ctx.deleteMessage().catch(() => ctx.reply('Make this bot admin to auto-manage messages: Requires `delete messages` permission'));
    const anim = ctx.update.message.animation.file_id;
    const group_id = ctx.update.message.chat.id;
    getMeFakeName(bot.context.db.groups, group_id).then(doc => {
        const {
            owner,
            boardUID
        } = doc;
        bot.context.db.groups.find({
            boardUID: boardUID
        }, (err, groupDocs) => groupDocs.forEach(group =>
            bot.telegram.sendAnimation(group.group_id, anim, Extra.caption(`From: ${owner}`))
        ));
    });
});

bot.on('video', ctx => {
    ctx.deleteMessage().catch(() => ctx.reply('Make this bot admin to auto-manage messages: Requires `delete messages` permission'));
    const vid = ctx.update.message.video;
    const group_id = ctx.update.message.chat.id;
    getMeFakeName(bot.context.db.groups, group_id).then(doc => {
        const {
            owner,
            boardUID
        } = doc;
        bot.context.db.groups.find({
            boardUID: boardUID
        }, (err, groupDocs) => groupDocs.forEach(group =>
            bot.telegram.sendVideo(group.group_id, vid.file_id, Extra.caption(`From: ${owner}`))
        ));
    });
});

bot.on('sticker', ctx => {
    ctx.deleteMessage().catch(() => ctx.reply('Make this bot admin to auto-manage messages: Requires `delete messages` permission'));
    const sticker = ctx.update.message.sticker;
    const group_id = ctx.update.message.chat.id;
    getMeFakeName(bot.context.db.groups, group_id).then(doc => {
        const {
            owner,
            boardUID
        } = doc;
        bot.context.db.groups.find({
            boardUID: boardUID
        }, (err, groupDocs) => groupDocs.forEach(group =>
            bot.telegram.sendSticker(group.group_id, sticker.file_id).then(c => {
                bot.telegram.sendMessage(group.group_id, `From: ${owner}`, Extra.inReplyTo(c.message_id));
            })
        ));
    });
});

bot.launch();
