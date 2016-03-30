/**
 * Created by activity on 20/9/15.
 */
"use strict"
var mongoose  = require('mongoose');
var BaseModel = require("./base_model");
var Schema    = mongoose.Schema;
var ObjectId  = Schema.ObjectId;
var tools = require('../common/tools');

var ActivitySchema = new Schema({
    name: { type: String},
    activityType: { type: String},

    area_id: { type: ObjectId},
    area: { type: String}, //地区 如： 深圳 福田
    bg_img: { type: String}, //背景图
    holder_img: { type: String}, //缩略图

    company_name: { type: String},
    address: { type: String },
    website: { type: String },
    telephone: { type: String },
    linkman_mobile: { type: String},
    linkman_name: { type: String},

    avg: { type: Number, default: 0}, //价格 不使用咖币的时候的价格
    info: { type: String },

    create_at: { type: Date, default: Date.now },
    update_at: { type: Date, default: Date.now },

    deleted: {type: Boolean, default: false},
});

ActivitySchema.plugin(BaseModel);

ActivitySchema.virtual('show_create_at').get(function () {
    return tools.formatDate(this.create_at);
});

ActivitySchema.virtual('show_update_at').get(function () {
    return tools.formatDate(this.update_at);
});





mongoose.model('Activity', ActivitySchema);
