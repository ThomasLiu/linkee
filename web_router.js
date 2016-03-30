/**
 * Created by user on 11/6/15.
 */

/**
 * Module dependencies.
 */
var express          = require('express');
var site             = require('./controllers/site');
var sign             = require('./controllers/sign');
var manage             = require('./controllers/manage');
var theme             = require('./controllers/theme');
var upload  = require('./controllers/upload');
var area  = require('./controllers/area');
var setting = require('./controllers/setting');
var user = require('./controllers/user');
var activity = require('./controllers/activity');
var meal = require('./controllers/meal');
var lodge = require('./controllers/lodge');

var passport         = require('passport');
var config           = require('./web_config');

var auth = require('./middlewares/auth');

var router           = express.Router();


// home page
router.get('/', site.index);
router.get('/:id/index', site.index);
router.get('/:id/view', theme.indexView);



// sitemap
router.get('/sitemap.xml', site.sitemap);

/**
 * ------------------------------------------------------------------
 * 基础的注册 登录 退出 激活 找回密码
 * ------------------------------------------------------------------
 */
if (config.allow_sign_up) {
    router.get('/signup', sign.showSignup); // 跳转到注册界面
    router.post('/signup', sign.signup);  // 提交注册信息
}
router.get('/active_account', sign.activeAccount);  //帐号激活
router.get('/signout', sign.signout);  // 登出
router.get('/signin', sign.showLogin);
router.post('/signin', sign.login);  // 登录校验

router.get('/search_pass', sign.showSearchPass);  // 找回密码页面
router.post('/search_pass', sign.updateSearchPass);  // 更新密码
router.get('/reset_pass', sign.resetPass);  // 进入重置密码页面
router.post('/reset_pass', sign.updatePass);  // 更新密码

// ------------------------------------------------------------------


/**
 * ------------------------------------------------------------------
 * 上传文件
 * ------------------------------------------------------------------
 */
router.post('/upload', auth.userRequired, upload.upload); //上传图片
router.post('/ueditorUpload', auth.userRequired, upload.ueditorUpload); //上传图片

// ------------------------------------------------------------------


/**
 * ------------------------------------------------------------------
 * 管理后台
 * ------------------------------------------------------------------
 */
router.get('/manage', auth.userRequired, manage.index);  // 进入管理后台

router.post('/area/put', auth.adminRequired, area.put);  // 添加分机构
router.post('/setting/:type/save', auth.adminRequired, setting.put); //修改系统设置

//用户
router.get('/user', auth.adminRequired, user.index);  //
router.post('/user/put', auth.adminRequired, user.put);  //
router.post('/user/:id/:isLock/lockJson', auth.adminRequired, user.lockJson);
router.post('/user/:id/:isAdmin/changeRoleJson', auth.adminRequired, user.changeRoleJson);
router.post('/user/:id/:areaId/:isAdd/addAreaJson', auth.adminRequired, user.addAreaJson);
router.get('/user/:userId/getAreaJson', auth.adminRequired, user.getAreaJson);

//活动
router.get('/activity/:areaId', auth.userRequired, activity.list);
router.post('/activity/put', auth.userRequired, activity.put);

//主题
router.get('/theme/:areaId', auth.userRequired, theme.list);
router.post('/theme/put', auth.userRequired, theme.put);

router.post('/meal/putJson', auth.userRequired, meal.putJson);
router.post('/lodge/putJson', auth.userRequired, lodge.putJson);


// ------------------------------------------------------------------





module.exports = router;