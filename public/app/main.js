'use strict'

import $ from 'jquery';

import {initUi} from './ui/ui';
import {initUserPageUi} from './manage/userPage'
import {initThemePageUi} from './manage/themePage'

$(function(){

    initUi();
    initUserPageUi();
    initThemePageUi();


});
