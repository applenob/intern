var Promise = require('promise');
function getUserInfo(openID){

    return new Promise(function(resolve, reject){
      request('https://api.weixin.qq.com/cgi-bin/user/info?access_token='+token+'&openid='+openID+'&lang=zh_CN', function(err, res, data){
          console.log(resolve);
 	  resolve(JSON.parse(data));
          console.log("finish resolve");
        });
  });
}

module.exports = getUserInfo;
