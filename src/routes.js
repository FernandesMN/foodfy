const express = require('express');
const website = require('../src/app/controllers/website');
const admin = require('../src/app/controllers/admin');
const routes = express.Router();

//Website routes
routes.get("/", website.home);
routes.get("/about", website.about);
routes.get("/receipts", website.receipts);
routes.get("/recipe", website.recipe);
routes.get("/chefs", website.chefs);

//Admin routes
routes.get("/admin/receipts", admin.receipts);
routes.get("/admin/receipts/create", admin.create);
routes.get("/admin/receipts/:id", admin.show);
routes.get("/admin/receipts/:id/edit", admin.edit);
routes.post("/admin/receipts", admin.post);
routes.put("/admin/receipts", admin.put);
routes.delete("/admin/receipts", admin.delete);

routes.use(function(req,res) {
    return res.status(404).render("not-found");
});

module.exports = routes;