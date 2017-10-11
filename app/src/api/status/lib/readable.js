/**
 * UNITS
 *
 * @type {[string,string,string,string,string,string,string,string,string]}
 */
const UNITS = ['B', 'kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

/**
 * Prettify bytes to human readable string
 *
 * @param num
 * @return {string}
 */
const prettifyBytes = (num) => {
    if (!Number.isFinite(num)) {
        throw new TypeError(`Expected a finite number, got ${typeof num}: ${num}`);
    }

    const neg = 0 > num;

    if (neg) {
        num = -num;
    }

    if (1 > num) {
        return (neg ? '-' : '') + num + ' B';
    }

    const exponent = Math.min(Math.floor(Math.log10(num) / 3), UNITS.length - 1);
    const numStr = Number((num / Math.pow(1000, exponent)).toPrecision(3));
    const unit = UNITS[exponent];

    return (neg ? '-' : '') + numStr + ' ' + unit;
};

/**
 * Export
 *
 * @type {
 *          {prettify: (function(*=))
 *       }
 *    }
 */
module.exports = {
    prettifyBytes
};