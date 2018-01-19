function my_hosted_event(header, descp, attend, id) {
	var obj = "<li><input type='hidden' value=" + id + "/> <div class='collapsible-header'>" + header + "</div> <div class='collapsible-body'><h5>Description:</h5><p>" + descp + "</p><h5>Attented By:</h5><p> " + attend + "</p></div> </li>";
	obj = $.parseHTML(obj);
	return obj;
}

function my_attend_events(header, descp, attend, id) {
	var obj = "<li><input type='hidden' value=" + id + "/> <div class='collapsible-header'>" + header + "</div> <div class='collapsible-body'><h5>Description:</h5><p>" + descp + "</p><h5>Attented By:</h5><p> " + attend + "</p></div> </li>";
	obj = $.parseHTML(obj);
	return obj;
}

$(document).ready(function() {
	$.post("http://192.168.31.169:3100/api/event/user", {
		token: localStorage.getItem('token')
	}
	, function(data, status) {
		console.dir(data);
	});

	$.post("http://192.168.31.169:3100/api/event/organised", {
		token: localStorage.getItem('token')
	}
	, function(data, status) {
		console.dir(data.body.events);
		data.body.events.forEach(function(index) {
			$('#prev-hosted-events').append(my_hosted_event(index.name, index.description, index.going));
		});
	});

});