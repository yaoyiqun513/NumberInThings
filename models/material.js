var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    bcrypt = require('bcrypt');
var config = require('../libs/config');
var User = require('./user');

var conn = mongoose.createConnection(config.DB.LogDB);
materialSchema = new Schema({
  物料号: Number,
  //中文物料名称
  title: String,
  //英文物料名称
  engtitle: String,
  //图号
  imgnum: {
        type: Number,
        validate: {
            validator: NumberCodeFormatValidator('imgnum'),
            msg: '请输入有效的非重复编码'
        }
    },
  //描述
  des: String,
  //供应商
  gongyingshang: String,
  //版本
  version: Number,
  //旧物料名称
  oldtitle: String,
  //创作者
  created_author: { type: mongoose.Schema.Types.ObjectId, ref: 'User',required:true, index: true },
  //最后修改者
  updated_author: { type: mongoose.Schema.Types.ObjectId, ref: 'User',required:true, index: true },
  //创建时间
  created_at: { type: Date, default: Date.now },
  //更新时间
  updated_at: { type: Date, default: Date.now },
  //备注
  content: String
});
Material = mongoose.model('Material', materialSchema);
materialGroupSchema = new Schema({
  //中文显示名称
  title: String,
  //英文显示名称
  engtitle: String,
  //编码号
  code:{
        type: Number,
        required: [true, "请输入编码号"],
        unique: true,
        validate: {
            validator: CodeFormatValidator('编码号'),
            msg: '请输入有效的编码'
        }
    },
  children: [{type: mongoose.Schema.Types.ObjectId, ref: 'Material'}]
});
MaterialGroup = mongoose.model('MaterialGroup', materialGroupSchema);
workTableSchema = new Schema({
  中文显示名称: String,
  英文显示名称: String,
  编码号:{
        type: Number,
        required: [true, "请输入编码号"],
        unique: true,
        validate: {
            validator: NumberCodeFormatValidator('编码号'),
            msg: '请输入有效的编码'
        }
    },
    children: {type: mongoose.Schema.Types.ObjectId, ref: 'MaterialGroup'}
});
WorkTable = mongoose.model('WorkTable', workTableSchema);
function NumberCodeFormatValidator(path) {
      return function (value, respond) {
        var model = this.model(this.constructor.modelName);
        var query = buildQuery(path, value, this._id);
        var callback = buildValidationCallback(respond);
        model.findOne(query, callback);
    };
}
function buildQuery(field, value, id) {
    var query = {
        $and: []
    };
    query.$and.push({
        _id: {
            $ne: id
        }
    });
    var target = {};
    if (Object.prototype.toString.call(value) === '[object Array]') {
        target[field] = {
            $in: value
        };
    } else {
        target[field] = value;
    }
    query.$and.push(target);
    return query;
}
function buildValidationCallback(respond) {
    return function (err, document) {
        respond(!document);
    };
}
module.exports.Material = Material;
module.exports.MaterialGroup = MaterialGroup;
module.exports.WorkTable = WorkTable;