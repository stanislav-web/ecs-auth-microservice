const {prettifyBytes} = require('./readable');
const child_process = require('child_process');

let memoryUsage = process.memoryUsage();

/**
 * Get all Resident Set bytes
 *
 * @return {string}
 */
const getResidentSet = () => {
    return prettifyBytes(memoryUsage.rss);
};

/**
 * Get total bytes for closures , objects & strings
 *
 * @return {string}
 */
const getHeapTotal = () => {
    return prettifyBytes(memoryUsage.heapTotal);
};

/**
 * Get used bytes for closures , objects & strings
 *
 * @return {string}
 */
const getHeapUsed = () => {
    return prettifyBytes(memoryUsage.heapUsed);
};

/**
 * Get current git revision
 *
 * @return {string|*}
 */
const getCurrentGitRevision = () => {
    const revision =  child_process.execSync('git rev-parse HEAD')
        .toString().trim();
    return ('undefined' !== revision) ? revision : '';
};

/**
 * Get current git tag
 *
 * @return {string|*}
 */
const getCurrentGitTag = () => {
    const tag = child_process.execSync('git name-rev --tags --name-only $(git rev-parse HEAD)')
        .toString().trim();
    return ('undefined' !== tag) ? tag : '';
};

/**
 * Export
 *
 * @type {{getResidentSet: (function()), getHeapTotal: (function()), getHeapUsed: (function()), getCurrentGitRevision: (function()), getCurrentGitTag: (function())}}
 */
module.exports = {
    getResidentSet,
    getHeapTotal,
    getHeapUsed,
    getCurrentGitRevision,
    getCurrentGitTag
};