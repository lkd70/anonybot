'use strict';

const hasPerms = bot => new Promise(resolve => {
	if (bot.status !== 'administrator') resolve(false);
	if (bot.can_change_info &&
        bot.can_delete_messages &&
        bot.can_restrict_members &&
        bot.can_pin_messages) resolve(true);
	resolve(false);
});

const handler = (ctx, next) => {
	ctx.telegram.getChatMember(
		ctx.update.message.chat.id,
		ctx.botInfo.id
	).then(hasPerms).then(isAdmin => {
		if (isAdmin) {
			return next();
		}
		return ctx.reply(ctx.strings.must_be_admin);

	}).catch(err => {
		if (err.code !== 403) throw new Error(err);
	});
};

module.exports = handler;
