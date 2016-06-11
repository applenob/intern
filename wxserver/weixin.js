var https = require('https');
var app = require('express')();
var xmlBodyParser = require('express-xml-parser');
var getUserInfo = require('./lib/user.js');
var replyText = require('./lib/reply.js');
var getToken = require('./lib/token.js');
var changeMenu = require('./lib/menu.js');

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
app.listen(80);
