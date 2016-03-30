'use strict'

import $ from 'jquery';

import {checkLoad} from '../util/img';


export class Theme {

    init() {
        this.__init_btn();
        this.__init_img();
        this.__init_select();
        this.__count_money();
    }

    __count_money() {
        var count = 0;
        $('.count-money').each( (i,item) => {
            let $this = $(item),
                avg = parseFloat($this.data('avg') || 0);
            count = count + avg;
            console.log($this,avg, count);
        });
        $('#total_money').text(count);
    }

    __init_select() {
        $('select').on('change', (e) => {

            var $this = $(e.currentTarget),
                $selected = $('option:selected',$this),
                avg = $selected.attr('data-avg-value');

            $this.data('avg',avg);

            this.__count_money();
        });
    }

    __init_btn() {
        $('.project .btn').on('click', (e) => {
            let $this = $(e.currentTarget),
                $project = $this.closest('.project'),
                $activityContent = $this.closest('.activity-content'),
                $form = $this.closest('form'),
                $willInContent = $('#other_activitys'),
                willBtnText = '不要这活动',
                id = $this.data('id'),
                avg = $this.data('avg');
            if($activityContent.is('#other_activitys')){
                $willInContent = $('#back_up_activitys');
                willBtnText = '添加这活动';
                $('#' + id).remove();
            }else{
                let $newInput = $(`<input type="hidden" id="${id}" class="count-money" name="otherActivitys" value="${id}">`);
                $newInput.data('avg',avg);
                $form.prepend($newInput);
            }
            $this.text(willBtnText);
            $willInContent.append($project);

            this.__count_money();
        });
    }

    __init_img () {
        $('img.thumb').each((i,img) => {
            let $img = $(img),
                $project = $img.closest('.project'),
                $preload = $('.preload',$project);

            checkLoad(img, () => {
                $preload.hide();
                $project.removeClass('finish').addClass('finish');
                $img.animate({ opacity : 1}, 1000);
            });
        });
    }

}