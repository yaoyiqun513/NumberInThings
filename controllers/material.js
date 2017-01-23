var User = require('../models/user');
module.exports.controller = function(app) {
    app.get('/material/add', User.NeedLoginGET, function(req, res) {
        res.render('material/add',{ pageTitle: '新增物料', menu:['add']});
    });
    app.get('/material', function(req, res) {
        res.render('material/list',{ pageTitle: '链接测试', menu:['test'], type:'test', page:req.query.page||1 });
    });
    app.get('/material/:id', function(req, res) {
        res.render('material/material',{ pageTitle: '物料页面', id:req.params.id });
    }); 
    app.get('/material/edit/:id', User.NeedLoginGET, function(req, res) {
        res.render('material/edit',{ pageTitle: '修改物料', id:req.params.id });
    });
}