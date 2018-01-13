function myMap() {
	var mapProp = {
	  center: new google.maps.LatLng(51.508742,-0.120850),
	  zoom: 5,
	};
	var map = new google.maps.Map(document.getElementById("google-map"), mapProp);
}
$(document).ready(function() {
	$.post("http://192.168.31.169:3100/api/event/live", 
		{
			token: localStorage.getItem('token')
		}
		, 
	function(data, status) {
			console.dir(data);
		}
	);
	$('#interested-btn').click(function() {
		console.dir(this.parentElement.parentElement);
	});
	$('.modal').modal();
	$('#create-event-open-modal-btn').click(function() {
		$('#create-event-modal').modal('open');
	});
	$('.event-card').click(function() {
		$('#events-modal').modal('open');
	});
	$(".button-collapse").sideNav();
	$('#log-out-btn').click(function() {
		document.write('Please wait!');
		localStorage.removeItem('token');
		localStorage.removeItem('name');
		localStorage.removeItem('email');
		localStorage.removeItem('userID');
		window.location.assign('index.html');
	});
	$('.datepicker').pickadate({
    selectMonths: true,
    selectYears: 15
  });
});