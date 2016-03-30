var config = require('./web_config');

require('colors');
var path = require('path');
var express = require('express');
var session = require('express-session');

require('./middlewares/mongoose_log'); // 打印 mongodb 查询日志
require('./models');

var cors = require('cors');
var webRouter = require('./web_router');
var apiRouterV1 = require('./api_router_v1');

var auth = require('./middlewares/auth');
var proxyMiddleware = require('./middlewares/proxy');

var RedisStore = require('connect-redis')(session); //redis 缓存
var _                        = require('lodash'); //A modern JavaScript utility library delivering modularity, performance, & extras
var csurf = require('csurf'); //post 的时候有token
var compress                 = require('compression'); //压缩文件
var bodyParser = require('body-parser'); //html过滤
var busboy = require('connect-busboy');  //文件上传
var errorhandler = require('errorhandler');  //处理错误信息
//var cors = require('cors'); 但使用api接口的时候使用
var requestLog  = require('./middlewares/request_log');
var renderMiddleware  = require('./middlewares/render');
var logger = require('./common/logger');
var helmet = require('helmet'); //Help secure Express apps with various HTTP headers
var bytes = require('bytes');


// 静态文件目录
var staticDir = path.join(__dirname, 'public');

var urlinfo     = require('url').parse(config.host);
config.hostname = urlinfo.hostname || config.host;

var app = express();

//if (!config.debug && newrelic) {
//    app.locals.newrelic = newrelic;
//}

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// Request logger。请求时间
app.use(requestLog);

if (config.debug) {
    // 渲染时间
    app.use(renderMiddleware.render);
}

// 静态资源
app.use('/public', express.static(staticDir));
app.use('/agent', proxyMiddleware.proxy);

// 通用的中间件
app.use(require('response-time')());// 每日访问限制
app.use(helmet.frameguard('sameorigin')); //Helmet helps you secure your Express apps by setting various HTTP headers. It's not a silver bullet, but it can help!
app.use(bodyParser.json({limit: '1mb'}));
app.use(bodyParser.urlencoded({ extended: true, limit: '1mb' }));
app.use(require('method-override')());
app.use(require('cookie-parser')(config.session_secret));
app.use(require('less-middleware')(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(compress());
app.use(session({
    secret: config.session_secret,
    store: new RedisStore({
        port: config.redis_port,
        host: config.redis_host,
    }),
    resave: true,
    saveUninitialized: true,
}));

// custom middleware
app.use(auth.authUser);
app.use(auth.blockUser());

if (!config.debug) {
    app.use(function (req, res, next) {
        if (req.path.indexOf('/api') === -1) {
            csurf()(req, res, next);
            return;
        }
        next();
    });
    app.set('view cache', true);
}

// set static, dynamic helpers
_.extend(app.locals, {
    config: config
});


app.use(function (req, res, next) {
    res.locals.csrf = req.csrfToken ? req.csrfToken() : '';
    next();
});

app.use(busboy({
    limits: {
        fileSize: 10 * 1024 * 1024 // 10MB
    }
}));

// routes
app.use('/api/v1', cors(), apiRouterV1);
app.use('/', webRouter);

// error handler
if (config.debug) {
    app.use(errorhandler());
} else {
    app.use(function (err, req, res, next) {
        logger.error(err);
        return res.status(500).send('500 status');
    });
}

if (!module.parent) {
    app.listen(config.port, function () {
        logger.info(config.projectName + ' listening on port', config.port);
        logger.info('God bless love....');
        logger.info('You can debug your app with http://' + config.hostname + ':' + config.port);
        logger.info('');
    });
}

module.exports = app;
