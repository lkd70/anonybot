'use strict';

const { findNewBoardUID } = require('../utils/db');
const { getRandomName } = require('../utils/names');

module.exports = () => ctx => {
    if (ctx.update.message.chat.type !== 'supergroup') {
        ctx.replyWithMarkdown('/create should only ever be used in a new empty supergroup...' +
        '\nEnsure you\'ve made this bot admin in the group with the \'delete messages\' permission');
    } else {
        const group_id = ctx.update.message.chat.id;
        if (ctx.state.command.args.length < 2) {
            ctx.replyWithMarkdown(
    `Invalid syntax used for /create command...
    correct syntax:
    \t\t\`/create [Board_Name] [Description]\`
    Example:
    \t\t\`/create AnonymousBoard101 A simple board with anonimity\``);
        } else {
            const [board, ...parts] = ctx.state.command.args;
            const desc = parts.join(' ');
            const fake_name = getRandomName();
            
            ctx.db.groups.findOne({ group_id: group_id }, (err, doc) => {
                if (doc === null) {
                    // able to create group.
                    findNewBoardUID(ctx.db.boards).then(uid => {
                        ctx.db.boards.insert({
                            uid,
                            board,
                            desc,
                            creator: fake_name
                        }, (err, newDoc) => {
                            ctx.db.groups.insert({
                                group_id,
                                owner: fake_name,
                                boardUID: uid
                            }, (err, newGroup) => {
                                ctx.replyWithMarkdown(`Done! Your new board '*${board}*' is now ready` +
                                    `\n\nYour unique name is: '${fake_name}'` +
                                    `\n\nShare your board with others using this unique ID: \`${uid}\`.` +
                                    `\nThey can start chatting anonymously by using the \`/join\` command`);
                            });
                        });
                    });
                } else {
                    // group is already in use
                    ctx.replyWithMarkdown(`This group is already in use for another board. Please create a new group for a new board...`);
                }
            });
        }
    }
}