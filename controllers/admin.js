/**
 * GET /admin
 * Admin Page.
 */
var express = require('express');
var app = express();
var photoCollection = require('../models/photoCollection');

exports.index = (req, res) => {
    var imgUrl;
    // photoCollection.findOne({
    //     isMainImage: true
    // }).exec(function(err, doc) {
    //     if (err) throw err;
    //     imgUrl = doc.url;

    //     res.render('admin', {
    //         title: 'Admin Page',
    //         imgUrl: imgUrl
    //     });
    // });

    res.render('admin', {
        title: 'Admin Page',
        imgUrl: 'https://docs.google.com/uc?id=0BydPt840pObUNG53dXd6M1BZQm8&amp;export=download'
    });


}