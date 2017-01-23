var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
require('mongoose-query-paginate');
var User = require('../../models/user');
var m = require('../../models/material'),
    Material = m.Material,
    MaterialGroup = m.MaterialGroup,
    Category = m.Category;
var Sync = require('syncho');
var api = require('../../libs/apihelper');

module.exports.controller = function (app) {
    //获取最新文章列表
    app.get('/api/materialgroups', function (req, res) {
        Sync(function () {
            try {
                var query = MaterialGroup.find({}).populate('created_author updated_author');
                var page = req.query.page || 1;
                var result = query.paginate.sync(query, {
                    perPage: 20,
                    delta: 3,
                    page: page
                });
                res.json(api.Resp(result));
            } catch (error) {
                res.json(api.Resp(null, error));
            }
        });
    });

    app.post('/api/materialgroup', User.NeedLoginPOST, function (req, res) {
        Sync(function () {
            try {
                var query = MaterialGroup.find({}, {
                    'code': 1
                });
                var codeArray = query.exec.sync(query);
                var code=0;
                if (codeArray.length != 0)
                    code=codeArray[codeArray.length-1].code+1;
                else
                    code = 0;
                var materialgroup = new MaterialGroup({
                    title: req.body.title.length != 0 ? req.body.title : null,
                    engtitle: req.body.engtitle.length != 0 ? req.body.engtitle : null,
                    created_author: req.user.id,
                    updated_author: req.user.id,
                    code: code
                });
                materialgroup.save(function (err) {
                    if (err) {
                        res.json(api.Resp(null, err));
                    } else {
                        res.json(api.Resp({
                            id: materialgroup.id,
                            title: req.body.title.length != 0 ? req.body.title : null
                        }));
                    }
                });
            } catch (error) {
                res.json(api.Resp(null, error));
            }
        });
    });

    app.get('/api/materialgroup/:id', function (req, res) {
        Sync(function () {
            try {
                var query = MaterialGroup.findById(req.params.id).populate('created_author updated_author');
                var materialgroup = query.exec.sync(query);
                res.json(api.Resp(materialgroup));
            } catch (error) {
                res.json(api.Resp(null, error));
            }
        });
    });

    app.put('/api/materialgroup/:id', User.NeedLoginPOST, function (req, res) {
        Sync(function () {
            try {
                var materialgroup = MaterialGroup.findById.sync(MaterialGroup, req.params.id);
                /*if (material.created_author != req.user.id) {
                    res.json(api.Resp(null, '权限错误')).status(403);
                }*/
                materialgroup.title = req.body.title.length != 0 ? req.body.title : null,
                materialgroup.engtitle = req.body.engtitle.length != 0 ? req.body.engtitle : null,
                materialgroup.updated_author = req.user.id
                materialgroup.save.sync();
                res.json(api.Resp(materialgroup.id));
            } catch (error) {
                res.json(api.Resp(null, error));
            }
        });
    });
}