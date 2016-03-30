"use strict"

var validator = require('validator');
var eventproxy = require('eventproxy');

var models = require('../models');
var Area = models.Area;


exports.put = (req, res, next) => {
    var ep = new eventproxy();
    ep.fail(next);

    ep.on('area', (area) => {
        area = initReqArea(req, area);
        var editError = validateArea(area);

        if (editError) {
            return res.redirect(`/manage?editError=${encodeURIComponent(editError)}`);
        }

        area.save((err, area) => {
            if (err) {
                return next(err);
            }
            return res.redirect('/manage');
        });
    })

    if(req.body._id){
        Area.findOne({_id : req.body._id}, ep.done('area', (area) => area ) )
    }else{
        ep.emit('area', new Area());
    }

};

let initReqArea = (req , area) => {
    if(req.body._id){
        area._id = validator.trim(req.body._id);
    }
    if(req.body.name){
        area.name = validator.trim(req.body.name);
    }
    if(req.body.telphone){
        area.telphone = validator.trim(req.body.telphone);
    }
    if(req.body.email){
        area.email = validator.trim(req.body.email);
    }
    return area;
};

let validateArea = (area) => {
    var editError;
    if (area.name === '') {
        editError = '地区名不能是空的。';
    } else if (area.telphone === '') {
        editError = '联系电话不能是空的。';
    } else if (area.email === '') {
        editError = 'email不能是空的。';
    }
    return editError;
};







