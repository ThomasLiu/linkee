"use strict"
var mongoose  = require('mongoose');
var BaseModel = require("./base_model");
var Schema    = mongoose.Schema;

var ObjectId  = Schema.ObjectId;

var AreaSchema = new Schema({


    name : {type: String}, // 名称
    telphone: {type: String}, //电话
    email: {type: String}, //email

    create_at: { type: Date, default: Date.now },
});

AreaSchema.plugin(BaseModel);


mongoose.model('Area', AreaSchema);
