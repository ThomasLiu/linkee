import $ from 'jquery';

export function initUserPageUi() {

    $('.user-role-radio').on('change', (e) => {
        let $this = $(e.currentTarget),
            $tr = $this.closest('tr'),
            _csrf = $('[name=_csrf]').val() || $('meta[name="csrf-token"]').attr('content');

        if($this.prop('checked')){
            $.post(`${hostPath}/user/${$tr.data('id')}/${$this.data('value')}/changeRoleJson`,{_csrf : _csrf},(json) => {
                if(json && (json.stutas === 200 || json.stutas === '200')){
                    alert('修改成功');
                }else{
                    alert(`修改失败,${addJson.err_msg}`);
                }
            },'JSON');
        }
    });


    $('.user-area-checkbox-td').each( (i, item) => {
        let $thisTd = $(item),
            $tr = $thisTd.closest('tr'),
            id = $tr.data('id'),
            $userAreaCheckbox = $('.user-area-checkbox',$thisTd);

        $.getJSON(`${hostPath}/user/${id}/getAreaJson`, (json) => {
            if(json && (json.stutas === 200 || json.stutas === '200')){
                if(json.list){
                    json.list.map( listItem => {
                        $userAreaCheckbox.each( (j, checkbox) => {
                            var $checkbox = $(checkbox);
                            if($checkbox.data('value') === listItem.area_id){
                                $checkbox.prop('checked',true);
                            }
                        });
                    });
                }
            }
            $userAreaCheckbox.on('change', (e) => {
                var $checkbox = $(e.currentTarget),
                    $tr = $checkbox.closest('tr'),
                    isAdd = 0,
                    _csrf = $('[name=_csrf]').val() || $('meta[name="csrf-token"]').attr('content');

                if($checkbox.prop('checked')){
                    isAdd = 1
                }

                $.post(`${hostPath}/user/${id}/${$checkbox.data('value')}/${isAdd}/addAreaJson`,{_csrf: _csrf},(addJson) => {
                    if(addJson && (addJson.stutas === 200 || addJson.stutas === '200')){
                        alert('修改成功');
                    }else{
                        alert(`修改失败,${addJson.err_msg}`);
                    }
                },'JSON');

            });
        });

    });


}