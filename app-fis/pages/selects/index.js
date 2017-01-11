/*
 * @require ../../server/author.js
 * @require ../../components/js/fn.js
 */
/************  selects  ************/
$('[y-selects="buildings"] .v-selects-heading').on('click', function () {
    setTimeout(function () {
        $true = $('[y-selects="buildings"] .v-selects-heading [data-toggle="collapse"]:eq(0)').is('[aria-expanded="true"]') || $('[y-selects="buildings"] .v-selects-heading [data-toggle="collapse"]:eq(1)').is('[aria-expanded="true"]')
        if ($true) {
            $('[y-selects="buildings"]').find('.v-modal-backdrop').addClass('modal-backdrop').addClass('fade').addClass('in')
        } else {
            $('[y-selects="buildings"]').find('.v-modal-backdrop').removeClass('modal-backdrop').removeClass('in').removeClass('fade')
        }
    }, 100)
});
$('[y-selects="buildings"] .v-modal-backdrop').on('click', function () {
    console.log("hello")
    $(this).removeClass('modal-backdrop').removeClass('in').removeClass('fade')
    $('[y-selects="buildings"] #selectsDate, [y-selects="buildings"] #selectsCity').collapse('hide')
});