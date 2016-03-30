
'use strict'

import $ from 'jquery';

import './src/umeditor.config.js';
import './src/umeditor.min.js';
import './src/lang/zh-cn/zh-cn';
import './src/themes/default/css/umeditor.min.css!'

export function ueditorInit(divId = 'container') {
    let serverPath = '/',
        _csrf = $('[name=_csrf]').val() || $('meta[name="csrf-token"]').attr('content');
    window.um = UM.getEditor(divId, {

        imageUrl:serverPath + 'ueditorUpload?_csrf=' + _csrf,
        imagePath: '',
        lang:/^zh/.test(navigator.language || navigator.browserLanguage || navigator.userLanguage) ? 'zh-cn' : 'en',
        langPath:UMEDITOR_CONFIG.UMEDITOR_HOME_URL + "lang/",
        focus: true
    });
}
