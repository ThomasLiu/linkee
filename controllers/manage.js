"use strict"

var validator = require('validator');
var eventproxy = require('eventproxy');

var config       = require('../web_config');

var models = require('../models');
var Area = models.Area;
var Setting = models.Setting;
var Theme = models.Theme;

var e = require('../common/enumeration');


exports.index = (req, res, next) => {
    req.session._loginReferer = req.headers.referer;
    var editError = req.query.editError || '';
    var areaId = req.query.areaId;

    var ep = new eventproxy();

    ep.fail(next);
    ep.all('areas', 'editArea', 'setting', (areas, editArea, setting) => {
        if(!editArea){
            editArea = {};
        }
        if(!setting.paramsObj){
            setting.paramsObj = {};
        }
        res.render('manage/index', {
            areas : areas,
            editError : editError,
            editArea : editArea,
            setting : setting,
            title: config.projectName
        });
    });

    Area.find({}, {}, {sort: '-create_at'}, ep.done('areas', (areas) => { return areas }));

    Setting.findOne({setting_type : e.SETTING_WEBSITE_BASE}, ep.done('setting', (setting) => { return setting }));

    if(areaId){
        Area.findOne({_id : areaId}, ep.done('editArea', (editArea) => { return editArea }));
    }else{
        ep.emit('editArea', null);
    }

};





