/**
 * Created by user on 15/6/15.
 */
var mailer        = require('nodemailer');
var config        = require('../web_config');
var util          = require('util');
var transport     = mailer.createTransport(config.mail_opts);
var SITE_ROOT_URL = 'http://' + config.host;

/**
 * Send an email
 * @param {Object} data 邮件对象
 */
var sendMail = function (data) {
    if(config.debug) {
        return;
    }
    // 遍历邮件数组，发送每一封邮件，如果有发送失败的，就再压入数组，同时触发mailEvent事件
    transport.sendMail(data, function (err) {
        if(err) {
            // 写为日志
            console.log(err);
        }
    });
};
exports.sendMail = sendMail;

/**
 * 发送激活通知邮件
 * @param {String} who 接收人的邮件地址
 * @param {String} token 重置用的token字符串
 * @param {String} name 接收人的用户名
 */
exports.sendActiveMail = function (who, token, name) {
    var from = util.format('%s <%s>', config.name, config.mail_opts.auth.user);
    var to = who;
    var subject = config.name + '账号激活';
    var html = '<p>您好：' + name + '</p>' +
        '<p>我们收到您在' + config.name + '社区的注册信息，请点击下面的链接来激活帐户：</p>' +
        '<a href  = "' + SITE_ROOT_URL + '/active_account?key=' + token + '&name=' + name + '">激活链接</a>' +
        '<p>若您没有在' + config.name + '社区填写过注册信息，说明有人滥用了您的电子邮箱，请删除此邮件，我们对给您造成的打扰感到抱歉。</p>' +
        '<p>' + config.name + '社区 谨上。</p>';

    exports.sendMail({
        from: from,
        to: to,
        subject: subject,
        html: html
    });
};

/**
 * 发送密码重置通知邮件
 * @param {String} who 接收人的邮件地址
 * @param {String} token 重置用的token字符串
 * @param {String} name 接收人的用户名
 */
exports.sendResetPassMail = function (who, token, name) {
    var from = util.format('%s <%s>', config.name, config.mail_opts.auth.user);
    var to = who;
    var subject = config.name + '社区密码重置';
    var html = '<p>您好：' + name + '</p>' +
        '<p>我们收到您在' + config.name + '社区重置密码的请求，请在24小时内单击下面的链接来重置密码：</p>' +
        '<a href="' + SITE_ROOT_URL + '/reset_pass?key=' + token + '&name=' + name + '">重置密码链接</a>' +
        '<p>若您没有在' + config.name + '社区填写过注册信息，说明有人滥用了您的电子邮箱，请删除此邮件，我们对给您造成的打扰感到抱歉。</p>' +
        '<p>' + config.name + '社区 谨上。</p>';

    exports.sendMail({
        from: from,
        to: to,
        subject: subject,
        html: html
    });
};

exports.sendApplyMail = function (theme,meal,lodge,activitys,area,main_activity,phone) {
    var from = util.format('%s <%s>', config.name, config.mail_opts.auth.user);
    var to = area.email;
    var subject = config.name + '有人申请活动策划';

    var otherActivitysIndo = '';
    if(activitys && activitys.length > 0){
        activitys.map( (item) => {
            otherActivitysIndo = otherActivitysIndo + `${item.name} ${item.avg}/人<br>`;
        });
    }
    if(!otherActivitysIndo){
        otherActivitysIndo = '没有';
    }

    var html =
        `<p>电话为 ${phone} 的用户申请 ${area.name} 分公司的 活动策划</p>
        <p>想参与的主题活动是 ${theme.name}</p>
        <p>主题活动大致介绍: ${theme.info}</p>
        <p>核心活动: ${main_activity.name} ${main_activity.avg}/人</p>
        <p>想组合的活动: ${otherActivitysIndo} </p>
        `;
    if(meal){
        html = html + `<p>选择的配餐: ${meal.name} ${meal.avg}/人</p>`;
    }
    if(lodge){
        html = html + `<p>选择的旅店: ${lodge.name} ${lodge.avg}/人</p>`;
    }

    html = html + `<p>请尽快回电核实</p>`;

    exports.sendMail({
        from: from,
        to: to,
        subject: subject,
        html: html
    });
};