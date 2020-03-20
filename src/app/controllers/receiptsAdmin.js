const fs = require('fs');
const data = require('../../../data.json');
const Recipe = require('../models/Recipe')
const { objectToString } = require('../../lib/utils');

module.exports = {
    //Listing receipts (Mostrar a lista de receitas)
    receipts(req,res) {
        let { filter } = req.query;

        Recipe.allReceiptsHome(filter, function(receipts) {
            Recipe.chefSelectOptions(function(options) {
                return res.render("admin/receipts/home", {receipts, chefsOptions: options});
            });
        })
    },

    //Create recipe (Mostrar o formulário de nova receita)
    create(req,res) {
        Recipe.chefSelectOptions(function(options) {
            return res.render("admin/receipts/create", {chefsOptions: options});
        });
    },

    //Show recipe (Exibir detalhes de uma receita)
    show(req,res) {
        const { id } = req.params;

        Recipe.find(id, function(recipe) {
            Recipe.chefSelectOptions(function(options){
                recipe.ingredients = objectToString(recipe.ingredients);
                recipe.preparation = objectToString(recipe.preparation);
                return res.render("admin/receipts/recipe", {recipe, chefsOptions: options});
            })
        });
    },

    //Edit recipe (Mostrar formulário de edição de uma receita)
    edit(req,res) {
        const { id } = req.params;

        Recipe.find(id, function(recipe) {
            Recipe.chefSelectOptions(function(options) {
                recipe.ingredients = objectToString(recipe.ingredients);
                recipe.preparation = objectToString(recipe.preparation);
                return res.render("admin/receipts/edit", {recipe, chefsOptions: options});
            });
        });
    },

    //New recipe
    post(req,res) {
        const keys = Object.keys(req.body);

        for (key of keys) {
            if(req.body[key] == "") {
                return res.send("Please, fill all fields.");
            }
        }

        Recipe.create(req.body, function(recipe) {
            return res.redirect(`/admin/receipts/${recipe.id}`);
        });
    },

    //Update recipe
    put(req,res) {
        const keys = Object.keys(req.body);

        for (key of keys) {
            if (req.body[key] == "") {
                return res.send("Please, fill in all fields.");
            };
        };

        Recipe.update(req.body, function() {
            return res.redirect(`/admin/receipts/${req.body.id}`);
        });
    },

    //Delete recipe
    delete(req,res) {
        const { id } = req.body

        Recipe.remove(id, function() {
            return res.redirect("/admin/receipts");
        });
    }
}