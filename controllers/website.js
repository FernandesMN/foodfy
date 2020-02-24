const data = require("../data.json");

//Home
exports.home = function(req,res) {
    return res.render("website/home", {receipts: data.receipts});
};

//About
exports.about = function(req,res) {
    return res.render("website/about");
};

//Receipts
exports.receipts = function(req,res) {
    return res.render("website/receipts", {receipts: data.receipts});
};

//Recipe
exports.recipe = function(req,res) {
    const id = req.query.id;

    const recipe = data.receipts.find(function(recipe) {
        return id == recipe.id;
    });

    if(!recipe) {
        return res.send('Not found');
    }

    return res.render("website/recipe", {recipe});
};