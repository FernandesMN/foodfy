const express = require('express');
const website = require('../src/app/controllers/website');
const receiptsAdmin = require('../src/app/controllers/receiptsAdmin');
const chefsAdmin = require('../src/app/controllers/chefsAdmin');
const routes = express.Router();

//Website routes
routes.get("/", website.home);
routes.get("/about", website.about);
routes.get("/receipts", website.receipts);
routes.get("/recipe", website.recipe);
routes.get("/chefs", website.chefs);

//Admin routes receipts
routes.get("/admin/receipts", receiptsAdmin.receipts);
routes.get("/admin/receipts/create", receiptsAdmin.create);
routes.get("/admin/receipts/:id", receiptsAdmin.show);
routes.get("/admin/receipts/:id/edit", receiptsAdmin.edit);
routes.post("/admin/receipts", receiptsAdmin.post);
routes.put("/admin/receipts", receiptsAdmin.put);
routes.delete("/admin/receipts", receiptsAdmin.delete);

//Admin routes chefs
routes.get("/admin/chefs", chefsAdmin.chefs);
routes.get("/admin/chefs/create", chefsAdmin.create);
routes.get("/admin/chefs/:id", chefsAdmin.show);
routes.get("/admin/chefs/:id/edit", chefsAdmin.edit);
routes.post("/admin/chefs", chefsAdmin.post);
routes.put("/admin/chefs", chefsAdmin.put);
routes.delete("/admin/chefs", chefsAdmin.delete);

routes.use(function(req,res) {
    return res.redirect("/admin/receipts");
});

routes.use(function(req,res) {
    return res.status(404).render("not-found");
});

module.exports = routes;