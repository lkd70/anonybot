// names.js is roughly based off of the 'goby.js' npm module. Greatly simplified.

const adjectives = require('./lists/adjectives');
const prefixes = require('./lists/prefixes');
const suffixes = require('./lists/suffixes');

const _pick = list => list[Math.floor(Math.random() * list.length)];

const getRandomName = () => {
    const adj = _pick(adjectives);
    const pre = _pick(prefixes);
    const suf = _pick(suffixes);
    const adj_sep = (adj[adj.length-1] === '-') ? '' : (pre[0] === '-') ? '' : ' ';
    const pre_sep = (adj[adj.length - 1] === '-') ? '' : (suf[0] === '-') ? '' : ' ';
    return `${adj}${adj_sep}${pre}${pre_sep}${suf}`;
};

module.exports = {
    getRandomName
};