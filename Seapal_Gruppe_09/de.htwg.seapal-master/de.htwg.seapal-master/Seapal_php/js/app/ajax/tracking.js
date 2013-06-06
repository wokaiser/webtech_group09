$(function() {
	
	function loadEntry(id) { 
			        	
	    jQuery.get("app_trackinginfo_load.php", {'tracknr': id}, function(data) {
	        $('#skipper').val(data['skipper']);
	        $('#crew').val(data['crew']);
	        $('#tstart').val(data['tstart']);
	        $('#tende').val(data['tende']);
	        $('#tdauer').val(data['tdauer']);
	    } , "json");
	}
	
	function addEntry(tracknr, json) {
		
		var entry = ""; 
			
		entry += "<tr class='selectable' id='" + tracknr + "'>";
		entry += "<td>" + json.skipper + "</td>";
		entry += "<td>" + json.crew + "</td>";
		entry += "<td>" + json.tstart + "</td>";
		entry += "<td>" + json.tende + "</td>";
		entry += "<td>" + json.tdauer + "</td>";
        entry += "<td style='width:30px; text-align:left;'><div class='btn-group'>";
        entry += "<a class='btn btn-small view tracking' id='" + tracknr + "'><span><i class='icon-eye-open'></i></span></a>";
        entry += "<a class='btn btn-small remove trackin' id='" + tracknr + "'><span><i class='icon-remove'></i></span></a>";
        entry += "</div></td>";
        entry += "</tr>";

		$('#entries_tracking').append(entry);
	}

	$('a.view.tracking').live("click", function(event) {
		loadEntry($(this).attr('id'));
	});

	$('a.remove.tracking').live("click", function(event) {
		var buttonID = this;
	 	var id = $(this).attr('id');
		jQuery.post("app_trackinginfo_delete.php", { "tracknr": id }, function(data) {
		 
		 	if (data['tracknr'].match(/Error/)) {
		    	
		    	$('#dialogTitle').text('Error');
		    	$('#dialogMessage').text(data['tracknr'].replace(/Error: /, ""));
		    	
	    	} else {
		    	
		    	$(buttonID).parents('tr').remove();  
	    
		    	$('#dialogTitle').text('Succes');
		    	$('#dialogMessage').text("Eintrag wurde erfolgreich gelöscht.");
	    	}
			
			$('#messageBox').modal('show');
		}, "json");
	});

	$('#save_tracking').click(function(event) {	
		event.preventDefault();

		var query = window.location.search;
		
		var tnrQuery = query.match(/tnr=\d/);
		var tnr = tnrQuery[0].replace(/tnr=/, "");
		
		var json = {
				"tnr": tnr,
	          	"skipper": $('#skipper').val(),
	          	"crew": $('#crew').val(),
	         	"tstart": $('#tstart').val(),
		        "tende": $('#tende').val(),
		        "tdauer": $('#tdauer').val(),		        
	    };

	    console.log(json);
		
		jQuery.post("app_trackinginfo_insert.php", json, function(data) { 
			
			if (data['tracknr'].match(/Error/)) {
		    	
		    	$('#dialogTitle').text('Error');
		    	$('#dialogMessage').text(data['tracknr'].replace(/Error: /, ""));
		    	
	    	} else {
		    	
		    	addEntry( data['tracknr'], json ); 
	    
		    	$('#dialogTitle').text('Success');
		    	$('#dialogMessage').text("Eintrag wurde erfolgreich gespeichert.");
	    	}
			
			$('#messageBox').modal('show');
		
		}, "json");
	
	});

});

