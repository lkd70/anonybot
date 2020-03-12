'use strict';

const Extra = require('telegraf/extra');
const { getMeFakeName } = require('../../utils/db');

const processMessage = (ctx, next) => {
	if (ctx.chat.type !== 'supergroup') return next();
	ctx.telegram.deleteMessage(ctx.update.message.chat.id, ctx.update.message.message_id);
	const group_id = ctx.update.message.chat.id;
	const video_id = ctx.update.message.video.file_id;

	getMeFakeName(ctx.db.groups, group_id).then(doc => {
		const {
			owner,
			boardUID
		} = doc;
		ctx.db.groups.find({
			boardUID
		}, (_err, groupDocs) => groupDocs.forEach(group =>
			ctx.telegram.sendVideo(group.group_id, video_id, Extra.caption(`From: ${owner}`))));
	});
	return next();
};

module.exports = processMessage;
