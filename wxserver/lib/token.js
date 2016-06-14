var https = require('https');
var fs = require('fs');

var tokenFile = "./config/token"
var tsFile = "./config/timestamp"
const TWOHOUR = ( 3600 - 100 ) * 1000;

token=""
function getToken(callback,content)
{
  var lastTime = fs.readFileSync(tsFile);
  var lastToken = fs.readFileSync(tokenFile);
  if (Date.now()-lastTime < TWOHOUR && lastToken)
  {
    var obj={};
    obj.token = lastToken;
    obj.content = content;
    callback(obj);
    return lastToken;
  }
  tmpl = require("tmpl");
  url="https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid={APPID}&secret={APPSECRET}";
  APPID="wx59e38f4f5e6cd31d";
  APPSECRET="df8252d4e01422274dd5b7a9815a9246";
  url=tmpl(url,{
    APPID:APPID,
    APPSECRET:APPSECRET
  });
  console.log(url);
  https.get(url, function(res) {
    console.log("Got response: " + res.statusCode);
    chunk="";
    res.on('data',function(data){
      chunk+=data;
    });

    res.on('end',function(data){
      token=JSON.parse(chunk).access_token;
      console.log(token);
      var obj={};
      obj.token = token;
      obj.content = content;
      console.log(obj);
      callback(obj);
      fs.writeFileSync(tokenFile,token);
      fs.writeFileSync(tsFile,Date.now());
      console.log(chunk);
    });

  });

  setTimeout(getToken,7200*1000);
  return -1;
}



module.exports = getToken;
