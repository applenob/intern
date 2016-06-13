#coding=utf-8
import scrapy
from intern.items import InternItem
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import  expected_conditions as EC
from bs4 import BeautifulSoup
from scrapy import signals
from scrapy.xlib.pydispatch import dispatcher
from intern.platform import getPlatform

class BDWMpider(scrapy.spiders.CrawlSpider):
    '''
    #要建立一个 Spider，你可以为 scrapy.spider.BaseSpider 创建一个子类，并确定三个主要的、强制的属性：
    #name ：爬虫的识别名，它必须是唯一的，在不同的爬虫中你必须定义不同的名字.
    #start_urls ：爬虫开始爬的一个 URL 列表。爬虫从这里开始抓取数据，所以，第一次下载的数据将会从这些 URLS 开始。其他子 URL 将会从这些起始 URL 中继承性生成。
    #parse() ：爬虫的方法，调用时候传入从每一个 URL 传回的 Response 对象作为参数，response 将会是 parse 方法的唯一的一个参数,
    #这个方法负责解析返回的数据、匹配抓取的数据(解析为 item )并跟踪更多的 URL。
    '''
    name="bdwm"
    base_url = 'http://bbs.pku.edu.cn/bbs/bbsdoc.php?board=Intern'
    start_urls = [base_url]
    # start_urls.extend([base_url+'?p='+str(i) for i in range(2,4)])
    print start_urls
    # start_urls = ['http://www.newsmth.net/']
    platform = getPlatform()

    def __init__(self):
        scrapy.spiders.Spider.__init__(self)
        if self.platform == 'linux':
            self.driver = webdriver.PhantomJS()
        elif self.platform == 'win':
            self.driver = webdriver.PhantomJS(executable_path='F:/runtime/python/phantomjs-2.1.1-windows/bin/phantomjs.exe')
            # self.driver = webdriver.Firefox()
        dispatcher.connect(self.spider_closed, signals.spider_closed)

    # def __del__(self):
    #     print '__del__ running'
    #     self.driver.quit()

    def spider_closed(self, spider):
        self.driver.quit()

    def parse(self,response):
        # print "parsing::::::::::::::::::::::::::"
        # self.driver.get(response.url)
        # print response.url
        # try:
        #     element = WebDriverWait(self.driver,30).until(
        #         EC.presence_of_all_elements_located((By.TAG_NAME,'table'))
        #     )
        #     print 'element:\n', element
        # except Exception, e:
        #     print Exception, ":", e
        #     print "wait failed"
        # page_source = self.driver.page_source
        bs_obj = BeautifulSoup(response.body, "lxml")
        print bs_obj
        table = bs_obj.find('table',class_='body')
        print table
        print "find message ====================================\n"
        intern_messages = table.find_all('tr')
        intern_messages = intern_messages[1:]
        for message in intern_messages:
            title, href, time, author = '','','',''
            tds = message.find_all('td')
            num = tds[0].get_text().encode('utf-8','ignore')
            print "num:",num
            if num != '[置顶]':
                author = tds[2].get_text().encode('utf-8', 'ignore')
                time = tds[3].get_text().encode('utf-8', 'ignore')
                title = tds[4].get_text().encode('utf-8','ignore')
                href = tds[4].a['href']

                item = InternItem()
                print 'title:',title
                print 'href:', href
                print 'time:', time
                print 'author:', author
                item['title'] = title
                item['href'] = href
                item['time'] = time
                item['author'] = author
                root_url = 'http://bbs.pku.edu.cn/bbs/'
                # content = scrapy.Request(root_url+href,self.parse_content)
                if href!='':
                    content = self.parse_content(root_url+href)
                    # print 'content:', content
                    item['content'] = content
                item['author'] = author
                yield item

    def parse_content(self,url):
        self.driver.get(url)
        try:
            element = WebDriverWait(self.driver, 30).until(
                EC.presence_of_all_elements_located((By.TAG_NAME, 'table'))
            )
            print 'element:\n', element
        except Exception, e:
            print Exception, ":", e
            print "wait failed"
        page_source = self.driver.page_source
        bs_obj = BeautifulSoup(page_source, "lxml")
        return bs_obj.find('table', class_='doc').tbody.tr.td.pre.get_text().encode('utf-8','ignore')