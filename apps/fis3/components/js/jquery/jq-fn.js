/*
 * @require ../../../server/author.js
 */
/************  fn  ************/
function doCarouselScanPayDemo(time) {
    $("[y-carousel='scanPayDemo']").carousel({
        interval: time
    });
    $("[y-carousel='scanPayDemo']").on('slid.bs.carousel', function () {
        a = $("[y-carousel='scanPayDemo'] .carousel-inner > .active").attr("y-value");
        $(".y-breadcrumb-pay li").removeClass("active");
        $(".y-breadcrumb-pay li:eq(" + a + ")").addClass("active")
    });
}
function getStart() {
    $("[y-card='quickLinkStart']").click(function () {
        $(this).fadeOut(1000);
        setTimeout(function () {
            $("[y-card='quickLinkSlip']").fadeIn()
        }, 1000);
        S.init();
        setTimeout(function () {
            $("[y-card='quickLinkSlip']").fadeOut();
            $("[y-card='quickLink']").fadeIn(2000)
        }, 9000);
    });
    $("[y-card='quickLinkSlip']").click(function () {
        $(this).fadeOut(1000);
        $("[y-card='quickLink']").fadeIn(2000)
    });
}
function getUrl() {

}
function initDatetimepicker(selector) {

}

function toggleValue(selector, event, eventObject) {
    $(selector).on(event, function () {
        $(eventObject).val($(this).text())
    })
}
function toggleActive(selector, event) {
    $(selector).on(event, function () {
        $(selector).removeClass('active')
        $(this).addClass('active')
    })
}


function yFadeToggle(selector, event, event2, eventObject) {
    $(selector).on(event, function () {
        $(eventObject).fadeIn();
    });
    $(selector).on(event2, function () {
        $(eventObject).fadeOut();
    });
}
(function () {
    var urlId = window.location.hash.replace(/^(.*[n])*.*(.|n)$/g, "$2") - 1;
    if (urlId >= 0) {
        $('.y-nav a').removeClass('active');
        $('.y-nav a:eq(' + urlId + ')').addClass('active').tab('show');
    }
})();