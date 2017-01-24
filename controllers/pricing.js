/**
 * GET /admin
 * Admin Page.
 */
var express = require('express');
var app = express();
var photoCollection = require('../models/photoCollection');
var Pricing = require('../models/pricing');

exports.index = (req, res) => {
    var imgUrl, priceList;
    photoCollection.findOne({
        isMainImage: true
    }).exec(function(err, doc) {
        if (err) throw err;
        imgUrl = doc.url;

        Pricing.find().exec(function(err, doc) {
            if (err) throw err;
            priceList = doc;

            res.render('pricing', {
                title: 'Pricing',
                imgUrl: imgUrl,
                priceList: priceList
            });
        });
    });
}

exports.addNewPrice = (req, res) => {
     var imgUrl;
    photoCollection.findOne({
        isMainImage: true
    }).exec(function(err, doc) {
        if (err) throw err;
        imgUrl = doc.url;

        res.render('newPrice',{
            title: 'Add new Price',
            imgUrl: imgUrl
        })
    });
}