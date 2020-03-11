const Chef = require('../models/Chef');

module.exports = {
    chefs(req,res) {
        Chef.all(function(chefs) {
            return res.render("admin/chefs/home", {chefs});
        });
    },
    
    create(req,res) {
        return res.render("admin/chefs/create");
    },
    
    show(req,res) {
        const { id } = req.params;

        Chef.find(id, function(chef) {
            Chef.chefReceipts(id, function(receipts) {
                return res.render("admin/chefs/detail", {chef, receipts});
            })
        });
    },
    
    edit(req,res) {
        const { id } = req.params;

        Chef.find(id, function(chef) {
            return res.render("admin/chefs/edit", {chef});
        });
    },

    post(req,res) {
        const keys = Object.keys(req.body);

        for (key of keys) {
            if (req.body[key] == "") {
                return res.send("Please, fill in all fields.");
            };
        };

        Chef.create(req.body, function(chef) {
            return res.redirect(`/admin/chefs/${chef.id}`);
        });
    },

    put(req,res) {
        const keys = Object.keys(req.body);

        for (key of keys) {
            if (req.body[key] == "") {
                return res.send("Please, fill in all fields.");
            };
        };

        Chef.update(req.body, function() {
            return res.redirect(`/admin/chefs/${req.body.id}`);
        });
    },

    delete(req,res) {
        const { id } = req.body

        Chef.chefReceipts(id, function(receipts) {
            if (receipts == "") {
                Chef.remove(id, function() {
                    return res.redirect("/admin/chefs");
                });
            } else {
                return res.send("Impossible to delete this chef");
            }
        })
    }
};