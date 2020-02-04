const express = require('express');
const nunjucks = require('nunjucks');

const server = express();

const recipes = require('./data');

server.use(express.static('public'));

server.set("view engine", "njk");

nunjucks.configure("views", {
    express: server,
    autoescape: false,
    noCache: true
});

server.get("/", function(req,res) {
    return res.render("home", {recipes});
});

server.get("/about", function(req,res) {
    return res.render("about");
});

server.get("/recipes", function(req,res) {
    return res.render("recipes", {recipes});
});

server.get("/recipe", function(req,res) {
    const id = req.query.id;

    const recipe = recipes.find(function(recipe) {
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