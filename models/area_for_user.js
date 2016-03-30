"use strict"
var mongoose  = require('mongoose');
var BaseModel = require("./base_model");
var Schema    = mongoose.Schema;

var ObjectId  = Schema.ObjectId;


var AreaForUserSchema = new Schema({

    user_id: { type: ObjectId},
    area_id: {type: ObjectId},

    create_at: { type: Date, default: Date.now },
    modify_at: { type: Date, default: Date.now }
});

AreaForUserSchema.plugin(BaseModel);


mongoose.model('AreaForUser', AreaForUserSchema);
