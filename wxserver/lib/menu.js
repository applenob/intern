var tmpl = require("tmpl");
var https = require("https");
var menuChgHost = "api.weixin.qq.com";
var menuChgPath = "/cgi-bin/menu/create?access_token={ACCESS_TOKEN}";
var menuItem = {
     "button":[{
          "name":"查看",
          "sub_button":[
          {
              "type":"view",
              "name":"开发类",
              "url":"http://www.soso.com/"
           },
           {
              "type":"view",
              "name":"机器学习类",
              "url":"http://v.qq.com/"
           },
           {
              "type":"view",
              "name":"金融类",
              "url":"http://v.qq.com/"
           }]
      },
      {
           "name":"订阅",
           "sub_button":[
           {
               "type":"click",
               "name":"开发类",
               "key":"V1001_RD"
            },
            {
               "type":"click",
               "name":"机器学习类",
              "key":"V1001_ML"
            },
            {
               "type":"click",
               "name":"金融类",
               "key":"V1001_FI"
            }]
       }]
}

var options = {
  hostname: menuChgHost,
  port: 443,
  path: menuChgPath,
  method: 'POST'
};


function changeMenu(token)
{

  options.path=tmpl(menuChgPath,{
    ACCESS_TOKEN:token
  });
  console.log(options);
  var req = https.request(options, function (res){
    console.log('statusCode: ', res.statusCode);
    console.log('headers: ', res.headers);

    res.on('data', function (d){
      process.stdout.write(d);
    });
  });
  req.end(JSON.stringify(menuItem));

  req.on('error', function (e){
    console.error(e);
  });
}

module.exports = changeMenu;
