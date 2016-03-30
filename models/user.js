/**
 * Created by user on 15/6/15.
 */
var mongoose  = require('mongoose');
var BaseModel = require("./base_model");
var Schema    = mongoose.Schema;
var utility   = require('utility');

var UserSchema = new Schema({
    name: { type: String},
    loginname: { type: String},
    pass: { type: String },
    email: { type: String},
    avatar: { type: String },

    create_at: { type: Date, default: Date.now },
    update_at: { type: Date, default: Date.now },

    active: { type: Boolean, default: false },

    receive_reply_mail: {type: Boolean, default: false },
    receive_at_mail: { type: Boolean, default: false },
    from_wp: { type: Boolean },

    retrieve_time: {type: Number},
    retrieve_key: {type: String},

    //areas: [{type: Schema.Types.ObjectId, ref: 'Area'}],

    is_admin: { type: Boolean, default: false },
    is_lock: { type: Boolean, default: false },

    accessToken: {type: String},
});

UserSchema.plugin(BaseModel);


UserSchema.index({loginname: 1}, {unique: true});
UserSchema.index({accessToken: 1});

mongoose.model('User', UserSchema);