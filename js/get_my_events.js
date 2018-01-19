function my_hosted_event(header, descp, attend, id) {
	var obj = "<li><input type='hidden' value=" + id + "/> <div class='collapsible-header'>" + header + "</div> <div class='collapsible-body grey lighten-5'><h5>Description:</h5><p>" + descp + "</p><h5>Attented By:</h5><p> " + attend + "</p></div> </li>";
	obj = $.parseHTML(obj);
	return obj;
}

function my_attend_events(header, descp, id) {
	var obj = "<li> <input type='hidden' value="+ id + "/> <div class='collapsible-header'>" + header + "</div> <div class='collapsible-body grey lighten-5'> <h5>Description:</h5> <p>" + descp + "</p> <div class='row'> <div class='col s9'> <div class='input-field'> <textarea id='feedback-textarea' class='materialize-textarea'></textarea> <label for='feedback-textarea'>Provide feedback</label> </div> </div> <div class='col s3 valign-wrapper'> <a class='btn-floating waves-effect waves-light btn-large'><i class='material-icons'>send</i></a> </div> </div> </div> </li>"; 
	obj = $.parseHTML(obj);
	return obj;
}

$(document).ready(function() {
	$.post("http://192.168.31.169:3100/api/event/user", {
		token: localStorage.getItem('token')
	}
	, function(data, status) {
		data.body.going.forEach(function(index) {
			$('#attented-events').append(my_attend_events(index.event.name, index.event.description, 123));
		});
	});

	$.post("http://192.168.31.169:3100/api/event/organised", {
		token: localStorage.getItem('token')
	}
	, function(data, status) {
		data.body.events.forEach(function(index) {
			$('#prev-hosted-events').append(my_hosted_event(index.name, index.description, index.going));
		});
	});

});