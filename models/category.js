const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
    category_no: Number,
    category_name: String
});

const Category = mongoose.model("category", CategorySchema, "category");

module.exports = Category;