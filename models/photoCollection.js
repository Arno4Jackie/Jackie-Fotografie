const mongoose = require('mongoose');

const photoCollectionSchema = new mongoose.Schema({
    imgName: String,
    url: String,
    isMainImage: Boolean,
    category: Number

});

const photoCollection = mongoose.model("photoCollection", photoCollectionSchema, "photoCollection");

module.exports = photoCollection;