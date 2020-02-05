const express = require('express');
const nunjucks = require('nunjucks');

const server = express();

const receipts = require('./data');

server.use(express.static('public'));

server.set("view engine", "njk");

nunjucks.configure("views", {
    express: server,
    autoescape: false,
    noCache: true
});

server.get("/", function(req,res) {
    return res.render("home", {receipts});
});

server.get("/about", function(req,res) {
    return res.render("about");
});

server.get("/receipts", function(req,res) {
    return res.render("receipts", {receipts});
});

// server.get("/recipes/:index", function(req,res){
//     const recipeIndex = req.params.index;
//     console.log(receipts[recipeIndex]);

//     return res.render("recipe", {recipe: receipts[recipeIndex]});
// });

server.get("/recipe", function(req,res) {
    const id = req.query.id;

    const recipe = receipts.find(function(recipe) {
        return id == recipe.id;
    });

    if(!recipe) {
        return res.send('Not found');
    }

    return res.render("recipe", {recipe});
});

server.use(function(req,res) {
    return res.status(404).render("not-found");
});

server.listen(5000, function() {
    return console.log('server is running...');
});