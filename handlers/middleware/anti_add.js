'use strict';

const antiAddHandler = (ctx, next) => {
	const msg = ctx.message;

	const added = msg.new_chat_members.filter(user => user.username !== ctx.me);

	if (added.length === 0) {
		return next();
	}

	for (const member of added) {
		ctx.telegram.kickChatMember(ctx.chat.id, member.id);
	}

	ctx.replyWithMarkdown(ctx.strings.kicked(added));

	return next();
};

module.exports = antiAddHandler;
