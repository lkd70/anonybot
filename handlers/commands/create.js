'use strict';

const { getRandomName } = require('../../utils/names');
const { settings } = require('../../config').defaults.boards;
const { addGroup, getGroup } = require('../../store/group');
const { addBoard, getNewBoardId } = require('../../store/board');

module.exports = ctx => {
	if (ctx.update.message.chat.type === 'supergroup') {
		const group_id = ctx.update.message.chat.id;
		if (ctx.state.command.args.length < 2) {
			ctx.replyWithMarkdown(ctx.strings.create_syntax_help);
		} else {
			const [ board, ...parts ] = ctx.state.command.args;
			const desc = parts.join(' ');
			const fake_name = getRandomName();

			getGroup({ group_id }).then(group => {
				if (group === null) {
					getNewBoardId().then(uid => {
						addBoard({ uid, board, desc, creator: fake_name, settings }).then(() => {
							addGroup({
								group_id,
								owner: fake_name,
								boardUID: uid
							}).then(ctx.replyWithMarkdown(ctx.strings.create_success_message(
								board,
								fake_name,
								uid
							)));
						});
					});
				} else {
					ctx.replyWithMarkdown(ctx.strings.create_group_in_use);
				}
			});
		}
	} else {
		ctx.replyWithMarkdown(ctx.strings.create_outside_soupergroup);
	}
};
