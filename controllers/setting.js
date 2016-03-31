"use strict"
var validator = require('validator');

var models = require('../models');
var Setting = models.Setting;

var e = require('../common/enumeration');


exports.put = function (req, res, next) {
    var settingType = parseInt(req.params.type);

    Setting.findOne({setting_type: settingType },function (err, setting){
        if (err) {
            return next(err);
        }
        if(!setting || !setting._id){
            setting = new Setting();
            setting.setting_type = settingType;
        }
        setting.modify_at = new Date();

        switch (settingType){
            case e.SETTING_WEBSITE_BASE:
                var title = validator.trim(req.body.title);
                var introduce = validator.trim(req.body.introduce);
                var logo_url = validator.trim(req.body.logo_url);
                var bg_url = validator.trim(req.body.bg_url);
                setting.params = JSON.stringify({
                    title : title,
                    introduce : introduce,
                    logo_url : logo_url,
                    bg_url : bg_url
                });
                break;

        }
        setting.save( (err, saveSetting) => {
            if(err) {
                return next(err);
            }
            let url = '/manage'
            switch (settingType){
                case e.SETTING_WEBSITE_BASE:
                    url = '/manage'
                    break;
            }
            res.redirect(url);
        });

    });
};