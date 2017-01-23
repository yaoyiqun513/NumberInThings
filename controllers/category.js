var User = require('../models/user');
module.exports.controller = function(app) {
    app.get('/category/add', User.NeedLoginGET, function(req, res) {
        res.render('category/add',{ pageTitle: '新增物料种类', menu:['add']});
    });
    app.get('/category', function(req, res) {
        res.render('category/list',{ pageTitle: '链接测试', menu:['test'], type:'test', page:req.query.page||1 });
    });
    app.get('/category/:id', function(req, res) {
        res.render('category/category',{ pageTitle: '物料种类页面', id:req.params.id });
    }); 
    app.get('/category/edit/:id', User.NeedLoginGET, function(req, res) {
        res.render('category/edit',{ pageTitle: '修改物料种类', id:req.params.id });
    });
}