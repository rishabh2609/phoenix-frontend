$(document).ready(function() {
	$('#sign-in-btn').click(function() {
		$('#sign-in-card-inputs').slideUp(200);
	});
	$('#switch-to-sign-in-btn').click(function() {
		$('#sign-up-card').fadeOut(200, function() {
			$('#sign-in-card').fadeIn(200);
		});
	});
	$('#switch-to-sign-up-btn').click(function() {
		$('#sign-in-card').fadeOut(200, function() {
			$('#sign-up-card').fadeIn(200);
		});
	});
	$('#sign-up-btn').click(function() {
		$('#enabler').addClass('disabled');
		$('.progress').show();
	});
});