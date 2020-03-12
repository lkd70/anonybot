'use strict';

const addedHandler = async (ctx, next) => {
	const msg = ctx.message;

	const added = msg.new_chat_members.filter(user =>
		user.username === ctx.me);

	if (added.length !== 1) {
		return next();
	}

	const members = await ctx.telegram.getChatMembersCount(msg.chat.id);

	if (members === 2) {
		ctx.db.groups.findOne({
			group_id: msg.chat.id
		}, (_err, doc) => {
			if (doc === null) {
				ctx.replyWithMarkdown(ctx.strings.help);
			} else {
				ctx.replyWithMarkdown(ctx.strings.added_back);
			}
			return next();
		});
	} else {
		ctx.reply(ctx.strings.added_too_many_members);
		ctx.telegram.leaveChat(msg.chat.id);
	}

	return next();
};

module.exports = addedHandler;
