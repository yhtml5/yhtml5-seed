/*
 * @require ../../server/author.js
 * @require ../../components/js/fn.js
 */
$('[y-more="apps.start.html"]').on('click', function () {
    $(this).find('[y-text="more"]').hide().end().find('[y-loading="more"]').addClass('y-animation-loader-ballpulse');
    setTimeout(function () {
        $('[y-more="apps.start.html"]').find('[y-loading="more"]').removeClass('y-animation-loader-ballpulse').end().find('[y-text="more"]').fadeIn()
    }, 2000);
})