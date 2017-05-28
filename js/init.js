(function($) {
	$(function() {

		$('.button-collapse').sideNav();
		$('.parallax').parallax();

		$(document).ready(function() {
			$('select').material_select();
			$(document).ready(function() {
			$('.modal').modal();
			});
		});

	});
})(jQuery);