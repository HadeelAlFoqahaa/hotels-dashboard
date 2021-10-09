var db = require('../database');

createHotels();

function createHotels() {
    db.Hotel.bulkCreate(
        [{name:'Hotel 1'},{name:'Hotel 2'}, {name:'Hotel 3'}, {name:'Hotel 4'}, {name:'Hotel 5'}, {name:'Hotel 6'}, {name:'Hotel 7'}, {name:'Hotel 8'}, {name:'Hotel 9'}, {name:'Hotel 10'}, ]
    ).then(createReviews) .catch( err => {
        console.log('--------- Error upon creating Hotles -------------')
        console.log(err);
        console.log('----------------------')
    });
}


// TODO put data with different range to be grouped weekly, daily, monthly

function createReviews(hotels) {

    console.log('---------Hotles created-------------New')
    console.log(hotels);
    console.log('----------------------');

    let reviewsList = [];
    hotels.forEach((hotel) => {
        for (let i = 0; i < 10; i++) {
            let review = {
                HotelId: hotel.getDataValue('id'),
                comment: makeRandomText(),
                score: random(10, 100),
                createdAt: randomDate(new Date(2018, 0, 1), new Date())
            };
            reviewsList.push(review);
        }
    });

    db.Review.bulkCreate(reviewsList).then((reviews) => {
        console.log('---------Reviews created-------------')
        console.log(reviews);
        console.log('----------------------');
    }) .catch( err => {
        console.log('--------- Error upon creating Reviews -------------')
        console.log(err);
        console.log('----------------------')
    });

}


function randomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}


function random(mn, mx) {
    return Math.floor( Math.random() * (mx - mn) + mn);
}

function makeRandomText(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() *
            charactersLength));
    }
    return result;
}