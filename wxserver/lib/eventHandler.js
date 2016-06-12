var replyText = require('./reply.js')



function eventHandler(reqbody,res)
{
  var body = reqbody.xml;
  switch (body.Event[0])
  {
    case 'CLICK':
      switch (body.EventKey[0])
      {
        case "V1001_PUSH":
          var reply=replyText(reqbody,"每日新增实习信息将准时在中午12点推送");
          break;
      }
      res.end(reply);
      break;
    case 'subscribe':
        var reply=replyText(reqbody,"欢迎订阅软微实习小助手");
        res.end(reply);
      break;
  }


}

module.exports = eventHandler;
