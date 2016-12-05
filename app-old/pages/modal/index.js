/*
 * @require ../../server/author.js
 * @require ../../components/js/fn.js
 */
/************  modal  ************/

$('[y-modal="choice"] [y-btn="ok"]').on('click', function () {
    console.log(true)
})
$('[y-modal="choice"] [y-btn="cancel"]').on('click', function () {
    console.log(false)
})
$('[y-btn="orderCreateStep1"]').on('click', function () {
    $('[y-modal="choice"]').modal('show').end().find('[y-text="choice"]').text('您有未完成订单，继续或取消？');
})


$('[y-modal="invalid"] [y-btn="cancelInvalid"]').on('click', function () {
   console.log("取消作废")
})
$('[y-modal="invalid"] [y-btn="sureInvalid"]').on('click', function () {
    console.log("确定作废")
})
