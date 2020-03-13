const Chef = require('../models/Chef');
const Recipe = require('../models/Recipe');

//Home
exports.home = function(req,res) {
    const { filter } = req.query;

    Recipe.allReceipts(filter, function(receipts) {
        Recipe.chefSelectOptions(function(options) {
            return res.render("website/home", {receipts, chefsOptions: options, filter});
        });
    });
};

//About
exports.about = function(req,res) {
    return res.render("website/about");
};

//Receipts
exports.receipts = function(req,res) {
    const { filter } = req.query;

    Recipe.allReceipts(filter, function(receipts) {
        Recipe.chefSelectOptions(function(options) {
            return res.render("website/receipts", {receipts, filter, chefsOptions: options});
        });
    });
};

//Recipe
exports.recipe = function(req,res) {
    const { id } = req.query;

    Recipe.find(id, function(recipe) {
        return res.render("website/recipe", {recipe});
    });
};

//chefs
exports.chefs = function(req,res) {
    Chef.allChefs(function(chefs) {
        return res.render("website/chefs", {chefs});
    });
};