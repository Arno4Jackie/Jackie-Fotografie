var express = require('express');
var app = express();
var Pricing = require('../models/pricing');
var fs = require('fs');
var _ = require('underscore');
var path = require('path');

exports.index = (req, res) => {
    Pricing.find().exec(function(err, doc) {
        if (err) throw err;
        priceList = doc;

        res.render('viewPricing', {
            title: 'Pricing',
            imgUrl: 'background/' + getMostRecentFileName(),
            priceList: priceList
        });
    });
}

exports.viewPricing = (req, res) => {
    res.render('viewPricing', {
        title: 'Pricing',
        imgUrl: 'background/' + getMostRecentFileName()
    });
}

exports.editPrice = (req, res) => {
    Pricing.find().exec(function(err, doc) {
        if (err) throw err;
        priceList = doc;

        res.render('pricing', {
            title: 'Pricing',
            imgUrl: 'background/' + getMostRecentFileName(),
            priceList: priceList
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

        res.render('newPrice', {
            title: 'Add new Price',
            imgUrl: imgUrl
        })
    });
}

function getMostRecentFileName() {
    var dir = 'public/background';
    var files = fs.readdirSync(dir);

    // use underscore for max()
    return _.max(files, function(f) {
        var fullpath = path.join(dir, f);

        // ctime = creation time is used
        // replace with mtime for modification time
        return fs.statSync(fullpath).ctime;
    });
}