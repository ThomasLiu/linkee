'use strict'

import $ from 'jquery';

import {Hodler} from './index/Hodler';
import {BgImg} from './index/BgImg';
import {Theme} from './index/Theme';
import {checkLoad} from './util/img';

$(function(){
    let $background_image = $('#background_image');
    if($background_image.size() > 0){
        let img = $background_image[0];
        checkLoad($background_image[0], () => {
            let bgImg = new BgImg($(window),$background_image);
            bgImg.init();
        });
    }

    let $lenta = $('#lenta');
    if($lenta.size() > 0){
        $.getJSON( `${hostPath}/api/v1/theme/${$lenta.data('id')}` , (json) => {
            if(json){
                if(json.stutas === 200 || json.stutas === '200'){
                    if(json.list){
                        var hodler = new Hodler();
                        hodler.init(json.list);
                    }
                }
            }
        });
    }

    if($('.theme-layer').size() > 0) {
        let theme = new Theme();
        theme.init();
    }

    if($('.apply-btn').size() > 0){
        $('.apply-btn').on('click', (e) => {
            let $this = $(e.currentTarget),
                $form = $this.closest('form');

            $.post(`${hostPath}/api/v1/theme/apply`, $form.serialize() , (json) => {
                if(json){
                    if(json.stutas === 200 || json.stutas === '200'){
                        alert('申请成功,稍后会有工作人员联系您!');
                    }else{
                        alert(`申请出现问题,${json.err_msg}`);
                    }
                }
            }, 'JSON');
        });
    }



    //
    //
    //let img_url = ['http://www.cgrendering.com/Data/Projects/demo2015/demo2015-small.jpg'
    //    ,'http://www.cgrendering.com/Data/Projects/brentwood/brentwood_01-small.jpg'
    //    ,'http://www.cgrendering.com/Data/Projects/happynewyear2015/happynewyear2014-small.jpg'
    //    ,'http://www.cgrendering.com/Data/Projects/brentwood/brentwood_01-small.jpg'
    //    ,'http://www.cgrendering.com/Data/Projects/happynewyear2015/happynewyear2014-small.jpg'
    //    ,'http://www.cgrendering.com/Data/Projects/brentwood/brentwood_01-small.jpg'
    //    //,'http://www.cgrendering.com/Data/Projects/happynewyear2015/happynewyear2014-small.jpg'
    //    //,'http://www.cgrendering.com/Data/Projects/brentwood/brentwood_01-small.jpg'
    //    //,'http://www.cgrendering.com/Data/Projects/happynewyear2015/happynewyear2014-small.jpg'
    //    //,'http://www.cgrendering.com/Data/Projects/brentwood/brentwood_01-small.jpg'
    //    //,'http://www.cgrendering.com/Data/Projects/happynewyear2015/happynewyear2014-small.jpg'
    //    //,'http://www.cgrendering.com/Data/Projects/brentwood/brentwood_01-small.jpg'
    //    //,'http://www.cgrendering.com/Data/Projects/happynewyear2015/happynewyear2014-small.jpg'
    //    //,'http://www.cgrendering.com/Data/Projects/brentwood/brentwood_01-small.jpg'
    //    //,'http://www.cgrendering.com/Data/Projects/happynewyear2015/happynewyear2014-small.jpg'
    //    //,'http://www.cgrendering.com/Data/Projects/brentwood/brentwood_01-small.jpg'
    //    //,'http://www.cgrendering.com/Data/Projects/happynewyear2015/happynewyear2014-small.jpg'
    //    //,'http://www.cgrendering.com/Data/Projects/brentwood/brentwood_01-small.jpg'
    //    //,'http://www.cgrendering.com/Data/Projects/happynewyear2015/happynewyear2014-small.jpg'
    //    //,'http://www.cgrendering.com/Data/Projects/brentwood/brentwood_01-small.jpg'
    //    //,'http://www.cgrendering.com/Data/Projects/happynewyear2015/happynewyear2014-small.jpg'
    //    //,'http://www.cgrendering.com/Data/Projects/brentwood/brentwood_01-small.jpg'
    //    //,'http://www.cgrendering.com/Data/Projects/happynewyear2015/happynewyear2014-small.jpg'
    //];












});
