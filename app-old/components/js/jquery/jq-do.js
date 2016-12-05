/*
 * @require fn.js
 * @require shape-shifter.js
 */
/************  do  ************/
$(function () {
    getStart();
    doCarouselScanPayDemo(4000)
    initDatetimepicker("[y-data='record.timeStart'],[y-data='record.timeEnd']")
    toggleValue("[y-menu='record.status'] > li > a", "click", "[y-input='record.status']");
    yFadeToggle("[y-popoper='uploadQRcode'] a", "mouseenter", "mouseleave", "[y-popoper='payee.ewmsml'] img");
    yFadeToggle("[y-popoper='noopsycheMoney']", "mouseenter", "mouseleave", "[y-popoper='infoUl']");
    yFadeToggle("[y-popoper='payee.modified.show.QRcode']", "mouseenter", "mouseleave", "[y-popoper='payee.modified.QRcode'] img");
    $("[y-navbar='nav.user.img']").mouseover(function () {
        $("[y-navbar='nav.float.window']").fadeIn();
    });
    $("[y-close='nav.userPanel']").mouseleave(function () {
        $("[y-navbar='nav.float.window']").fadeOut();
    });
    toggleActive(".y-nav a", 'click')
});



