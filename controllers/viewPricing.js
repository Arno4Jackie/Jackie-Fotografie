var express = require('express');
var app = express();
var fs = require('fs');
var _ = require('underscore');
var path = require('path');

exports.index = (req, res) => {
    res.render('viewPricing', {
        title: 'Pricing',
        imgUrl: 'background/' + getMostRecentFileName(),
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