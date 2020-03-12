'use strict';

/**
 * Config.js contains generic configuration options
 * for authentication configurations, see .env-example
 **/
module.exports = {
	defaults: {
		boards: {
			settings: {
				// indexed - Allows searching for this board
				indexed: true,
				// fake_names enables named messages, this hurts anonymity
				fake_names: true,
				// Language - Must exist in locale.js, otherwise uses 'EN'
				locale: 'EN',
				// Types of messages that are allowed
				allow: {
					animations: true,
					photos: true,
					stickers: true,
					text: true,
					videos: true,
				}
			},
		},
	},
};
