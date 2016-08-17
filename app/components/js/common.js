/* 判断浏览器类型 */
var browserKeywordsMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Opera Mobi|Windows CE|Symbian|Windows Phone|POLARIS|lgtelecom|nokia|SonyEricsson|LG|SAMSUNG|Samsung/i;
var isBrowserMobile = browserKeywordsMobile.test(navigator.userAgent);
if (isBrowserMobile) {
    console.log(isBrowserMobile);
} else {
    console.log(a);
}