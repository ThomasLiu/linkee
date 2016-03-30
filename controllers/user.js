/**
 * Created by user on 20/9/15.
 */
"use strict"
var validator = require('validator');
var eventproxy = require('eventproxy');
var cache = require('../common/cache');
var config = require('../web_config');
var tools = require('../common/tools');


var models = require('../models');
var User = models.User;
var Area = models.Area;
var AreaForUser = models.AreaForUser;

exports.index = (req, res, next) => {
    //获取分页信息
    var page = parseInt(req.query.page, 10) || 1;
    page = page > 0 ? page : 1;
    var limit = config.list_count;
    var editError = req.query.editError || '';
    var userId = req.query.userId;

    //是否用了关键词搜索
    var kw = req.query.kw;
    var query = {};
    if (kw) {
        var reg = eval("/" + kw + "/ig");
        query = {
            $or: [{name: reg}, {userType: reg}]
        };
    }

    var ep = new eventproxy();
    ep.fail(next);

    ep.all('users', 'pages', 'editUser', 'areas' , (users, pages, editUser, areas) => {
        if(!editUser){
            editUser = {}
        }
        res.render('manage/user/index', {
            users: users,
            current_page: page,
            list_topic_count: limit,
            pages: pages,
            kw: kw,
            title: '用户管理',
            editError: editError,
            editUser: editUser,
            areas: areas
        });
    });

    var opt = {skip: (page - 1) * limit, limit: limit, sort: '-create_at'};
    User.find(query,{}, opt, ep.done('users', (users) => users ));

    // 取分页数据
    cache.get(JSON.stringify(query) + 'userPages', ep.done( (pages) => {
        if (pages) {
            ep.emit('pages', pages);
        } else {
            User.count(query, ep.done( (all_count) => {
                var pages = Math.ceil(all_count / limit);
                cache.set(JSON.stringify(query) + 'userPages', pages, 60 * 1);
                ep.emit('pages', pages);
            }));
        }
    }));

    // END 取分页数据
    if(userId){
        User.findOne({_id : userId}, ep.done('editUser', (editUser) =>  editUser ));
    }else{
        ep.emit('editUser', null);
    }

    Area.find({}, {}, {sort: '-create_at'}, ep.done('areas', (areas) => { return areas }));

};

exports.put = (req, res, next) => {

    var ep = new eventproxy();
    ep.fail(next);
    ep.on('prop_err', (msg) => {
        res.status(422);
        return res.redirect(`/user?editError=${encodeURIComponent(msg)}`);
    });

    ep.on('user', (user) => {
        user = initReqUser(req ,user);
        var editError = validateUser(user);
        var pass = user.pass;
        var loginname = user.loginname;

        if (editError) {
            return ep.emit('prop_err', editError);
        }
        if(!user._id){
            User.find({'loginname': loginname},{}, {}, (users) => {
                if(users && users.length > 0) {
                    ep.emit('prop_err', '用户名已被使用。');
                }else{
                    ep.emit('can_save');
                }
            });
        }else{
            ep.emit('can_save');
        }
        tools.bhash(pass, ep.done('passhash', (passhash) => passhash));
    });


    ep.all('passhash','user','can_save', (passhash, user) => {

        user.active = true;
        user.pass = passhash;

        user.save( (err, user) => {
            if(err){
                return next(err);
            }
            return res.redirect('/user');
        } );
    });

    if(req.body._id){
        User.findOne({_id : req.body._id}, ep.done('user', (user) => user ) )
    }else{
        ep.emit('user', new User());
    }

};


exports.lockJson = (req, res, next) => {
    var userId = req.params.id;
    var isLock = req.params.isLock;
    User.findOne({_id: userId }, (err, user) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            res.json({
                stutas: 500,
                err_msg: '此用户不存在或已被删除。'
            });
            return;
        }
        user.is_lock = isLock;
        user.save( (s_err) => {
            if (s_err) {
                return next(err);
            }
            res.json({
                stutas: 200
            });
        });
    });
};

exports.changeRoleJson = (req, res, next) => {
    var userId = req.params.id;
    var isAdmin = req.params.isAdmin;
    User.findOne({_id: userId }, (err, user) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            res.json({
                stutas: 500,
                err_msg: '此用户不存在或已被删除。'
            });
            return;
        }
        user.is_admin = isAdmin;
        user.save( (s_err) => {
            if (s_err) {
                return next(err);
            }
            res.json({
                stutas: 200
            });
        });
    });
};

exports.addAreaJson = (req, res, next) => {
    var userId = req.params.id;
    var areaId = req.params.areaId;
    var isAdd = req.params.isAdd;

    var ep = new eventproxy();
    ep.fail(next);
    ep.on('prop_err', (msg) => {
        res.json({
            stutas: 500,
            err_msg: '此用户不存在或已被删除。'
        });
        return;
    });

    ep.on('finish', () => {
        res.json({
            stutas: 200
        });
        return;
    });

    ep.all('user','area','areaForUser', (user, area, areaForUser) => {
        if(!user || !user._id){
            return ep.emit('prop_err', '此用户不存在或已被删除。');
        }
        if(!area || !area._id){
            return ep.emit('prop_err', '此地区不存在或已被删除。');
        }
        if(isAdd){
            if(!areaForUser || !areaForUser._id){
                let areaForUser = new AreaForUser;
                areaForUser.user_id = userId;
                areaForUser.area_id = areaId;
                areaForUser.save(ep.done('finish'));
            }else{
                return ep.emit('finish');
            }
        }else{
            AreaForUser.remove({user_id: userId, area_id: areaId}, ep.done('finish'));
        }
    });

    User.findOne({_id: userId }, ep.done('user', (user) => user));
    Area.findOne({_id: areaId }, ep.done('area', (area) => area));
    AreaForUser.findOne({user_id: userId, area_id: areaId}, ep.done('areaForUser', (areaForUser) => areaForUser));
};

exports.getAreaJson = (req, res, next) => {
    var userId = req.params.userId;
    AreaForUser.find({user_id: userId},{},{}, (err, areaForUsers) => {
        if(err) {
           next(err);
        }
        res.json({
            stutas: 200,
            list: areaForUsers
        });
    });
};



let initReqUser = (req ,user) => {
    if(req.body._id){
        user._id = validator.trim(req.body._id);
    }
    if(req.body.loginname){
        user.loginname = validator.trim(req.body.loginname);
    }
    if(req.body.pass){
        user.pass = validator.trim(req.body.pass);
    }

    return user;
};

let validateUser = (user) => {
    var editError;
    if (user.loginname === '') {
        editError = '登录帐号不能是空的。';
    } else if (user.pass === '') {
        editError = '登录密码不能是空的。';
    }
    return editError;
};
