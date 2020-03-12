'use strict';

const Extra = require('telegraf/extra');
const { getMeFakeName } = require('../../utils/db');

const processMessage = (ctx, next) => {
	if (ctx.chat.type !== 'supergroup') return next();
	ctx.telegram.deleteMessage(ctx.update.message.chat.id, ctx.update.message.message_id);
	const group_id = ctx.update.message.chat.id;
	const photo_id = ctx.message.photo[ctx.message.photo.length - 1].file_id;

	getMeFakeName(ctx.db.groups, group_id).then(doc => {
		const {
			owner,
			boardUID
		} = doc;
		ctx.db.groups.find({
			boardUID
		}, (_err, groupDocs) => groupDocs.forEach(group =>
			ctx.telegram.sendPhoto(group.group_id, photo_id, Extra.caption(`From: ${owner}`))));
	});

	return next();
};

module.exports = processMessage;
