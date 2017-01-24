const mongoose = require('mongoose');

const PricingSchema = new mongoose.Schema({
    ShootType: String,
    Price: Number,
    Time: String
});

const Pricing = mongoose.model("pricing", PricingSchema, "pricing");

module.exports = Pricing;