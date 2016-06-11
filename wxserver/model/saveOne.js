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
//存储数据
var item = new internItem({
    title   : "软件开发",
    href    : "www.baidu.com",
    author  : "Jinhui",
    time    : "2016.06.11",
    content : "一起开发软件"

})
//保存数据库
item.save(function(err) {
    if (err) {
        console.log('保存失败')
	console.log(err)
        return;
    }
    console.log('meow');
});


