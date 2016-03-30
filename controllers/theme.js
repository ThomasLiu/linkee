
"use strict"

var validator = require('validator');
var eventproxy = require('eventproxy');

var config       = require('../web_config');

var cache = require('../common/cache');

var models = require('../models');
var Activity = models.Activity;
var Area = models.Area;
var Theme = models.Theme;
var Meal = models.Meal;
var Lodge = models.Lodge
var Setting = models.Setting;


exports.indexView = (req, res, next) => {
    var themeId = req.params.id;

    var ep = new eventproxy();
    ep.fail(next);

    ep.on('theme', (theme) => {
        Area.findOne({_id : theme.area_id}, ep.done('showArea', (showArea) => { return showArea }));
    });

    ep.all('setting','showArea','theme', (setting, showArea, theme) => {
        res.render('index/theme', {
            title: theme.name,
            setting : setting,
            showArea : showArea,
            theme: theme
        });
    });

    Setting.findOne({setting_type : 0}, ep.done('setting', (setting) => { return setting }));

    Theme.findOne({_id : themeId})
        .populate({path: 'main_activity other_activitys back_up_activitys meals lodges'})
        .exec(ep.done('theme', (theme) =>  theme ));
}


exports.list = (req, res, next) => {
    //获取分页信息
    var page = parseInt(req.query.page, 10) || 1;
    page = page > 0 ? page : 1;
    var limit = config.list_count;
    var editError = req.query.editError || '';
    var themeId = req.query.themeId;

    var areaId = req.params.areaId;

    //是否用了关键词搜索
    var kw = req.query.kw;
    var query = {area_id : areaId};
    if (kw) {
        var reg = eval("/" + kw + "/ig");
        query = {
            $or: [
                {name: reg},
                {company_name: reg},
                {telephone: reg},
                {linkman_mobile: reg},
                {linkman_name: reg},
            ]
        };
    }

    var ep = new eventproxy();
    ep.fail(next);

    ep.all('themes', 'pages', 'editTheme','area','activitys','lodges', 'meals',
        (themes, pages, editTheme, area, activitys,lodges,meals) => {
        if(!editTheme){
            editTheme = {}
        }
        res.render('manage/theme/index', {
            themes: themes,
            current_page: page,
            list_topic_count: limit,
            pages: pages,
            kw: kw,
            title: `${area.name}主题活动管理`,
            editError: editError,
            editTheme: editTheme,
            area: area,
            activitys: activitys,
            lodges: lodges,
            meals: meals
        });
    });

    var opt = {skip: (page - 1) * limit, limit: limit, sort: '-create_at'};
    Theme.find(query,{}, opt)
        .populate({path: 'main_activity other_activitys back_up_activitys meals lodges'})
        .exec(ep.done('themes', (themes) => themes ));

    // 取分页数据
    cache.get(JSON.stringify(query) + 'themePages', ep.done( (pages) => {
        if (pages) {
            ep.emit('pages', pages);
        } else {
            Theme.count(query, ep.done( (all_count) => {
                var pages = Math.ceil(all_count / limit);
                cache.set(JSON.stringify(query) + 'themePages', pages, 60 * 1);
                ep.emit('pages', pages);
            }));
        }
    }));

    // END 取分页数据
    if(themeId){
        Theme.findOne({_id : themeId})
            .populate({path: 'main_activity other_activitys back_up_activitys meals lodges'})
            .exec(ep.done('editTheme', (editTheme) =>  editTheme ));
    }else{
        ep.emit('editTheme', null);
    }

    Area.findOne({_id : areaId}, ep.done('area', (area) => area ));
    Activity.find({area_id : areaId},{},{sort: '+name'},ep.done('activitys', (activitys) => activitys));
    Meal.find({},{},{sort: '+avg'},ep.done('meals', (meals) => meals));
    Lodge.find({},{},{sort: '+avg'},ep.done('lodges', (lodges) => lodges));
};



exports.put = (req, res, next) => {
    var ep = new eventproxy();
    ep.fail(next);

    ep.on('theme', (theme) => {
        theme = initReqTheme(req, theme);
        var editError = validateTheme(theme);

        if (editError) {
            return res.redirect(`/theme/${theme.area_id}?editError=${encodeURIComponent(editError)}`);
        }

        theme.save( (err, theme) => {
            if(err){
                return next(err);
            }
            return res.redirect(`/theme/${theme.area_id}`);
        } );
    });

    if(req.body._id){
        Theme.findOne({_id : req.body._id}, ep.done('theme', (theme) => theme ) )
    }else{
        ep.emit('theme', new Theme());
    }

};


let initReqTheme = (req , theme) => {
    if(req.body._id){
        theme._id = validator.trim(req.body._id);
    }
    if(req.body.name){
        theme.name = validator.trim(req.body.name);
    }
    if(req.body.area_id){
        theme.area_id = validator.trim(req.body.area_id);
    }
    if(req.body.info){
        theme.info = validator.trim(req.body.info);
    }
    if(req.body.main_activity){
        theme.main_activity = validator.trim(req.body.main_activity);
    }
    if(req.body.other_activitys){
        let other_activitys = req.body.other_activitys;
        theme.other_activitys = other_activitys;
    }
    if(req.body.back_up_activitys){
        let back_up_activitys = req.body.back_up_activitys;
        theme.back_up_activitys = back_up_activitys;
    }
    if(req.body.meals){
        let meals = req.body.meals;
        theme.meals = meals;
    }
    if(req.body.lodges){
        let lodges = req.body.lodges;
        theme.lodges = lodges;
    }
    return theme;
};

let validateTheme = (theme) => {
    var editError;
    if (theme.name === '') {
        editError = '活动元素名不能是空的。';
    } else if (theme.linkman_mobile === '') {
        editError = '联系电话不能是空的。';
    } else if (theme.linkman_name === '') {
        editError = '联系人不能是空的。';
    } else if (theme.avg === '') {
        editError = '人均费用不能是空的。';
    } else if (theme.info === '') {
        editError = '活动介绍不能是空的。';
    } else if (theme.company_name === '') {
        editError = '提供商家不能是空的。';
    }
    return editError;
};
