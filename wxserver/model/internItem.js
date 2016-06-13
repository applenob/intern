var mongoose = require("mongoose");

mongoose.connect('mongodb://localhost/intern');

var Schema = mongoose.Schema;
//骨架模版
var internItemSchema = new Schema({
    title    : String,
    href     : String,
    author   : String,
    time     : String,
    content  : String
})

//模型
var internItem = mongoose.model('items', internItemSchema);


var where = {};
var options = {};
function getInternInfo(title,res,callback) {

    switch (title)
    {
      case "alg": where={is_alg: true}; break;
      case "dev": where={is_dev: true}; break;
      case "fin": where={is_fin: true}; break;    
      case "all": where={}; break;
    }

    internItem.find(where, options ,function(err, docs) {
    // err是错误信息，docs就是查询返回的文档，是一个数组
    console.log(docs);
    titleStr="";
    switch (title)
    {
      case "alg": titleStr = "算法类"; break;
      case "dev": titleStr = "开发类"; break;
      case "fin": titleStr = "金融类"; break;
    }
    titleStr+="实习信息";
    callback(titleStr,res,docs);
});
}

function getSingleItem(id,res,callback) {
    var where = {_id:id};
    internItem.find(where, options ,function(err, docs) {
    // err是错误信息，docs就是查询返回的文档，是一个数组
    console.log(docs);
    titleStr ="实习信息";
    res.render('item',{title:titleStr,infos:JSON.stringify(docs)});
});
}


function renderCore(titleStr,res,obj)
{
   obj = JSON.stringify(obj);
   console.log(obj);
   res.render('index',{title:titleStr,infos:obj});
}

module.exports = {
    getInternInfo: getInternInfo,
    renderCore : renderCore,
    getSingleItem : getSingleItem
}
