"use strict"

var validator = require('validator');
var eventproxy = require('eventproxy');

var models = require('../models');
var Lodge = models.Lodge;


exports.putJson = (req, res, next) => {
    var lodge = initReqLodge(req);
    var editError = validateLodge(lodge);

    if (editError) {
        res.json({
            stutas: 500,
            err_msg: editError
        });
        return;
    }

    lodge.save( (err, savedLodge) => {
        if(err){
            return next(err);
        }
        res.json({
            stutas: 200,
            saved: savedLodge
        });
    } );
};

let initReqLodge = (req) => {
    let lodge = new Lodge();
    if(req.body._id){
        lodge._id = validator.trim(req.body._id);
    }
    if(req.body.name){
        lodge.name = validator.trim(req.body.name);
    }
    if(req.body.avg){
        lodge.avg = validator.trim(req.body.avg);
    }
    return lodge;
};

let validateLodge = (lodge) => {
    var editError;
    if (!lodge.name || lodge.name === '') {
        editError = '旅店信息不能是空的。';
    } else if (!lodge.avg || lodge.avg === '') {
        editError = '人均价格不能是空的。';
    }
    return editError;
};







