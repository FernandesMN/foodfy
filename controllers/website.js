const receipts = require('../data');

//Home
exports.home = function(req,res) {
    return res.render("website/home", {receipts});
};

//About
exports.about = function(req,res) {
    return res.render("website/about");
};

//Receipts
exports.receipts = function(req,res) {
    return res.render("website/receipts", {receipts});
};

//Recipe
exports.recipe = function(req,res) {
    const id = req.query.id;

    const recipe = receipts.find(function(recipe) {
        return id == recipe.id;
    });

    if(!recipe) {
        return res.send('Not found');
    }

    return res.render("website/recipe", {recipe});
};