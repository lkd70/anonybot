'use strict';

module.exports = () => ({ replyWithMarkdown }) => replyWithMarkdown(`\
Welcome to Anonybot!
Type /create to make a new board!
or if you have the hash for an existing group, simply '/join HASH'

Don't forget to make me an admin so I can manage this group...`);