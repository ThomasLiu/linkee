

export function checkLoad (img, callback) {
    if(img.complete) { // 如果图片已经存在于浏览器缓存，直接调用回调函数
        callback();
        return
    }
    img.onload = () => { //图片下载完毕时异步调用callback函数。
        callback();
    };
}