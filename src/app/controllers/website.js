const Chef = require('../models/Chef');
const Recipe = require('../models/Recipe');

module.exports = {
    //Home
    home (req,res) {
        let { filter } = req.query;

        Recipe.allReceiptsHome(filter, function(receipts) {
            Recipe.chefSelectOptions(function(options) {
                return res.render("website/home", {receipts, chefsOptions: options});
            });
        });
    },

    //About
    about (req,res) {
        return res.render("website/about");
    },

    //Receipts
    receipts (req,res) {
        let { filter } = req.query;

        Recipe.allReceiptsPage(filter, function(receipts) {
            Recipe.chefSelectOptions(function(options) {
                return res.render("website/receipts", {receipts, filter, chefsOptions: options});
            });
        });
    },

    //Recipe
    recipe (req,res) {
        const { id } = req.query;

        Recipe.find(id, function(recipe) {
            return res.render("website/recipe", {recipe});
        });
    },

    //chefs
    chefs (req,res) {
        Chef.allChefs(function(chefs) {
            return res.render("website/chefs", {chefs});
        });
    }
};