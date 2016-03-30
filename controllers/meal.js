"use strict"

var validator = require('validator');
var eventproxy = require('eventproxy');

var models = require('../models');
var Meal = models.Meal;


exports.putJson = (req, res, next) => {
    var meal = initReqMeal(req);
    var editError = validateMeal(meal);

    if (editError) {
        res.json({
            stutas: 500,
            err_msg: editError
        });
        return;
    }

    meal.save( (err, savedMeal) => {
        if(err){
            return next(err);
        }
        res.json({
            stutas: 200,
            saved: savedMeal
        });
    } );
};

let initReqMeal = (req) => {
    let meal = new Meal();
    if(req.body._id){
        meal._id = validator.trim(req.body._id);
    }
    if(req.body.name){
        meal.name = validator.trim(req.body.name);
    }
    if(req.body.avg){
        meal.avg = validator.trim(req.body.avg);
    }
    return meal;
};

let validateMeal = (meal) => {
    var editError;
    if (!meal.name || meal.name === '') {
        editError = '地区名不能是空的。';
    } else if (!meal.avg || meal.avg === '') {
        editError = '人均价格不能是空的。';
    } 
    return editError;
};







