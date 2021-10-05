var express = require('express');
var router = express.Router();
var db = require('../database');
const Sequelize = require('sequelize');

router.get("/reviews/:id", function(req, res) {
    console.log('req=====', req)
    db.Review.findAll({
        where: {
            HotelId : req.params.id,
            createdAt: {
                [Sequelize.Op.between] : [ new Date(req.query.from), new Date(req.query.to)]
            }
        }
    })
        .then( reviews => {
            res.status(200).send(reviews);
        })
        .catch( err => {
            res.status(500).send(JSON.stringify(err));
        });
});

router.get("/all", function(req, res) {
    db.Hotel.findAll( )
        .then( hotels => {
            res.status(200).send(hotels);
        })
        .catch( err => {
            res.status(500).send(err);
        });
});

/*router.get("/:id", function(req, res) {
    db.Hotel.findByPk(req.params.id)
        .then( hotel => {
            res.status(200).send(JSON.stringify(hotel));
        })
        .catch( err => {
            res.status(500).send(JSON.stringify(err));
        });
});*/


/*router.put("/", function(req, res) {
    db.Hotel.create({
        name: req.body.name,
    })
        .then( hotel => {
            res.status(200).send(JSON.stringify(hotel));
        })
        .catch( err => {
            res.status(500).send(JSON.stringify(err));
        });
});

router.delete("/:id", function(req, res) {
    db.Hotel.destroy({
        where: {
            id: req.params.id
        }
    })
        .then( () => {
            res.status(200).send();
        })
        .catch( err => {
            res.status(500).send(JSON.stringify(err));
        });
});*/

module.exports = router;