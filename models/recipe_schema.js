const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({

    dishName: {type: String, required: true},
    image:{type:String, required: false},
    cuisineType: {type: String, required: true},
    ingredients: {type: String, required: true},
    directions: {type: String, required: true},
    notes:{type: String},
    username:{type:String}
}, {timestamps: true});

const recipeItem = mongoose.model('recipeItem', recipeSchema)

module.exports = recipeItem