'use strict';

const {
    findUniqueName
} = require('../utils/db');

module.exports = () => ctx => {
    if (!['group', 'supergroup'].includes(ctx.update.message.chat.type)) {
        ctx.replyWithMarkdown('/join should only ever be used in a new empty group...');
    } else {
        const group_id = ctx.update.message.chat.id;
        if (ctx.state.command.args.length !== 1) {
            ctx.replyWithMarkdown(
                `Invalid syntax used for /join command...
    correct syntax:
    \t\t\`/join [board-hash]\`
    Example:
    \t\t\`/join 0934ec1ec2bc2b0483d37c17ccfd793a4d0a249c\``);
        } else {
            const [ hash ] = ctx.state.command.args;

            ctx.db.groups.findOne({
                group_id: group_id
            }, (err, doc) => {
                if (doc === null) {
                    ctx.db.boards.findOne({ uid: hash }, (err, boardDoc) => {
                        if (boardDoc === null) {
                            ctx.replyWithMarkdown(`Unknown hash... Perhaps /create your own?`);
                        } else {
                            findUniqueName(ctx.db.groups, hash).then(fake_name => {
                                ctx.db.groups.insert({
                                    group_id,
                                    owner: fake_name,
                                    boardUID: hash
                                }, (err, newGroup) => {
                                    ctx.replyWithMarkdown(`Welcome to '*${boardDoc.board}*'` +
                                        `\n\nYour unique name is: '${fake_name}'`);
                                });
                            });
                        }
                    });
                } else {
                    // group is already in use
                    ctx.replyWithMarkdown(`This group is already in use for another board.` +
                    `Please create a new group for a new board...`);
                }
            });
        }
    }
}