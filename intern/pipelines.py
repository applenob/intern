# -*- coding: utf-8 -*-

# Define your item pipelines here
#
# Don't forget to add your pipeline to the ITEM_PIPELINES setting
# See: http://doc.scrapy.org/en/latest/topics/item-pipeline.html
import pymongo

from scrapy.conf import settings
from scrapy.exceptions import DropItem
from scrapy import log

class MongoDBPipeline(object):

    def __init__(self):
        pass
    # def __init__(self):
    #     client = pymongo.MongoClient(
    #         settings['MONGODB_SERVER'],
    #         settings['MONGODB_PORT']
    #     )
    #     db = client[settings['MONGODB_DB']]
    #     self.collection = db[settings['MONGODB_COLLECTION']]

    def open_spider(self, spider):
        self.client = pymongo.MongoClient(
            settings['MONGODB_SERVER'],
            settings['MONGODB_PORT']
        )
        self.db = self.client[settings['MONGODB_DB']]
        self.collection = self.db[settings['MONGODB_COLLECTION']]

    def close_spider(self, spider):
        self.client.close()

    def process_item(self, item, spider):
        valid = True
        for data in item:
            if not data :
                valid = False
                raise DropItem("Missing {0}!".format(data))
        if item['title'] == '':
            valid = False
            raise DropItem("title is '' ")
        if item['content'] == '':
            valid = False
            raise DropItem("content is '' ")
        if valid:
            self.collection.insert(dict(item))
            # log.msg("intern item added to MongoDB database!",
            #         level=log.DEBUG, spider=spider)
        return item

class TagPipeline(object):

    def __init__(self):
        pass

    # def __init__(self):
    #     client = pymongo.MongoClient(
    #         settings['MONGODB_SERVER'],
    #         settings['MONGODB_PORT']
    #     )
    #     db = client[settings['MONGODB_DB']]
    #     self.collection = db[settings['MONGODB_COLLECTION']]

    def open_spider(self, spider):
        self.client = pymongo.MongoClient(
            settings['MONGODB_SERVER'],
            settings['MONGODB_PORT']
        )
        self.db = self.client[settings['MONGODB_DB']]
        self.collection = self.db[settings['MONGODB_COLLECTION']]

    def close_spider(self, spider):
        self.client.close()

    def process_item(self, item, spider):
        self.getTags(item)
        return item

    def getTags(self,item):
        dev_keys = ['开发', 'Java', 'java', 'Andoird', '安卓', 'android', 'iOS', 'ios',
                    '前端', 'HTML5', 'html5', '后端', 'PHP', 'Python', 'C语言', 'C++',
                    'c语言', 'c++', 'node','Node', 'javascript', 'js', 'C#',
                    '全栈', 'shell', 'Shell', '.net', '.Net', '技术']

        alg_keys = ['算法', '机器学习', '自然语言处理', '深度学习', 'nlp', 'NLP', 'Hadoop', 'hadoop',
                    '数据挖掘', '数据分析', '大数据', 'Spark', '搜索', '推荐', '知识图谱', '机器人',
                    '智能问答', 'GPU', '计算广告', '人工智能', '图像处理']
        fin_keys = ['金融', '基金', '融资', '证券', '债券', '银行', '金服', '投资',
                    '券商', '量化', '财务', '资本']
        # test = '【实习】【北京三星研究院】急招LTE物理层算法实现实习生 '
        text = item['title']
        is_dev, is_alg, is_fin = False, False, False
        for key in dev_keys:
            if key in text:
                is_dev = True
                break
        for key in alg_keys:
            if key in text:
                is_alg = True
                break
        for key in fin_keys:
            if key in text:
                is_fin = True
                break
        # print 'is_dev:', is_dev
        # print 'is_alg:', is_alg
        # print 'is_fin:', is_fin
        item['is_dev'] = is_dev
        item['is_alg'] = is_alg
        item['is_fin'] = is_fin
        # return item