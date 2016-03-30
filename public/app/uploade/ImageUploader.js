
'use strict'

import $ from 'jquery';

import WebUploader from 'fex-team/webuploader';
import 'github:fex-team/webuploader@0.1.5/webuploader.css!';


export function imageUploadeInit($this) {
    let $form = $this.closest('form'),
        value = $this.data('value'),
        name = $this.attr('name'),
        max = $this.attr('data-max') || 1,
        _csrf = $('[name=_csrf]').val() || $('meta[name="csrf-token"]').attr('content') ,
        $list = $this.prev('.uploader-list'),
    // 优化retina, 在retina下这个值是2
        ratio = window.devicePixelRatio || 1,
    // 缩略图大小
        thumbnailWidth = 100 * ratio,
        thumbnailHeight = 100 * ratio;
    // Web Uploader实例
    let uploader = WebUploader.create({
        swf: '/jspm_packages/github/fex-team/webuploader@0.1.5/Uploader.swf',
        server: '/upload?_csrf=' + _csrf,
        pick: $this,
        // 自动上传。
        auto: true,
        // 只允许选择文件，可选。
        accept: {
            title: 'Images',
            extensions: 'gif,jpg,jpeg,bmp,png',
            mimeTypes: 'image/*'
        }
    });

    let addInput = (thisInputName, url) => {
        if(name){
            var inputName = name;
            if(max > 1){
                inputName = inputName + '[' + thisInputName + ']';
            }
            var $input = $('[name="' + inputName + '"]:hidden');
            if($input.size() === 0){
                $input = $('<input>');
                $input.attr('type','hidden').attr('name',inputName);
                $this.after($input);
            }
            $input.val(url);
        }
    };

    if(value){
        var $li = $(
                '<div class="file-item thumbnail">' +
                '<img>' +
                '<div class="info"></div>' +
                '</div>'
            ),
            $img = $li.find('img');
        if(max == 1){
            $list.empty();
        }
        $list.append( $li );
        $img.attr( 'src', value ).css({width:thumbnailWidth ,height :thumbnailHeight});
        addInput('',value);
    }


    // 当有文件添加进来的时候
    uploader.on( 'fileQueued',( file ) => {
        var $li = $(
                '<div id="' + file.id + '" class="file-item thumbnail">' +
                '<img>' +
                '<div class="info">' + file.name + '</div>' +
                '</div>'
            ),
            $img = $li.find('img');
        if(max == 1){
            $list.empty();
        }
        $list.append( $li );

        // 创建缩略图
        uploader.makeThumb( file, function( error, src ) {
            if ( error ) {
                $img.replaceWith('<span>不能预览</span>');
                return;
            }

            $img.attr( 'src', src);
        }, thumbnailWidth, thumbnailHeight );
    });
    // 文件上传过程中创建进度条实时显示。
    uploader.on( 'uploadProgress',( file, percentage ) => {
        var $li = $( '#'+file.id ),
            $percent = $li.find('.progress span');

        // 避免重复创建
        if ( !$percent.length ) {
            $percent = $('<p class="progress"><span></span></p>')
                .appendTo( $li )
                .find('span');
        }

        $percent.css( 'width', percentage * 100 + '%' );
    });

    // 文件上传成功，给item添加成功class, 用样式标记上传成功。
    uploader.on( 'uploadSuccess', (file, res ) => {
        $( '#'+file.id ).addClass('upload-state-done');

        addInput($( '#'+file.id ).index(),res.url);
    });

    // 文件上传失败，现实上传出错。
    uploader.on( 'uploadError', ( file ) => {
        var $li = $( '#'+file.id ),
            $error = $li.find('div.error');

        // 避免重复创建
        if ( !$error.length ) {
            $error = $('<div class="error"></div>').appendTo( $li );
        }

        $error.text('上传失败');
    });

    // 完成上传完了，成功或者失败，先删除进度条。
    uploader.on( 'uploadComplete', ( file ) => {
        $( '#'+file.id ).find('.progress').remove();
    });
}
