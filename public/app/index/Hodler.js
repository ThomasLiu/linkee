'use strict'

import $ from 'jquery';
import {BgImg} from './BgImg';
import {checkLoad} from '../util/img';

export class Hodler {
    constructor () {
        this.$lenta_table = $('#lenta_table');
        this.$tr = $('tr',this.$lenta_table).eq(0);
        this.$gotoLeft = $('#gotoLeft');
        this.$gotoRight = $('#gotoRight');
        this.$holder = $('#holder');
    }

    init (data) {
        this.__init_tb(data);

        this.$gotoRight.on('click',() => {
            let width = $('#lenta_table').width(),
                margin_left = parseFloat($('#holder').css('margin-left').replace(/px/ig,'')),
                window_w = $(window).width() - 52,
                step = 430,
                move = margin_left - step;

            if((width - window_w + move) < 0){
                move = window_w - width;
                this.$gotoRight.removeClass('hidden').addClass('hidden');
            }
            this.$gotoLeft.removeClass('hidden');
            this.$holder.animate({'margin-left' : move}, "slow");
        });

        this.$gotoLeft.on('click',() => {
            let width = $('#lenta_table').width(),
                margin_left = parseFloat($('#holder').css('margin-left').replace(/px/ig,'')),
                window_w = $(window).width() - 52,
                step = 430,
                move = margin_left + step;

            if(move > 0){
                move = 0;
                this.$gotoLeft.removeClass('hidden').addClass('hidden');
            }
            this.$gotoRight.removeClass('hidden');
            this.$holder.animate({'margin-left' : move}, "slow");
        });


    }

    __init_tb (data) {
        data.forEach((x,i) => {
            if(x){

                let $td = this.__new_td(i,x.main_activity.holder_img),
                    $cell = $('.cell', $td),
                    $img = $('img',$td),
                    img = $('img',$td)[0],
                    $loader = $('.loader', $td);

                checkLoad(img,() => {
                    $loader.css('opacity',0);
                    $img.css('visibility','visible');
                });

                this.$tr.append($td);

                $cell.data('item',x);
                $cell.on('click',this.__cell_click);

                this.__check_goto_btn_stutas();
                //if(i === 0){
                //    $cell.click();
                //}
            }
        });
    }

    __cell_click (e) {
        var $this = $(e.currentTarget),
            $tr = $this.closest('tr'),
            $this_cell = $('.cell',$tr),
            $layout = $('#layout'),
            $title = $('#title'),
            $introduce = $('#introduce'),
            $background_image = $('#background_image'),
            data = $this.data('item'),
            $new_img = $(`<img id="background_image" src="${data.main_activity.bg_img}">`);

        $this_cell.removeClass('active');
        $this.addClass('active');

        $title.html(data.name);
        $introduce.html(data.info);
        $introduce.append(`<a class="more-info-a" href="${hostPath}/${data._id}/view">了解详情</a>`);

        $background_image.animate({'opacity' : 0}, 1000,() => {
            $background_image.remove();
            $layout.prepend($new_img);
            let bgImg = new BgImg($(window), $new_img);
            bgImg.init();
            $new_img.animate({'opacity' : 1}, 2000);
        });

    }

    __check_goto_btn_stutas () {
        let width = $('#lenta_table').width(),
            window_w = $(window).width() - 52;
        if(width < window_w){
            this.$gotoRight.removeClass('hidden').addClass('hidden');
            this.$gotoLeft.removeClass('hidden').addClass('hidden');
        }else{
            this.$gotoRight.removeClass('hidden');
        }
    }


    __new_td (id, url) {
        return $(`<td>
                <div class="cell" id="lenta_cell_${id}">
                    <img id="prev_img_${id}" src="${url}">
                    <div class="type"></div>
                    <div class="type loader" id="lenta_cell_loader_${id}"></div>
                </div>
            </td>`);
    }
}


