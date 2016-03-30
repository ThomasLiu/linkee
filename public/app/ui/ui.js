"use strict";

import 'bootstrap';
import {ueditorInit} from '../ueditor/UeditorInit';
import {imageUploadeInit} from '../uploade/ImageUploader';



export function initUi() {
    if($('[data-ueditor]').size() > 0){
        $('[data-ueditor]').each( (index,t) => {
            ueditorInit($(t).attr('id'));
        });
    }

    if($('[data-uploader-pricture]').size() > 0){
        $('[data-uploader-pricture]').each( (index,t) => {
            imageUploadeInit($(t));
        });
    }

    if($('#editErrorModal').size() > 0){
        $('#editErrorModal').modal('show');
    }

}