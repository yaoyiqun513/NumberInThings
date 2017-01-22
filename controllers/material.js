var User = require('../models/user');
module.exports.controller = function(app) {
    app.get('/topics/test/add', User.NeedLoginGET, function(req, res) {
        res.render('material/add',{ pageTitle: '新增物料', menu:['add']});
    });
    app.get('/topics/test', function(req, res) {
        res.render('material/list',{ pageTitle: '链接测试', menu:['test'], type:'test', page:req.query.page||1 });
    });
    app.get('/material/:id', function(req, res) {
        res.render('material/material',{ pageTitle: req.query.title, id:req.params.id });
    }); 
}