'use strict';

const { findNewBoardUID } = require('../utils/db');
const { getRandomName } = require('../utils/names');

module.exports = () => ctx => {
    if (ctx.update.message.chat.type !== 'supergroup') {
        ctx.replyWithMarkdown(ctx.strings.create_outside_soupergroup);
    } else {
        const group_id = ctx.update.message.chat.id;
        if (ctx.state.command.args.length < 2) {
            ctx.replyWithMarkdown(ctx.strings.create_syntax_help);
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
                                ctx.replyWithMarkdown(
                                    ctx.strings.create_success_message(board, fake_name, uid)
                                );
                            });
                        });
                    });
                } else {
                    // group is already in use
                    ctx.replyWithMarkdown(ctx.strings.create_group_in_use);
                }
            });
        }
    }
}