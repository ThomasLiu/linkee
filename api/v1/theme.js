
"use strict"


var validator = require('validator');
var eventproxy = require('eventproxy');


var mail  = require('../../common/mail');

var models = require('../../models');
var Theme = models.Theme;
var Activity = models.Activity;
var Meal = models.Meal;
var Lodge = models.Lodge;
var Area = models.Area;



exports.list =  (req, res, next) => {
    var areaId = validator.trim(req.params.areaId);

    var query = {area_id : areaId};

    var ep = new eventproxy();
    ep.fail(next);

    ep.on('themes', (themes) => {
        res.json({
            list: themes,
            stutas: 200
        });
    });

    Theme.find(query,{}, {sort: '-create_at'})
        .populate({path: 'main_activity'})
        .exec(ep.done('themes', (themes) => themes ));
};


exports.apply =  (req, res, next) => {
    var _id = req.body._id;
    var otherActivitys = req.body.otherActivitys;
    var theme = req.body.theme;
    var meal = req.body.meal;
    var lodge = req.body.lodge;
    var phone = req.body.phone;

    var ep = new eventproxy();
    
    ep.all('theme','meal','lodge','activitys','area','main_activity', 
        (theme,meal,lodge,activitys,area,main_activity) => {

        let err_msg = '';
        if(!theme){
            err_msg = '找不到该主题活动';
        }else if(!area){
            err_msg = '找不到该地区信息';
        }else if(!main_activity){
            err_msg = '找不到该核心活动';
        }else if(!phone){
            err_msg = '请提供电话';
        }

        if(err_msg){
            res.json({
                stutas: 500,
                err_msg: err_msg
            });
        }else{
            mail.sendApplyMail(theme,meal,lodge,activitys,area,main_activity,phone);
            res.json({
                stutas: 200
            });
        }

    });
    
    ep.on('theme', (theme) => {

        Area.findOne({_id: theme.area_id} ,ep.done('area', (area) => area));
        Activity.findOne({_id: theme.main_activity} , ep.done('main_activity', (main_activity) => main_activity));
        
    });

    Meal.findOne({_id: meal}, ep.done('meal', (meal) => meal));

    Lodge.findOne({_id: lodge}, ep.done('lodge', (lodge) => lodge));

    Activity.find({_id: {$in : otherActivitys}},{},{}, ep.done('activitys', (activitys) => activitys));

    Theme.findOne({_id: _id}, ep.done('theme', (theme) => theme));
};