var replyText = require('./reply.js')



function eventHandler(reqbody,res)
{
  var body = reqbody.xml;
  switch (body.Event[0])
  {
    case 'CLICK':
      switch (body.EventKey[0])
      {
	case "V101_DE":
          var reply=replyText(reqbody,"后台的爬虫引擎会定时抓取实习信息，当新增的实习信息累计达到一定的数量，我们会发送一条推送告知，您可在第一时间投递简历获得心仪职位");
          break;

        case "V101_SA":
          var reply=replyText(reqbody,"示例:我们又发现了新增的12条实习信息，点击左下角按钮来查看吧！");
          break;
      }
      res.end(reply);
      break;
    case 'subscribe':
        var reply=replyText(reqbody,"欢迎订阅软微实习小助手，这里有最新鲜的实习信息等着您！");
        res.end(reply);
      break;
  }


}

module.exports = eventHandler;
