'use strict';

module.exports = () => ctx => {
    if (ctx.update.message.chat.type !== 'supergroup') {
        ctx.replyWithMarkdown(ctx.strings.info_non_supergroup);
    } else {
        const group_id = ctx.update.message.chat.id;
        ctx.db.groups.findOne({
            group_id: group_id
        }, (err, doc) => {
            if (doc !== null) {
                ctx.db.groups.findOne({group_id: group_id}, (err, doc) => {
                    ctx.replyWithMarkdown(ctx.strings.info_current_group(doc.boardUID, doc.owner));
                });
            } else {
                ctx.replyWithMarkdown(ctx.strings.info_unknown_group);
            }
        });

    }
}