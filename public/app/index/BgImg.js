'use strict'

import $ from 'jquery';


export class BgImg {

    constructor ($parent, $target){
        this.$parent = $parent;
        this.$target = $target;
    }

    init () {
        this.__set_img_position();
        this.__window_resize();
    }

    __set_img_position () {
        let {new_img_w, new_img_h , top, left} = this.__get_coordinate();
        this.$target.height(new_img_h).width(new_img_w).css({top:-top,left:-left});
    }

    __window_resize () {
        $(window).off('resize').on('resize',() => {
            this.__set_img_position();
        });
    }

    __get_coordinate() {
        let parent_h = this.$parent.height(),
            parent_w = this.$parent.width(),
            img_h = this.$target[0].height,
            img_w = this.$target[0].width;

        let new_img_w1 = parent_w,
            new_img_h1 = img_h / (img_w / parent_w);
        let new_img_w2 = img_w / (img_h / parent_h),
            new_img_h2 = parent_h;

        let is_h_small = new_img_h1 < parent_h,
            is_w_small = new_img_w2 < parent_w,
            h_close = new_img_h1 - parent_h,
            w_close = new_img_w2 - parent_w,
            is_h_more = h_close > w_close;

        let new_img_w = new_img_w2,
            new_img_h = new_img_h2;
        if(is_h_small){
            new_img_w = new_img_w2;
            new_img_h = new_img_h2;
        }else if(is_w_small){
            new_img_w = new_img_w1;
            new_img_h = new_img_h1;
        }else if(is_h_more){
            new_img_w = new_img_w1;
            new_img_h = new_img_h1;
        }
        let top = 0,
            left = 0;

        if(new_img_w === parent_w){
            top = (new_img_h - parent_h)/2;
        }else if(new_img_h === parent_h){
            left = (new_img_w - parent_w)/2;
        }
        return {new_img_w, new_img_h , top, left};
    }
}