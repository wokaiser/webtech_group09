$(function() {

    $('#button_app_boatinfo').click(function(event) {
		event.preventDefault();
				
		if (js_loggedin == true) {
			document.location.href='../site/app_boatinfo.php';
		} else {
			$('#dialogTitle').text('Access denied');
			$('#dialogMessage').text("To use this functionality you have to be signed in.");
			$('#messageBox').modal('show');
		}	
	});
    
    $('#button_app_tripinfo').click(function(event) {
		event.preventDefault();
                
		if (js_loggedin == true) {
			document.location.href='../site/app_trip.php';
		} else {
			$('#dialogTitle').text('Access denied');
			$('#dialogMessage').text("To use this functionality you have to be signed in.");
			$('#messageBox').modal('show');
		}
	});

	$('#button_app_trackinginfo').click(function(event) {
		event.preventDefault();
                
		if (js_loggedin == true) {
			document.location.href='../site/app_trackinginfo.php';
		} else {
			$('#dialogTitle').text('Access denied');
			$('#dialogMessage').text("To use this functionality you have to be signed in.");
			$('#messageBox').modal('show');
		}
	});	

});