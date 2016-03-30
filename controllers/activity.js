

"use strict"

var validator = require('validator');
var eventproxy = require('eventproxy');

var config       = require('../web_config');

var cache = require('../common/cache');

var models = require('../models');
var Activity = models.Activity;
var Area = models.Area;

exports.list = (req, res, next) => {
    //获取分页信息
    var page = parseInt(req.query.page, 10) || 1;
    page = page > 0 ? page : 1;
    var limit = config.list_count;
    var editError = req.query.editError || '';
    var activityId = req.query.activityId;

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

    ep.all('activitys', 'pages', 'editActivity','area', (activitys, pages, editActivity, area) => {
        if(!editActivity){
            editActivity = {}
        }
        res.render('manage/activity/index', {
            activitys: activitys,
            current_page: page,
            list_topic_count: limit,
            pages: pages,
            kw: kw,
            title: `${area.name}活动管理`,
            editError: editError,
            editActivity: editActivity,
            area: area
        });
    });

    var opt = {skip: (page - 1) * limit, limit: limit, sort: '-create_at'};
    Activity.find(query,{}, opt, ep.done('activitys', (activitys) => activitys ));

    // 取分页数据
    cache.get(JSON.stringify(query) + 'activityPages', ep.done( (pages) => {
        if (pages) {
            ep.emit('pages', pages);
        } else {
            Activity.count(query, ep.done( (all_count) => {
                var pages = Math.ceil(all_count / limit);
                cache.set(JSON.stringify(query) + 'activityPages', pages, 60 * 1);
                ep.emit('pages', pages);
            }));
        }
    }));

    // END 取分页数据
    if(activityId){
        Activity.findOne({_id : activityId}, ep.done('editActivity', (editActivity) =>  editActivity ));
    }else{
        ep.emit('editActivity', null);
    }

    Area.findOne({_id : areaId}, ep.done('area', (area) => { return area }));

};



exports.put = (req, res, next) => {
    var ep = new eventproxy();
    ep.fail(next);

    ep.on('activity', (activity) => {
        activity = initReqActivity(req, activity);
        var editError = validateActivity(activity);

        if (editError) {
            return res.redirect(`/activity/${activity.area_id}?editError=${encodeURIComponent(editError)}`);
        }

        activity.save( (err, activity) => {
            if(err){
                return next(err);
            }
            return res.redirect(`/activity/${activity.area_id}`);
        } );
    });



    if(req.body._id){
        Activity.findOne({_id : req.body._id}, ep.done('activity', (activity) => activity ) )
    }else{
        ep.emit('activity', new Activity());
    }
};

let initReqActivity = (req, activity) => {
    if(req.body._id){
        activity._id = validator.trim(req.body._id);
    }
    if(req.body.name){
        activity.name = validator.trim(req.body.name);
    }
    if(req.body.area_id){
        activity.area_id = validator.trim(req.body.area_id);
    }
    if(req.body.bg_img){
        activity.bg_img = validator.trim(req.body.bg_img);
        activity.holder_img =  activity.bg_img;
    }
    if(req.body.avg){
        activity.avg = validator.trim(req.body.avg);
    }
    if(req.body.info){
        activity.info = validator.trim(req.body.info);
    }
    if(req.body.telphone){
        activity.telphone = validator.trim(req.body.telphone);
    }
    if(req.body.company_name){
        activity.company_name = validator.trim(req.body.company_name);
    }
    if(req.body.address){
        activity.address = validator.trim(req.body.address);
    }
    if(req.body.linkman_name){
        activity.linkman_name = validator.trim(req.body.linkman_name);
    }
    if(req.body.linkman_mobile){
        activity.linkman_mobile = validator.trim(req.body.linkman_mobile);
    }
    return activity;
};

let validateActivity = (activity) => {
    var editError;
    if (activity.name === '') {
        editError = '活动元素名不能是空的。';
    } else if (activity.linkman_mobile === '') {
        editError = '联系电话不能是空的。';
    } else if (activity.linkman_name === '') {
        editError = '联系人不能是空的。';
    } else if (activity.avg === '') {
        editError = '人均费用不能是空的。';
    } else if (activity.info === '') {
        editError = '活动介绍不能是空的。';
    } else if (activity.company_name === '') {
        editError = '提供商家不能是空的。';
    }
    return editError;
};


