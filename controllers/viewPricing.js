var express = require('express');
var app = express();
var fs = require('fs');
var _ = require('underscore');
var path = require('path');

exports.index = (req, res) => {
    res.render('viewPricing', {
        title: 'Pricing'
    });
}