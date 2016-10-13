/*
 * @require ../../server/author.js
 * @require ../../components/js/fn.js
 */
$("#addPropertyBtn").on("click", function () {
    var $card = $('.v-card');
    if ($card.length < 5) {
        var date = $('<div class="v-card" y-card="addProperty">');
        date.append($card.html());
        $(this).before(date);
        date.slideDown(300);
    }
});
$("#infoCustom").delegate("i", "click", function () {
    var property = $(this).parents(".v-card");
    property.slideUp(300);
    setTimeout(function () {
        property.remove();
    }, 300)
})