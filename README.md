# 软微实习小助手(微信公众号)
##软件介绍：  
实习小助手专注于爬取北大未名、清华水木的高端实习信息，可以按类查询并提供推送功能，确保您第一时间获悉最新的实习信息

##系统部署：
```
  解决依赖：
  python 2.7 + node 4.x:  
  sudo apt-get install python2.7 python2.7-dev python-pip  
  sudo apt-get install libxml2-dev libxml2 libxslt1.1 libxslt1-dev zlib1g-dev zlib1g phantomjs
  pip install w3lib lxml cssselect twisted selenium bs4 pymongo  
  pip install pydispatch pydispacher  
  pip install scrapy  
  
  node依赖：
  cd wxserver && npm install
  
  启动爬虫:
  cd intern 
  scrapy crawl bdwm (北大未名bbs Intern区爬取指令)
  scrapy crawl sm (清华水木社区 Intern区爬取指令)
  
  启动服务器：
  cd wxserver && node weixin.js
  服务器中内置自动爬取任务管理
```

##使用帮助：
  ![](https://raw.githubusercontent.com/applenob/intern/master/wxserver/public/2dcode.jpeg)  
  
  进入自行搭建的公众号或扫描上图即可使用  
  
  ![](https://raw.githubusercontent.com/applenob/intern/master/wxserver/public/3.jpg)  
  分开发、算法、金融三类查看
  
  ![](https://raw.githubusercontent.com/applenob/intern/master/wxserver/public/4.jpg)  
  
  查看职位列表效果  
  
  ![](https://raw.githubusercontent.com/applenob/intern/master/wxserver/public/6.jpg)  
  查看具体职位  
  
  ![](https://raw.githubusercontent.com/applenob/intern/master/wxserver/public/7.jpg)  
  
  可跳转至原始链接  
  

  
  
##开发人员信息：
  陈俊文 applenob  
  李今晖 jinhuiLee
