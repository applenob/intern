var sys = require('util')
var exec = require('child_process').exec;
var schedule = require("node-schedule");
var getInfoCount = require('../model/internItem.js').getInfoCount;
var infoCountFile = "./config/infoCount";
var fs=require('fs');
function message(diff)
{
    return "我们又发现了新增的"+diff+"条实习信息，点击左下角按钮来查看吧!";
}


function crawl()
{
    var rule1 = new schedule.RecurrenceRule();
　　var rule2 = new schedule.RecurrenceRule();
    var rule3 = new schedule.RecurrenceRule();
    rule1.minute = 40;
    rule2.minute = 20;
    rule3.minute = 0; 
　　var j_thu = schedule.scheduleJob(rule1, function(){
　　    console.log("执行任务thu");
        var last = exec('cd /data/intern && scrapy crawl sm');

        last.stdout.on('data', function (data) {
            console.log('标准输出：' + data);
        });

        last.on('exit', function (code) {
            console.log('子进程已关闭，代码：' + code);
        });
　　});

    var j_pku = schedule.scheduleJob(rule2, function(){
　　    console.log("执行任务pku");
        var last = exec('cd /data/intern && scrapy crawl bdwm');

        last.stdout.on('data', function (data) {
            console.log('标准输出：' + data);
        });

        last.on('exit', function (code) {
            console.log('子进程已关闭，代码：' + code);
        });
　　});
    
    var report = schedule.scheduleJob(rule3, function(){
　　    console.log("执行任务推送");
	var lastCount = fs.readFileSync(infoCountFile);
        getInfoCount(lastCount,message);
　　});
}


getInfoCount("24",message);
module.exports = crawl;
