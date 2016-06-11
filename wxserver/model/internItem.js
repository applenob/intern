var mongoose = require("mongoose");

mongoose.connect('mongodb://localhost/test');

var Schema = mongoose.Schema;
//骨架模版
var internItemSchema = new Schema({
    title    : String,
    href     : String,
    author   : String,
    time     : String,
    content  : String,
})

//模型
var internItem = mongoose.model('internItem', internItemSchema);


var where = {};
var options = { _id: 0};
function getInternInfo(res,callback) {
    internItem.find(where, options ,function(err, docs) {
    // err是错误信息，docs就是查询返回的文档，是一个数组
    console.log(docs);
    callback(res,docs);
});
}

function renderCore(res,obj)
{
   console.log(obj);
   res.render('index',{title:obj.title,infos:obj});
}

module.exports = {
    getInternInfo: getInternInfo,
    renderCore : renderCore

}
