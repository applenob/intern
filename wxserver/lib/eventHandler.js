var replyText = require('./reply.js')



function eventHandler(reqbody,res)
{
  var body = reqbody.xml;
  switch (body.Event[0])
  {
    case 'CLICK':
      switch (body.EventKey[0])
      {
        case "V1001_RD":
          var reply=replyText(reqbody,"您订阅了研发类实习信息");
        break;
        case "V1001_ML":
          var reply=replyText(reqbody,"您订阅了算法类实习信息");
        break;
        case "V1001_FI":
          var reply=replyText(reqbody,"您订阅了金融类实习信息");
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
