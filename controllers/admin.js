const fs = require('fs');
const data = require('../data.json');
const receipts = require('../data');

//Listing receipts (Mostrar a lista de receitas)
exports.receipts = function(req,res) {
    return res.render("admin/home", {receipts: data.receipts});
};

//Create recipe (Mostrar o formulário de nova receita)
exports.create = function(req,res) {
    return res.render("admin/create");
};

//Show recipe (Exibir detalhes de uma receita)
exports.show = function(req,res) {
    const { id } = req.params;

    const foundRecipe = data.receipts.find(function(recipe) {
        return id == recipe.id;
    });

    const recipe = {
        ...foundRecipe
    }

    return res.render("admin/recipe", {recipe});
};

//Edit recipe (Mostrar formulário de edição de uma receita)
exports.edit = function(req,res) {
    const { id } = req.params;

    const foundRecipe = data.receipts.find(function(recipe) {
        return recipe.id == id;
    });

    if(!foundRecipe) return res.send("recipe not found.");

    const recipe = {
        ...foundRecipe
    }

    return res.render("admin/edit", {recipe});
};

//New recipe
exports.post = function(req,res) {
    const keys = Object.keys(req.body);

    for (key of keys) {
        if(req.body[key] == "") {
            return res.send("Please, fill all fields.");
        }
    }

    let id = 1;
    const lastRecipe = data.receipts[data.receipts.length - 1];
    
    if(lastRecipe) {
        id = Number(lastRecipe.id) + 1;
    }

    let { author, title, image, ingredients, preparation, information } = req.body;

    data.receipts.push({
        id,
        image,
        title,
        author,
        ingredients,
        preparation,
        information
    });

    fs.writeFile("data.json", JSON.stringify(data,null,2), function(err) {
        if(err) return res.send("write file error.");

        return res.redirect("/admin/receipts");
    });
};

//Update recipe
exports.put = function(req,res) {
    const { id } = req.body;
    let index = 0;

    const foundRecipe = data.receipts.find(function(recipe, foundIndex) {
        if (id == recipe.id) {
            index = Number(foundIndex);
            return true;
        }
    })

    const recipe = {
        ...foundRecipe,
        ...req.body,
    }

    data.receipts[index] = recipe;

    fs.writeFile("data.json", JSON.stringify(data,null,2), function(err) {
        if (err) return res.send("write file error.");

        return res.redirect(`/admin/receipts/${id}`);
    });
};

//Delete recipe
exports.delete = function(req,res) {
    const { id } = req.body;

    const filteredReceipts = data.receipts.filter(function(recipe) {
        return recipe.id != id;
    })

    data.receipts = filteredReceipts;

    fs.writeFile("data.json", JSON.stringify(data,null,2), function(err) {
        if(err) return res.send("write file error.");
    
        return res.redirect("/admin/receipts");
    });
};