function findMaxReviewDate(reviews) {
    return reviews.reduce(function (prev, curr) {
        return prev.getDataValue('createdAt') > curr.getDataValue('createdAt') ? prev : curr;
    });
}

function findMinReviewDate(reviews) {
    return reviews.reduce(function (prev, curr) {
        return prev.getDataValue('createdAt') < curr.getDataValue('createdAt') ? prev : curr;
    });
}

function findDiffBetweenDates(reviews) {

    let minDate = findMinReviewDate(reviews);
    let maxDate = findMaxReviewDate(reviews);

    // To calculate the time difference of two dates
    let diffInTimeStamp = maxDate.getDataValue('createdAt').getTime() - minDate.getDataValue('createdAt').getTime();

    // To calculate the no. of days between two dates
    return diffInTimeStamp / (1000 * 3600 * 24);
}

function isInRange(number, ranges) {
    return number >= ranges[0] && number <= ranges[1];
}


/**
 * Returns the week number for this date.  dowOffset is the day of week the week
 * "starts" on for your locale - it can be from 0 to 6. If dowOffset is 1 (Monday),
 * the week returned is the ISO 8601 week number.
 * @param int dowOffset
 * @return int
 */
Date.prototype.getWeek = function (dowOffset) {
    /*getWeek() was developed by Nick Baicoianu at MeanFreePath: http://www.epoch-calendar.com */

    dowOffset = typeof dowOffset == 'int' ? dowOffset : 0; //default dowOffset to zero
    var newYear = new Date(this.getFullYear(), 0, 1);
    var day = newYear.getDay() - dowOffset; //the day of week the year begins on
    day = day >= 0 ? day : day + 7;
    var daynum =
        Math.floor(
            (this.getTime() -
                newYear.getTime() -
                (this.getTimezoneOffset() - newYear.getTimezoneOffset()) * 60000) /
            86400000
        ) + 1;
    var weeknum;
    //if the year starts before the middle of a week
    if (day < 4) {
        weeknum = Math.floor((daynum + day - 1) / 7) + 1;
        if (weeknum > 52) {
            nYear = new Date(this.getFullYear() + 1, 0, 1);
            nday = nYear.getDay() - dowOffset;
            nday = nday >= 0 ? nday : nday + 7;
            /*if the next year starts before the middle of
                 the week, it is week #1 of that year*/
            weeknum = nday < 4 ? 1 : 53;
        }
    } else {
        weeknum = Math.floor((daynum + day - 1) / 7);
    }
    return `Week-${weeknum}`;
};


module.exports = {
    isInRange: isInRange,
    findDiffBetweenDates: findDiffBetweenDates,
}