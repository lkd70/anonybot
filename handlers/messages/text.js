'use strict';

const Extra = require('telegraf/extra');
const { getGroupById, getBoardById } = require('../../utils/db');

const processMessage = (ctx, next) => {
	if (ctx.chat.type !== 'supergroup') return next();
	ctx.telegram.deleteMessage(ctx.update.message.chat.id, ctx.update.message.message_id);
	const message = ctx.update.message.text;
	const group_id = ctx.update.message.chat.id;

	getGroupById(ctx.db.groups, group_id).then(doc => {
		const { owner, boardUID } = doc;
		getBoardById(ctx.db.boards, boardUID).then(settings => {
			if (settings.allow.text) {
				ctx.db.groups.find({
					boardUID
				}, (_err, groupDocs) => groupDocs.forEach(group =>
					ctx.telegram.sendMessage(
						group.group_id,
						`*[${owner}]* - ${message}`, Extra.markdown()
					)));
			}
		});
	});
	return next();
};

module.exports = processMessage;
