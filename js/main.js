if(typeof(Storage) !== 'undefined') {
	if(localStorage.getItem('token')) {
		window.location.assign('dashboard.html');
	}
} else {
	document.write('Sorry cannot open app!');
}
$(document).ready(function() {
		var otpnumber ;
    $('#otp-feild').hide();
    $('#sign-up-btn').hide();
	$('#sign-in-btn').click(function() {
		$('#sign-in-card-inputs').slideUp(200);
		var mail = $('#sign-in-username').val();
		var pass = $('#sign-in-password').val(); 
		$.post("http://192.168.31.169:3000/api/user/signin", 
		{
			email: mail,
			password: pass
		}, 
		function(data, status) {
			console.dir(data);
			if(data.head.code === 200) {
				window.location.assign('dashboard.html');
				localStorage.token = data.body.token;
				localStorage.name = data.body.name;
				localStorage.email = data.body.email;
				localStorage.userID = data.body.userID;
			} else {
				$('#sign-in-error-msg').text('Invalid Username or Password');
				$('#sign-in-card-inputs').slideDown(200);
			}
			}
		);
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
	 $('#send-otp-btn').click(function() {
        $('#otp-feild').show();
        $('#sign-up-btn').show();
        $('#send-otp-btn').hide();
       	otpnumber = Math.floor(1000 + Math.random() * 9000);
       	$.post("http://192.168.31.169:3000/api/sendotp" ,
       	{
           otp: otpnumber,
           mobile: $("#sign-up-mobile-number").val()
       	}, function (data , status) {
           console.log(data);
       	});
    });
	$('#sign-up-btn').click(function() {
		console.log($('#sign-up-otp').val());
		if($('#sign-up-otp').val() == otpnumber) {
            $('#enabler').addClass('disabled');
            $('.progress').show();
            var pass = $('#sign-up-password').val();
            var username = $('#sign-up-name').val();
            var repass = $('#sign-up-re-password').val();
            var mail = $('#sign-up-username').val();
            var mno = $('#sign-up-mobile-number').val();
            if (pass !== repass) {
                $('#enabler').removeClass('disabled');
                $('.progress').hide();
                $('#sign-up-error-msg').text('Passwords do not match');
                return;
            }
            $.post("http://192.168.31.169:3000/api/user/signup",
                {
                    name: username,
                    password: pass,
                    mobile: mno,
                    email: mail
                },
                function (data, status) {
                    console.dir(data);
                    if (data.head.code === 200) {
                        localStorage.token = data.body.token;
                        localStorage.name = data.body.name;
                        localStorage.email = data.body.email;
                        localStorage.userID = data.body.userID;
                        window.location.assign('dashboard.html');
                    } else if (data.head.code === 700) {
                        $('#sign-up-error-msg').text('Password too short');
                        $('#enabler').removeClass('disabled');
                        $('.progress').hide();
                    } else if (data.head.code === 701) {
                        $('#sign-up-error-msg').text('Password too long');
                        $('#enabler').removeClass('disabled');
                        $('.progress').hide();
                    } else if (data.head.code === 402) {
                        $('#sign-up-error-msg').text('User already exists');
                        $('#enabler').removeClass('disabled');
                        $('.progress').hide();
                    } else {
                        $('#sign-up-error-msg').text('Something went wrong');
                        $('#enabler').removeClass('disabled');
                        $('.progress').hide();
                    }
                });
        }else {
            $('#sign-up-error-msg').text('OTP incorrect!!!');
		}
	});
});