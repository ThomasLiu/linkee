import $ from 'jquery';

export function initThemePageUi() {

    $('.new-info-div').each( (i, item) => {
        let $this = $(item),
            $btn = $('.btn',$this);

        $btn.on('click', (e) => {
            let $thisBtn = $(e.currentTarget),
                $thisNewInfoDiv = $thisBtn.closest('.new-info-div'),
                $formGroup = $this.closest('.form-group'),
                $select = $('select',$formGroup),
                name = $this.data('name'),
                $ul = $('ul',$formGroup),
                url = $thisNewInfoDiv.data('url'),
                $dataName = $('[data-name]',$thisNewInfoDiv),
                params = {};
            $dataName.map( (i, item) => {
                let $item = $(item);
                params[$item.data('name')] = $item.val();
            } );
            console.log('params = ' , params);
            if(url){
                $.post(url, params , (json) => {
                    if(json && (json.stutas === 200 || json.stutas === '200')){
                        if(json.saved){
                            let text = `${json.saved.name} ${json.saved.avg}/人`;
                            addLi($ul, name, json.saved._id, text);
                            $select.append($(`<option value="${json.saved._id}">${text}</option>`));
                            $thisNewInfoDiv.removeClass('hidden').addClass('hidden');
                        }
                        $select.val('');
                        alert('添加成功');
                    }else{
                        alert(json.err_msg);
                    }
                }, 'JSON');
            }
        });
    });

    $('select[data-name]').on('change', (e) => {
        let $this = $(e.currentTarget),
            $selected = $('option:selected',$this),
            $formGroup = $this.closest('.form-group'),
            name = $this.data('name'),
            text = $selected.text(),
            $ul = $('ul',$formGroup),
            val = $this.val();
        if(val){
            if(val === 'new'){
                let $newInfoDiv = $('.new-info-div',$formGroup);
                $newInfoDiv.removeClass('hidden');
            }else{
                addLi($ul, name, val, text);
                $this.val('');
            }
        }
    });

    let addLi = ($ul, name, val, text) => {
        if($ul.find(`input[name="${name}"][value="${val}"]`).size() === 0){
            let $newLi = newLi(name,val,text);

            let $close = $newLi.find('.close');

            $ul.append($newLi);

            $close.on('click', function(close_e){
                let $this_close = $(close_e.currentTarget),
                    $li = $this_close.closest('li');
                $li.remove();
            });
        }
    };

    let newLi = (name, val, text) => {
        return $(`<li class="relevance-data">
                    <input type="hidden" name="${name}" value="${val}">
                    <span>${text}</span>
                    <button class="close" type="button">
                        <span>&times;</span>
                    </button>
                </li>`);
    };
}