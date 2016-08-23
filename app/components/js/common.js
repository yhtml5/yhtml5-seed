/* 判断浏览器类型 */
var browserKeywordsMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Opera Mobi|Windows CE|Symbian|Windows Phone|POLARIS|lgtelecom|nokia|SonyEricsson|LG|SAMSUNG|Samsung/i;
var isBrowserMobile = browserKeywordsMobile.test(navigator.userAgent);
if (isBrowserMobile) {
    console.log(isBrowserMobile);
} else {
    console.log(a);
}


function userBrowser(){
    var browserName=navigator.userAgent.toLowerCase();
    if(/msie/i.test(browserName) && !/opera/.test(browserName)){
        alert("IE");
        return ;
    }else if(/firefox/i.test(browserName)){
        alert("Firefox");
        return ;
    }else if(/chrome/i.test(browserName) && /webkit/i.test(browserName) && /mozilla/i.test(browserName)){
        alert("Chrome");
        return ;
    }else if(/opera/i.test(browserName)){
        alert("Opera");
        return ;
    }else if(/webkit/i.test(browserName) &&!(/chrome/i.test(browserName) && /webkit/i.test(browserName) && /mozilla/i.test(browserName))){
        alert("Safari");
        return ;
    }else{
        alert("unKnow");
    }
}