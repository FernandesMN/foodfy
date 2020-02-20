const express = require('express');
const receipts = require('./data');
const website = require('./controllers/website');
const admin = require('./controllers/admin');
const routes = express.Router();

//Website routes
routes.get("/", website.home);
routes.get("/about", website.about);
routes.get("/receipts", website.receipts);
routes.get("/recipe", website.recipe);

//Admin routes
routes.get("/admin/receipts", admin.receipts);
routes.get("/admin/receipts/create", admin.create);
routes.get("/admin/receipts/:id", admin.show);
routes.get("/admin/receipts/:id/edit");
routes.post("/admin/receipts", admin.post);
routes.put("/admin/receipts", admin.put);
routes.delete("/admin/receipts", admin.delete);

module.exports = routes;