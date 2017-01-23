var User = require('../models/user');
module.exports.controller = function(app) {
    app.get('/materialgroup/add', User.NeedLoginGET, function(req, res) {
        res.render('materialgroup/add',{ pageTitle: '新增物料种类', menu:['add']});
    });
    app.get('/materialgroup', function(req, res) {
        res.render('materialgroup/list',{ pageTitle: '物料组清单', menu:['test'], type:'test', page:req.query.page||1 });
    });
    app.get('/materialgroup/:id', function(req, res) {
        res.render('materialgroup/materialgroup',{ pageTitle: '物料种类页面', id:req.params.id });
    }); 
    app.get('/materialgroup/edit/:id', User.NeedLoginGET, function(req, res) {
        res.render('materialgroup/edit',{ pageTitle: '修改物料种类', id:req.params.id });
    });
}