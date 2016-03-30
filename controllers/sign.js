/**
 * Created by user on 14/6/15.
 */
var validator = require('validator');
var eventproxy = require('eventproxy');
var tools = require('../common/tools');
var User = require('../proxy').User;
var utility        = require('utility');
var mail           = require('../common/mail');
var config         = require('../web_config');
var authMiddleWare = require('../middlewares/auth');
var uuid    = require('node-uuid');

//sign up
exports.showSignup = (req, res) => {
    res.render('sign/signup')
}

exports.signup = (req, res, next) => {
    var loginname = validator.trim(req.body.loginname).toLowerCase();
    var email = validator.trim(req.body.email).toLowerCase();
    var pass = validator.trim(req.body.pass);
    var rePass = validator.trim(req.body.re_pass);

    var ep = new eventproxy();
    ep.fail(next);
    ep.on('prop_err', (msg) => {
        res.status(422);
        res.render('sign/signup', {error: msg, loginname: loginname, email: email});
    });

    ep.all('loginnameUsers','emailUsers',(loginnameUsers,emailUsers) => {
        if(loginnameUsers.length === 0 && emailUsers.length === 0){
            tools.bhash(pass, ep.done((passhash) => {
                        // create gracatar
                User.newAndSave(loginname, loginname, passhash, email, null, false, (err) => {
                    if (err) {
                        return next(err);
                    }
                    // 发送激活邮件
                    mail.sendActiveMail(email, utility.md5(email + passhash + config.session_secret), loginname);
                    res.render('sign/signup', {
                        success: '欢迎加入 ' + config.name + '！我们已给您的注册邮箱发送了一封邮件，请点击里面的链接来激活您的帐号。'
                    });
                });
            }));
        }else if(emailUsers.length > 0){
            return ep.emit('prop_err', 'email已被使用。');
        }else if(loginnameUsers.length > 0){
            return ep.emit('prop_err', '用户名已被使用。');
        }
    });

    // 验证信息的正确性
    if ([loginname, pass, rePass, email].some(function (item) { return item === '';})) {
        return ep.emit('prop_err', '信息不完整。');
    }
    if (loginname.length < 5) {
        return ep.emit('prop_err', '用户名至少需要5个字符。');
    }
    if (!tools.validateId(loginname)) {
        return ep.emit('prop_err', '用户名不合法。');
    }
    if (!validator.isEmail(email)) {
        return ep.emit('prop_err', '邮箱不合法。');
    }
    if (pass !== rePass) {
        return ep.emit('prop_err', '两次密码输入不一致。');
    }
    // END 验证信息的正确性

    User.getUsersByQuery({'loginname': loginname}, {}, ep.done('loginnameUsers',users => users));
    User.getUsersByQuery({'email': email}, {}, ep.done('emailUsers',users => users));
};

/**
 * define some page when login just jump to the home page
 * @type {Array}
 */
var notJump = [
    '/active_account', //active page
    '/reset_pass',     //reset password page, avoid to reset twice
    '/signup',         //regist page
    '/search_pass'    //serch pass page
];

//login in
exports.showLogin = (req, res) => {
    res.render('sign/login')
}

/**
 * Handle user login.
 *
 * @param {HttpRequest} req
 * @param {HttpResponse} res
 * @param {Function} next
 */
exports.login = (req, res, next) => {
    var loginname = validator.trim(req.body.name).toLowerCase();
    var pass = validator.trim(req.body.pass);
    var ep = new eventproxy();

    ep.fail(next);

    if (!loginname || !pass) {
        res.status(422);
        return res.render('sign/signin', { error: '信息不完整。'});
    }

    var getUser;
    if (loginname.indexOf('@') !== -1) {
        getUser = User.getUserByMail;
    } else {
        getUser = User.getUserByLoginName;
    }

    ep.on('login_error',(login_error) => {
        res.status(403);
        res.render('sign/login', {error: '用户名或密码错误'});
    });

    getUser(loginname, (err, user) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            return ep.emit('login_error');
        }
        var passhash = user.pass;
        tools.bcompare(pass, passhash, ep.done((bool) => {
            if (!bool) {
                return ep.emit('login_error');
            }
            if (!user.active) {
                //重新发送激活邮件
                mail.sendActiveMail(user.email, utility.md5(user.email + passhash + config.session_secret), user.loginname);
                res.status(403);
                return res.render('sign/login', {error: '此帐号还没有被激活，激活链接已发送到 ' + user.email + ' 邮箱，请查收。' });
            }

            if (user.is_lock) {
                res.status(403);
                return res.render('sign/login', {error: '此帐号已给锁上，如有问题请致电客服'});
            }
            // store session cookie
            authMiddleWare.gen_session(user, res);
            // check at some page just jump tp home page
            var refer = req.session._loginReferer || '/manage';
            for (var i = 0, len = notJump.length; i != len; ++ i) {
                if (refer.indexOf(notJump[i]) >= 0) {
                    refer = '/';
                    break;
                }
            }
            res.redirect(refer);
        }))
    });
}

// sign out
exports.signout = (req, res, next) => {
    req.session.destroy();
    res.clearCookie(config.auth_cookie_name, {path: '/'});
    //res.locals.current_user = null;
    res.redirect('/signin');
};

exports.activeAccount = (req, res, next) => {
    var key = validator.trim(req.query.key);
    var name = validator.trim(req.query.name);

    User.getUserByLoginName(name, (err, user) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            return next(new Error('[ACTIVE_ACCOUNT] no such user: ' + name));
        }
        var passhash = user.pass;
        if (!user || utility.md5(user.email + passhash + config.session_secret) !== key) {
            return res.render('notify/notify', {error: '信息有误，帐号无法被激活。'});
        }
        if (user.active) {
            return res.render('notify/notify', {error: '帐号已经是激活状态。'});
        }
        user.active = true;
        user.save(function (err) {
            if (err) {
                return next(err);
            }
            res.render('notify/notify', {success: '帐号已被激活，请登录'});
        });
    });
};


exports.showSearchPass = (req, res) => {
    res.render('sign/search_pass');
};

exports.updateSearchPass = (req, res, next) => {
    var email = validator.trim(req.body.email).toLowerCase();
    if (!validator.isEmail(email)) {
        return res.render('sign/search_pass', {error: '邮箱不合法', email: email});
    }

    // 动态生成retrive_key和timestamp到users collection,之后重置密码进行验证
    var retrieveKey  = uuid.v4();
    var retrieveTime = new Date().getTime();

    User.getUserByMail(email, function (err, user) {
        if (!user) {
            res.render('sign/search_pass', {error: '没有这个电子邮箱。', email: email});
            return;
        }
        user.retrieve_key = retrieveKey;
        user.retrieve_time = retrieveTime;
        user.save(function (err) {
            if (err) {
                return next(err);
            }
            // 发送重置密码邮件
            mail.sendResetPassMail(email, retrieveKey, user.loginname);
            res.render('notify/notify', {success: '我们已给您填写的电子邮箱发送了一封邮件，请在24小时内点击里面的链接来重置密码。'});
        });
    });
};

/**
 * reset password
 * 'get' to show the page, 'post' to reset password
 * after reset password, retrieve_key&time will be destroy
 * @param  {http.req}   req
 * @param  {http.res}   res
 * @param  {Function} next
 */
exports.resetPass = (req, res, next) => {
    var key  = validator.trim(req.query.key);
    var name = validator.trim(req.query.name);

    User.getUserByNameAndKey(name, key, function (err, user) {
        if (!user) {
            res.status(403);
            return res.render('notify/notify', {error: '信息有误，密码无法重置。'});
        }
        var now = new Date().getTime();
        var oneDay = 1000 * 60 * 60 * 24;
        if (!user.retrieve_time || now - user.retrieve_time > oneDay) {
            res.status(403);
            return res.render('notify/notify', {error: '该链接已过期，请重新申请。'});
        }
        return res.render('sign/reset', {name: name, key: key});
    });
};

exports.updatePass = (req, res, next) => {
    var psw   = validator.trim(req.body.psw) || '';
    var repsw = validator.trim(req.body.repsw) || '';
    var key   = validator.trim(req.body.key) || '';
    var name  = validator.trim(req.body.name) || '';

    var ep = new eventproxy();
    ep.fail(next);

    if (psw !== repsw) {
        return res.render('sign/reset', {name: name, key: key, error: '两次密码输入不一致。'});
    }
    User.getUserByNameAndKey(name, key, ep.done(function (user) {
        if (!user) {
            return res.render('notify/notify', {error: '错误的激活链接'});
        }
        tools.bhash(psw, ep.done(function (passhash) {
            user.pass          = passhash;
            user.retrieve_key  = null;
            user.retrieve_time = null;
            user.active        = true; // 用户激活

            user.save(function (err) {
                if (err) {
                    return next(err);
                }
                return res.render('notify/notify', {success: '你的密码已重置。'});
            });
        }));
    }));
};
