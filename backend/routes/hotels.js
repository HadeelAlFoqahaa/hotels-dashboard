var express = require('express');
var router = express.Router();
var db = require('../database');
var helpers = require('../helpers/hotelHelper');
const Sequelize = require('sequelize');


router.get("/reviews/:id", function (req, res) {

    const where = {
        HotelId: req.params.id,
    };

    const regex = /^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/;
    const filterByDates = regex.test(req.query.from) && regex.test(req.query.to);

    if (filterByDates) {
        where.createdAt = {
            [Sequelize.Op.between]: [new Date(req.query.from), new Date(req.query.to + '  23:59:59.999 +00:00')]
        }
    }

    db.Review.findAll({
        where: where
    })
        .then(reviews => {
            res.status(200).send(manipulateReviews(reviews));
        })
        .catch(err => {
            res.status(500).send(JSON.stringify(err));
        });
});

router.get("/all", function (req, res) {
    db.Hotel.findAll()
        .then(hotels => {
            res.status(200).send(hotels);
        })
        .catch(err => {
            res.status(500).send(err);
        });
});


function manipulateReviews(reviews) {

    if (!reviews.length) return {};

    let dateRangeInDays = helpers.findDiffBetweenDates(reviews);

    let reviewsList = {};

    if (helpers.isInRange(dateRangeInDays, [0, 29])) {

        // Daily grouped
        const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        reviews.forEach((review) => {
            let day = review.getDataValue('createdAt');
            handleReviewsList(reviewsList, review, weekdays[new Date(day).getDay()])
        });

    } else if (helpers.isInRange(dateRangeInDays, [30, 89])) {

        // Weekly grouped
        reviews.forEach((review) => {
            let day = review.getDataValue('createdAt');
            handleReviewsList(reviewsList, review, new Date(day).getWeek())
        });

    } else {

        // Monthly grouped
        const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        reviews.forEach((review) => {
            let month = review.getDataValue('createdAt');
            handleReviewsList(reviewsList, review, monthNames[new Date(month).getMonth()])
        });
    }

    return {
        list: reviewsList
    };
}

function handleReviewsList(reviewsList, review, key) {
    reviewsList[key] = reviewsList[key] || {'date-group': []};
    let score = review.getDataValue('score');
    reviewsList[key]['review-count'] = reviewsList[key]['review-count'] + 1 || 1;
    reviewsList[key]['sum'] = reviewsList[key]['sum'] + score || score;
    reviewsList[key]['average-score'] = reviewsList[key]['sum'] / reviewsList[key]['review-count'];
    reviewsList[key]['date-group'].push(score);
}


module.exports = router;