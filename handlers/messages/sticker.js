'use strict';

const Extra = require('telegraf/extra');
const { getGroup, getGroups } = require('../../store/group');
const { getBoard } = require('../../store/board');

const processMessage = (ctx, next) => {
	if (ctx.chat.type !== 'supergroup') return next();
	ctx.telegram.deleteMessage(ctx.update.message.chat.id, ctx.update.message.message_id);
	const group_id = ctx.update.message.chat.id;
	const sticker_id = ctx.update.message.sticker.file_id;

	getGroup({
		group_id
	}).then(group => {
		const {
			owner,
			boardUID
		} = group;
		getBoard({
			uid: boardUID
		}).then(board => {
			if (board.settings.allow.animations) {
				getGroups({
					boardUID
				}).then(groups => groups.forEach(g => {
					ctx.telegram.sendSticker(
						g.group_id,
						sticker_id
					).then(c => {
						ctx.telegram.sendMessage(
							g.group_id,
							`From: ${owner}`,
							Extra.inReplyTo(c.message_id)
						);
					});
				}));
			}
		});
	});

	return next();
};

module.exports = processMessage;
