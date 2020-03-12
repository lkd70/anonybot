'use strict';

const Extra = require('telegraf/extra');
const { getGroup, getGroups } = require('../../store/group');
const { getBoard } = require('../../store/board');

const processMessage = (ctx, next) => {
	if (ctx.chat.type !== 'supergroup') return next();
	ctx.telegram.deleteMessage(ctx.update.message.chat.id, ctx.update.message.message_id);
	const group_id = ctx.update.message.chat.id;
	const video_id = ctx.update.message.video.file_id;

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
					ctx.telegram.sendVideo(
						g.group_id,
						video_id,
						Extra.caption(`From: ${owner}`)
					);
				}));
			}
		});
	});

	return next();
};

module.exports = processMessage;
