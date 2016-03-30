/**
 * Created by user on 5/10/15.
 */

"use strict"

var e = {
    // －－－ 主题与活动关系枚举 start
    ACTIVITYS_RELATION_OTHER: 0,
    ACTIVITYS_RELATION_BACK_UP: 1,
    // －－－ 主题与活动关系枚举 end

    // －－－ setting type start
    SETTING_WEBSITE_BASE : 0,
    // －－－ setting type end


    yyyy_mm_dd_hh_mm : 'yyyy-mm-dd HH:MM',
    oneHour : 60 * 60 * 1000,
    oneDay : this.oneHour * 24,

    language: {
        cn : {
            SETTING_0 : '咖币兑换率设置',
            SETTING_1 : '接受活动情况短信手机号设置'
        }
    }

};


module.exports = e;
