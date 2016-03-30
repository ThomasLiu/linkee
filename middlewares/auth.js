/**
 * Created by user on 22/6/15.
 */
"use strict"
var mongoose   = require('mongoose');
var UserModel  = mongoose.model('User');
var config     = require('../web_config');
var logger = require('../common/logger');
var eventproxy = require('eventproxy');
var UserProxy  = require('../proxy').User;



function gen_session(user, res) {
    var auth_token = user._id + '$$$$'; //以后可能会存储更多信息，用 $$$$ 来分嗝
    var opts = {
        path: '/',
        maxAge: 1000 * 60 * 60 * 24 * 30,
        signed: true,
        httpOnly: true,
        isAdmin: user.isAdmin,
        unionid: user.unionid,
        openid: user.openid
    }
    res.cookie(config.auth_cookie_name, auth_token, opts); //cookie 有效期30天
}

exports.gen_session = gen_session;

/**
 * 需要登录
 */
exports.userRequired = function (req, res, next) {
    if (!req.session || !req.session.user) {
        return res.status(403).send('forbidden!');
    }

    next();
};

exports.blockUser = function () {
    return function (req, res, next) {
        if (req.path === '/signout') {
            return next();
        }

        if (req.session.user && req.session.user.is_block && req.method !== 'GET') {
            return res.status(403).send('您已被管理员屏蔽了。有疑问请联系 @alsotang。');
        }
        next();
    };
};

/**
 * 需要管理员权限
 */
exports.adminRequired = function (req, res, next) {
    if (!req.session.user) {
        logger.info('!req.session.user = ' + (!req.session.user));
        return res.redirect('/signin');
    }

    if (!req.session.user.is_admin) {
        return res.render('notify/notify', { error: '需要管理员权限。' });
    }

    next();
};

// 验证用户是否登录
exports.authUser = function (req, res, next) {
    var ep = new eventproxy();
    ep.fail(next);

    // Ensure current_user always has defined.
    res.locals.current_user = null;

    if (config.debug && req.cookies['mock_user']) {
        var mockUser = JSON.parse(req.cookies['mock_user']);
        req.session.user = new UserModel(mockUser);
        if (mockUser.is_admin) {
            req.session.user.is_admin = true;
        }
        return next();
    }

    ep.all('get_user', function (user) {
        if (!user) {
            return next();
        }
        user = res.locals.current_user = req.session.user = new UserModel(user);

        if (config.admins.hasOwnProperty(user.loginname)) {
            user.is_admin = true;
        }
        next();
    });

    //如果req.session 是undefined 请检查 redies 是否正常
    if (req.session.user) {
        ep.emit('get_user', req.session.user);
    } else {
        var auth_token = req.signedCookies[config.auth_cookie_name];
        if (!auth_token) {
            return next();
        }

        var auth = auth_token.split('$$$$');
        var user_id = auth[0];
        UserProxy.getUserById(user_id, ep.done('get_user'));
    }
};
