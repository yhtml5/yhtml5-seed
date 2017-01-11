/*=========================================================================================
 * Author:Kyle|张大漾
 * Author Website:http://yhtml5.com
 * Author Gihub:https://github.com/yhtml5
 * Description: A Website disgned by boostrap and Jquery.Do something awesome and have fun !
 *==========================================================================================*/


/* General
 * ======= */

$(function() {
	$('.list-group-item').click(function() {
		$('.list-group-item').removeClass('active');
		$(this).addClass('active');
	});
	$('.js-nav-navbar-full').click(function() {
		$('.custom-navbar').toggleClass('navbar-full')
	})
	$('.js-nav-bg-success').click(function() {
		$('.custom-navbar').toggleClass('bg-success')
	})
	$('.js-btn-init').click(function() {
		$('.custom-button,.custom-button-group').removeClass('btn-lg btn-sm disabled btn-group btn-group-vertical btn-block active css-boeder-radius0')
	})
	$('.js-btn-lg').click(function() {
		$('.custom-button').removeClass('btn-sm').toggleClass('btn-lg')
	})
	$('.js-btn-sm').click(function() {
		$('.custom-button').removeClass('btn-lg').toggleClass('btn-sm')
	})
	$('.js-btn-circle').click(function() {
		$('.custom-button').toggleClass('css-boeder-radius0')
	})
	$('.js-btn-block').click(function() {
		$('.custom-button-group').removeClass('btn-group btn-group-vertical')
		$('.custom-button').toggleClass('btn-block')
	})
	$('.js-btn-disable').click(function() {
		$('.custom-button').removeClass('active').toggleClass('disabled')
	})
	$('.js-btn-active').click(function() {
		$('.custom-button').removeClass('disabled').toggleClass('active')
	})
	$('.js-btn-group').click(function() {
		$('.custom-button').removeClass('btn-block')
		$('.custom-button-group').removeClass('btn-group-vertical').toggleClass('btn-group')
	})
	$('.js-btn-vertical').click(function() {
		$('.custom-button').removeClass('btn-block')
		$('.custom-button-group').removeClass('btn-group').toggleClass('btn-group-vertical')
	})
	$(".js-font-color").keyup(function() {
		var value = '#' + $(this).val();
		$('.custom-button').css('color', value)
	})
	$(".js-bg-color").keyup(function() {
		var value = '#' + $(this).val();
		$('.custom-button').css('backgroundColor', value)
	})
	$(".js-border-color").keyup(function() {
		var value = '#' + $(this).val();
		$('.custom-button').css('borderColor', value)
	})
})