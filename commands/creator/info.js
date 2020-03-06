'use strict';

module.exports = () => ctx => {
    if (ctx.update.message.chat.type !== 'supergroup') {
        console.log(ctx.update.message.chat.type)
        ctx.replyWithMarkdown('this is a supergroup command. Ensure that you make this bot admin with the `delete message` permission');
    } else {
        const group_id = ctx.update.message.chat.id;
        ctx.db.groups.findOne({
            group_id: group_id
        }, (err, doc) => {
            if (doc !== null) {
                ctx.db.groups.findOne({group_id: group_id}, (err, doc) => {
                    console.log(doc);
                    ctx.replyWithMarkdown(`*INFO*\n\nhash: \`${doc.boardUID}\`\nyour name: \`${doc.owner.fake_name}\``);
                });
            } else {
                ctx.replyWithMarkdown(`This group isn't known to the bot yet... /create or /join a board to register this group.`);
            }
        });

    }
}