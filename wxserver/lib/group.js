var tmpl = require("tmpl");
var https = require("https");
var menuChgHost = "api.weixin.qq.com";
var menuChgPath = "/cgi-bin/message/mass/sendall?access_token={ACCESS_TOKEN}";
var serverUrl= "http://172.110.27.168"

var msg = {
   "filter":{
      "is_to_all":true
   },
   "text":{
      "content":"群发测试"
   },
    "msgtype":"text"
} 

var options = {
  hostname: menuChgHost,
  port: 443,
  path: menuChgPath,
  method: 'POST'
};


function sendGroups(obj)
{

  options.path=tmpl(menuChgPath,{
    ACCESS_TOKEN:obj.token
  });
  console.log(options);
 

  var req = https.request(options, function (res){
    console.log('statusCode: ', res.statusCode);
    console.log('headers: ', res.headers);

    res.on('data', function (d){
      process.stdout.write(d);
    });
  });
  msg.text.content = obj.content;
  req.end(JSON.stringify(msg));

  req.on('error', function (e){
    console.error(e);
  });

}

module.exports = {sendGroups:sendGroups};
