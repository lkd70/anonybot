'use strict';

const { getGroup, getUniqueFakeName, addGroup } = require('../../store/group');
const { getBoard } = require('../../store/board');

module.exports = ctx => {
	if (ctx.update.message.chat.type === 'supergroup') {
		const group_id = ctx.update.message.chat.id;
		if (ctx.state.command.args.length === 1) {
			const [ uid ] = ctx.state.command.args;

			getGroup({ group_id }).then(group => {
				if (group === null) {
					getBoard({ uid }).then(board => {
						if (board === null) {
							ctx.replyWithMarkdown(ctx.strings.join_unknown_group);
						} else {
							getUniqueFakeName(uid).then(fake_name => {
								addGroup({group_id, owner: fake_name, boardUID: uid }).then(() => {
									ctx.replyWithMarkdown(ctx.strings.join_success(
										board.board,
										fake_name
									));
								});
							});
						}
					});
				} else {
					ctx.replyWithMarkdown(ctx.strings.join_in_use);
				}
			});
		} else {
			ctx.replyWithMarkdown(ctx.strings.join_syntax);
		}
	} else {
		ctx.replyWithMarkdown(ctx.strings.join_outside_supergroup);
	}
};
