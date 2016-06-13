var https = require('https');
var express = require('express');
var app = express();
var xmlBodyParser = require('express-xml-parser');
var getUserInfo = require('./lib/user.js');
var replyText = require('./lib/reply.js');
var getToken = require('./lib/token.js');
var changeMenu = require('./lib/menu.js');
var group = require('./lib/group.js');
var sendGroups = group.sendGroups;

var getInternInfo = require('./model/internItem.js').getInternInfo;
var getSingleItem = require('./model/internItem.js').getSingleItem;
var renderCore = require('./model/internItem.js').renderCore;
var crawl = require('./lib/schedule.js');

app.set("view engine","ejs");
app.use(express.static(__dirname + '/public'));

app.get('/info/alg', function(req, res) {
   getInternInfo("alg",res,renderCore);
});

app.get('/info/dev', function(req, res) {
   getInternInfo("dev",res,renderCore);
});

app.get('/info/fin', function(req, res) {
   getInternInfo("fin",res,renderCore);
});

app.get('/info/all', function(req, res) {
   getInternInfo("all",res,renderCore);
});

app.get('/info/item', function(req, res) {
   console.log(req.query.id);
   getSingleItem(req.query.id,res,renderCore);
});


app.use('/', xmlBodyParser({
  type: 'text/xml',
  limit: '1mb'
}));

app.get('/',function(req,res) {
  console.log(req.query);
  res.end(req.query.echostr);
});

app.post('/',function(req,res) {

  var body = req.body.xml;
  console.log("=====================");
  console.log(body);
  console.log("=====================");
  switch (body.MsgType[0])
  {
    case 'text':
      var textHandler = require('./lib/textHandler.js');
      textHandler(req.body,res);
    break;

    case 'event':
      var eventHandler = require('./lib/eventHandler.js');
      eventHandler(req.body,res);
    break;

  }
  //var reply=replyText(req.body,"消息推送成功");
});

getToken(changeMenu);
//getToken(sendGroups,"我们上线了");
app.listen(80);
crawl();
