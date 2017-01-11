/*
 * @require ../../server/author.js
 * @require ../../components/js/fn.js
 */
/************  nav  ************/

var picker = $('[y-pickadate="dateSelect"]').pickadate({
    format: 'yyyy年mm月',
    onStart: function () {
        console.log('start')
    },
    onRender: function () {
        console.log('render')
    },
    onOpen: function () {
        console.log('open')
    },
    onClose: function () {
        console.log('close')
    },
    onStop: function () {
        console.log('stop')
    },
    onSet: function (context) {
        console.log('set:', context)
    },
});