'use strict';

const Extra = require('telegraf/extra');
const { getGroupById, getBoardById } = require('../../utils/db');

const processMessage = (ctx, next) => {
	if (ctx.chat.type !== 'supergroup') return next();
	ctx.telegram.deleteMessage(ctx.update.message.chat.id, ctx.update.message.message_id);
	const group_id = ctx.update.message.chat.id;
	const animation_id = ctx.update.message.animation.file_id;

	getGroupById(ctx.db.groups, group_id).then(doc => {
		const { owner, boardUID } = doc;
		getBoardById(ctx.db.boards, boardUID).then(settings => {
			if (settings.allow.animations) {
				ctx.db.groups.find({
					boardUID
				}, (_err, groupDocs) => groupDocs.forEach(group =>
					ctx.telegram.sendAnimation(
						group.group_id,
						animation_id,
						Extra.caption(`From: ${owner}`)
					)));
			}
		});
	});

	return next();
};

module.exports = processMessage;
