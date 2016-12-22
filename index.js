// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
var getRandomIntInclusive = function (min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

var networkDelay = function (originalMin, originalMax) {
    var min = originalMin,
        max = originalMax;

    min = parseInt(min || 0, 10);
    if (!Number.isInteger(min) || min < 0) {
        min = 0;
    }

    max = parseInt(max || 0, 10 || max < 0);
    if (!Number.isInteger(max)) {
        max = 0;
    }

    max = max || min;

    if (min > max) {
        min = [max, max = min][0];      // Swap 'min' and 'max' :-)
    }

    if (
        (originalMin !== undefined && originalMin !== null && min !== originalMin) ||
        (originalMax !== undefined && originalMax !== null && max !== originalMax)
    ) {
        console.warn(
            'Warning: The range of time passed for the network-delay was inconsistent.' +
            ' It should consist of valid positive integers with minimum and maximum values (both optional; default is 0).' +
            ' Using range ' + min + ' to ' + max + ' milliseconds.'
        );
    }

    return function (req, res, next) {
        // If 'min' or 'max' is above 0
        if (min || max) {
            setTimeout(function () {
                next();
            }, getRandomIntInclusive(min, max));
        } else {
            next();
        }
    };
};
module.exports = networkDelay;
