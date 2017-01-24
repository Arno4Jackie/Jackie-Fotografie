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

    // res.render('home', {
    //     title: 'Jackie Fotografie',
    //     imgUrl: 'https://docs.google.com/uc?id=0BydPt840pObUNG53dXd6M1BZQm8&amp;export=download'
    // });
};


// (background=imgUrl, style="background-size:cover;")