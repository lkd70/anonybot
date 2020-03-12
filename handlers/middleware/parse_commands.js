'use strict';

const regex = /^\/([^@\s]+)@?(?:(\S+)|)\s?([\s\S]+)?$/i;

const handler = async (ctx, next) => {
    try {
        const parts = regex.exec(ctx.message.text.trim());
        if (!parts) return next();
        const command = {
            text: ctx.message.text,
            command: parts[1],
            bot: parts[2],
            args: typeof parts[3] === 'undefined' ?
                new Array(0) :
                parts[3].split(/\s+/).filter(arg => arg.length)
        };
        ctx.state.command = command;
        return next();
	} catch {
		return next();
	}
};

module.exports = handler;
