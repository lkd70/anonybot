'use strict';

const {
    findUniqueName
} = require('../utils/db');

module.exports = () => ctx => {
    if (!['group', 'supergroup'].includes(ctx.update.message.chat.type)) {
        ctx.replyWithMarkdown(ctx.strings.join_outside_supergroup);
    } else {
        const group_id = ctx.update.message.chat.id;
        if (ctx.state.command.args.length !== 1) {
            ctx.replyWithMarkdown(ctx.strings.join_syntax);
        } else {
            const [ hash ] = ctx.state.command.args;

            ctx.db.groups.findOne({
                group_id: group_id
            }, (err, doc) => {
                if (doc === null) {
                    ctx.db.boards.findOne({ uid: hash }, (err, boardDoc) => {
                        if (boardDoc === null) {
                            ctx.replyWithMarkdown(ctx.strings.join_unknown_group);
                        } else {
                            findUniqueName(ctx.db.groups, hash).then(fake_name => {
                                ctx.db.groups.insert({
                                    group_id,
                                    owner: fake_name,
                                    boardUID: hash
                                }, (err, newGroup) => {
                                    ctx.replyWithMarkdown(ctx.strings.join_success(
                                        boardDoc.board,
                                        fake_name));
                                });
                            });
                        }
                    });
                } else {
                    ctx.replyWithMarkdown(ctx.strings.join_in_use);
                }
            });
        }
    }
}