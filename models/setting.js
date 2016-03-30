
"use strict"
var mongoose  = require('mongoose');
var BaseModel = require("./base_model");
var Schema    = mongoose.Schema;
var ObjectId  = Schema.ObjectId;

var SettingSchema = new Schema({

    area_id: { type: ObjectId},

    setting_type: {type: Number, default: 0}, //请求类型
    params : {type: String}, // 调用该任务的参数
    create_at: { type: Date, default: Date.now },
    modify_at: { type: Date, default: Date.now }
});

SettingSchema.plugin(BaseModel);
SettingSchema.virtual('paramsObj').get(function(){
    if(this.params){
        return JSON.parse(this.params);
    }
    return null
});

mongoose.model('Setting', SettingSchema);
