$(function() {

	// Checks whether the textboxes are filled with data or not
	function notAllFilledIn() {
		return ($('#new_username').val() == '' || $('#new_password').val() == '' || $('#new_email').val() == '');
	}

	$('#signup').click(function(event) {

		event.preventDefault();

		var today = new Date();
		var dd = today.getDate();
		var mm = today.getMonth()+1; //January is 0!

		var yyyy = today.getFullYear();
		if(dd < 10) {
			dd = '0' + dd
		};
		if(mm < 10) {
			mm = '0' + mm
		};
		today = yyyy + '-' + mm + '-' + dd;

		if(notAllFilledIn()) {
			$('#dialogTitle').text('Error');
		    $('#dialogMessage').text("You have to fill in all textboxes!");
		    $('#messageBox').modal('show');
		    return;
		}

		var json = {
            "username": $('#new_username').val(),
            "email": $('#new_email').val(),
            "password": $('#new_password').val(),
            "regdate" : today
	    };	   

		console.log(json);

		jQuery.post("welcome_insert.php", json, function(data) { 
	    
	    	if (data['bnr'].match(/Error/)) {
		    	
		    	$('#dialogTitle').text('Error');
		    	$('#dialogMessage').text(data['bnr'].replace(/Error: /, ""));
		    	
	    	} else {
		    		    
		    	$('#dialogTitle').text('Success');
		    	$('#dialogMessage').text("You have successfully signed up.");
	    	}
	    	
	    	$('#messageBox').modal('show');
	    
	    }, "json");
		
	});

});