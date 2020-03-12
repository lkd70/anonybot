'use strict';

const Extra = require('telegraf/extra');
const { getMeFakeName } = require('../../utils/db');

const processMessage = (ctx, next) => {
	if (ctx.chat.type !== 'supergroup') return next();
	ctx.telegram.deleteMessage(ctx.update.message.chat.id, ctx.update.message.message_id);
	const group_id = ctx.update.message.chat.id;
	const sticker_id = ctx.update.message.sticker.file_id;

	getMeFakeName(ctx.db.groups, group_id).then(doc => {
		const {
			owner,
			boardUID
		} = doc;
		ctx.db.groups.find({
			boardUID
		}, (_err, groupDocs) => groupDocs.forEach(group =>
			ctx.telegram.sendSticker(group.group_id, sticker_id).then(c => {
				ctx.telegram.sendMessage(
					group.group_id,
					`From: ${owner}`,
					Extra.inReplyTo(c.message_id)
				);
			})));
	});
	return next();
};

module.exports = processMessage;
