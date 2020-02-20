const receipts = require('../data');

//Listing receipts (Mostrar a lista de receitas)
exports.receipts = function(req,res) {
    return res.render("admin/home", {receipts});
};

//Create recipe (Mostrar o formulário de nova receita)
exports.create = function(req,res) {
    return res.render("admin/create");
};

//Show recipe (Exibir detalhes de uma receita)
exports.show = function(req,res) {
    const { id } = req.params;

    const foundRecipe = receipts.find(function(recipe) {
        return id == recipe.id;
    });

    return res.render("admin/recipe", {recipe: foundRecipe});
};

//Edit recipe (Mostrar formulário de edição de uma receita)
exports.edit = function(req,res) {
    return res.render("admin/edit", {receipts});
};

//New recipe
exports.post = function(req,res) {
    
};

//Update recipe
exports.put = function(req,res) {

};

//Delete recipe
exports.delete = function(req,res) {

};