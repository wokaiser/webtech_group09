$(function() {
	
	$('a.remove.trackingpoint').live("click", function(event) {
		var buttonID = this;
	 	var id = $(this).attr('id');
		jQuery.post("/app_tracking_point_delete.html", { "trackpointnr": id }, function(data) {
		 
		 	if (data['trackpointnr'].match(/Error/)) {
		    	
		    	$('#dialogTitle').text('Error');
		    	$('#dialogMessage').text(data['trackpointnr'].replace(/Error: /, ""));
		    	
	    	} else {
		    	
		    	$(buttonID).parents('tr').remove();  
	    
		    	$('#dialogTitle').text('Succes');
		    	$('#dialogMessage').text("Eintrag wurde erfolgreich gelöscht.");
	    	}
			
			$('#messageBox').modal('show');
		}, "json");
	});	

});

