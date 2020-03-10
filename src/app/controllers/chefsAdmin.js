exports.chefs = function(req,res) {
    return res.render("admin/chefs/home");
};

exports.create = function(req,res) {
    return res.render("admin/chefs/create");
};

exports.show = function(req,res) {
    return res.render("admin/chefs/detail");
};

exports.edit = function(req,res) {
    return res.render("admin/chefs/edit");
};