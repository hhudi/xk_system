$(function () {
	$('.leftnav li').on('click',function () {
		$('.content').load($(this).attr('p'));
	});
	$('.leftnav li').eq(0).trigger('click');
});