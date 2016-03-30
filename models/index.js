/**
 * Created by user on 15/6/15.
 */
var mongoose = require('mongoose');
var config = require('../web_config');

mongoose.connect(config.db, function (err) {
   if (err) {
       console.error('connect to %s error: ', config.db, err.message);
       process.exit(1);
   }
});

// models
require('./user');
require('./activity');
require('./area');
require('./lodge');
require('./meal');
require('./setting');
require('./theme');
require('./area_for_user');


exports.User = mongoose.model('User');
exports.Activity = mongoose.model('Activity');
exports.Area = mongoose.model('Area');
exports.Lodge = mongoose.model('Lodge');
exports.Meal = mongoose.model('Meal');
exports.Theme = mongoose.model('Theme');
exports.Setting = mongoose.model('Setting');
exports.AreaForUser = mongoose.model('AreaForUser');