"use strict"
var mongoose  = require('mongoose');
var BaseModel = require("./base_model");
var Schema    = mongoose.Schema;


var MealSchema = new Schema({

    name : {type: String}, // 套餐名称
    avg: {type: Number, default: 0}, //人均

    create_at: { type: Date, default: Date.now },
});

MealSchema.plugin(BaseModel);


mongoose.model('Meal', MealSchema);
