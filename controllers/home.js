/**
 * GET /
 * Home page.
 */
var photoCollection = require('../models/photoCollection');
var path = require('path');
var fs = require('fs');
var _ = require('underscore');
var request = require('request');

exports.index = (req, res) => {
    var imgPath = path.join(__dirname, '../background');
    var NewImageName;
    photoCollection.findOne({
        isMainImage: true
    }).exec(function(err, doc) {
        if (err) throw err;
        var imgUrl = doc.url;
        var imgName = doc.imgName;
        var newFileName = getMostRecentFileName('public/background');
        if (imgName == newFileName) {
            res.render('home', {
                title: 'Jackie Fotografie',
                imgUrl: 'background/' + newFileName
            });
        } else {
            fs.readdirSync(path.join(__dirname, '../public/background')).forEach((fileName) => {
                fs.unlinkSync(path.join(__dirname, '../public/background/') + fileName);
            });
            download(imgUrl, path.join(path.join(__dirname, '../public/background'), imgName), function() {
                NewImageName = 'background/' + imgName;
                console.log(NewImageName);
                res.render('home', {
                    title: 'Jackie Fotografie',
                    imgUrl: NewImageName
                });
            })
        }

    });
};

function getMostRecentFileName(dir) {
    var files = fs.readdirSync(dir);

    // use underscore for max()
    return _.max(files, function(f) {
        var fullpath = path.join(dir, f);

        // ctime = creation time is used
        // replace with mtime for modification time
        return fs.statSync(fullpath).ctime;
    });
}

var download = function(uri, filename, callback) {
    request.head(uri, function(err, res, body) {
        console.log('content-type:', res.headers['content-type']);
        console.log('content-length:', res.headers['content-length']);

        request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
    });
};