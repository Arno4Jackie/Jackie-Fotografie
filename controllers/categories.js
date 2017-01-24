/**
 * GET /admin
 * Admin Page.
 */
var express = require('express');
var app = express();
var photoCollection = require('../models/photoCollection');

exports.index = (req, res) => {
    var imgUrl;
    photoCollection.findOne({
        isMainImage: true
    }).exec(function(err, doc) {
        if (err) throw err;
        imgUrl = doc.url;
        res.render('categories', {
            title: 'Edit Categories',
            imgUrl: imgUrl
        });
    });


}