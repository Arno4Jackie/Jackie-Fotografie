/**
 * GET /
 * Home page.
 */
var photoCollection = require('../models/photoCollection');

exports.index = (req, res) => {
    console.log('test');
    photoCollection.findOne({
        isMainImage: true
    }).exec(function(err, doc) {
        if (err) throw err;
        var imgUrl = doc.url;

        res.render('home', {
            title: 'Jackie Fotografie',
            imgUrl: imgUrl
        });
    });
};