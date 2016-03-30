/**
 * Created by user on 11/6/15.
 */

var xmlbuilder   = require('xmlbuilder');
var eventproxy   = require('eventproxy');
var cache        = require('../common/cache');
var config       = require('../web_config');
var _            = require('lodash');

var models = require('../models');
var Area = models.Area;
var Setting = models.Setting;

exports.index = function (req, res, next) {
    var areaId = req.params.id;
    var ep = new eventproxy();

    ep.fail(next);
    ep.all('areas', 'setting','showArea', (areas, setting, showArea) => {
        if(!setting.paramsObj){
            setting.paramsObj = {};
        }
        if(!showArea){
            showArea = areas[0];
        }
        res.render('index', {
            areas : areas,
            setting : setting,
            showArea : showArea,
            title: config.projectName
        });
    });

    Area.find({}, {}, {sort: '-create_at'}, ep.done('areas', (areas) => { return areas }));

    Setting.findOne({setting_type : 0}, ep.done('setting', (setting) => { return setting }));

    if(areaId){
        Area.findOne({_id : areaId}, ep.done('showArea', (showArea) => { return showArea }));
    }else{
        ep.emit('showArea', null);
    }
}

exports.sitemap = function (req, res, next){
    var urlset = xmlbuilder.create('urlset',
        {version: '1.0', encoding: 'UTF-8'});
    urlset.att('xmlns', 'http://www.sitemaps.org/schemas/sitemap/0.9');

    var ep = new eventproxy();
    ep.fail(next);

    ep.all('sitemap', function (sitemap) {
        res.type('xml');
        res.send(sitemap);
    });

    cache.get('sitemap', ep.done(function (sitemapData){
        if (sitemapData) {
            ep.emit('sitemap', sitemapData);
        } else {
            //将需要给搜索引擎搜索到的网址都加入urlset
            urlset.ele('url').ele('loc','http://');

            var sitemapData = urlset.end();

            cache.set('sitemap', sitemapData, 3600 * 24);
            ep.emit('sitemap', sitemapData);
        }
    }));
}