
"use strict"
var mongoose  = require('mongoose');
var BaseModel = require("./base_model");
var Schema    = mongoose.Schema;

var ObjectId  = Schema.ObjectId;

var ThemeSchema = new Schema({

    name: { type: String},
    activityType: { type: String},

    area_id: { type: ObjectId},
    area: { type: String}, //地区 如： 深圳 福田

    bg_img: { type: String}, //背景图
    holder_img: { type: String}, //缩略图

    info: { type: String },

    main_activity: { type: ObjectId, ref: 'Activity'}, //核心活动
    other_activitys: [{ type: ObjectId, ref: 'Activity' }], //配套活动
    back_up_activitys: [{ type: ObjectId, ref: 'Activity' }], //备选活动

    meals: [{ type: ObjectId, ref: 'Meal' }],
    lodges: [{ type: ObjectId, ref: 'Lodge' }],

    create_at: { type: Date, default: Date.now },
    update_at: { type: Date, default: Date.now },

    deleted: {type: Boolean, default: false},
});

ThemeSchema.plugin(BaseModel);


ThemeSchema.virtual('show_create_at').get(function () {
    return tools.formatDate(this.create_at);
});

ThemeSchema.virtual('show_update_at').get(function () {
    return tools.formatDate(this.update_at);
});


mongoose.model('Theme', ThemeSchema);
