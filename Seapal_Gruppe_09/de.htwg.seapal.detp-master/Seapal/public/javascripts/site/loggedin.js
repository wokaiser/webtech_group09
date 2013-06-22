$(function() {

    $('#button_app_boatinfo').click(function(event) {
		event.preventDefault();
				
		if (js_loggedin == true) {
			document.location.href='/app_boatinfo.html';
		} else {
			$('#dialogTitle').text('Access denied');
			$('#dialogMessage').text("To use this functionality you have to be signed in.");
			$('#messageBox').modal('show');
		}	
	});
    
    $('#button_app_tripinfo').click(function(event) {
		event.preventDefault();
                
		if (js_loggedin == true) {
			document.location.href='/app_trip.html';
		} else {
			$('#dialogTitle').text('Access denied');
			$('#dialogMessage').text("To use this functionality you have to be signed in.");
			$('#messageBox').modal('show');
		}
	});

	$('#button_app_trackinginfo').click(function(event) {
		event.preventDefault();
                
		if (js_loggedin == true) {
			document.location.href='/app_trackinginfo';
		} else {
			$('#dialogTitle').text('Access denied');
			$('#dialogMessage').text("To use this functionality you have to be signed in.");
			$('#messageBox').modal('show');
		}
	});	

});