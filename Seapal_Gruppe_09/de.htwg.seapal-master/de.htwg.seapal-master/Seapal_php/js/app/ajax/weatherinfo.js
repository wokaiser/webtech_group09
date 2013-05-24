$(function() {
	
	function loadEntry(id) { 
			        	
	    jQuery.get("app_weatherinfo_load.php", {'id': id}, function(data) {
	        $('#strength').val(data['windstaerke']);
	        $('#wind_direction').val(data['windrichtung']);
	        $('#airpressure').val(data['luftdruck']);
	        $('#temperature').val(data['temperatur']);
	        $('#clouds').val(data['wolken']);
	        $('#rain').val(data['regen']);
	        $('#waveheight').val(data['wellenhoehe']);
	        $('#wave_direction').val(data['wellenrichtung']);
	        $('#weather_time').val(data['uhrzeit']);
	        $('#weather_date').val(data['datum']);
	    } , "json");
	}
	
	function addEntry(id, json) {
		
		var entry = ""; 
			
		entry += "<tr class='selectable' id='" + id + "'>";
		entry += "<td>" + json.bootname + "</td>";
		entry += "<td>" + json.typ + "</td>";
        entry += "<td>" + json.konstrukteur + "</td>";
        entry += "<td>" + json.baujahr + "</td>";
        entry += "<td>" + json.heimathafen + "</td>";
        entry += "<td>" + json.laenge + "</td>";
        entry += "<td>" + json.breite + "</td>";
        entry += "<td>" + json.tiefgang + "</td>";
        entry += "<td>" + json.eigner + "</td>";
        entry += "<td style='width:30px; text-align:left;'><div class='btn-group'>";
        entry += "<a class='btn btn-small view' id='" + id + "'><span><i class='icon-eye-open'></i></span></a>";
        entry += "<a class='btn btn-small remove' id='" + id + "'><span><i class='icon-remove'></i></span></a>";
        entry += "</div></td>";
        entry += "</tr>";

		$('#entries').append(entry);
	}

	$('a.view.weather').live("click", function(event) {
		loadEntry($(this).attr('id'));
	});

	$('a.remove.weather').live("click", function(event) {
		var buttonID = this;
	 	var id = $(this).attr('id');
		jQuery.post("app_weatherinfo_delete.php", { "id": id }, function(data) {
		 
		 	if (data['id'].match(/Error/)) {
		    	
		    	$('#dialogTitle').text('Error');
		    	$('#dialogMessage').text(data['id'].replace(/Error: /, ""));
		    	
	    	} else {
		    	
		    	$(buttonID).parents('tr').remove();  
	    
		    	$('#dialogTitle').text('Succes');
		    	$('#dialogMessage').text("Eintrag wurde erfolgreich gelöscht.");
	    	}
			
			$('#messageBox').modal('show');
		}, "json");
	});

	$('#save_weather').click(function(event) {
	
		event.preventDefault();
		
		var json = {

	          "strength": $('#strength').val(),
	          "wind_direction": $('#wind_direction').val(),
	          "airpressure": $('#airpressure').val(),
		        "temperature": $('#temperature').val(),
		        "clouds": $('#clouds').val(),
		        "rain": $('#rain').val(),
		        "waveheight": $('#waveheight').val(),
		        "wave_direction": $('#wave_direction').val(),
		        "weather_time": $('#weather_time').val(),
		        "weather_date": $('#weather_date').val(),
	    };
		
		jQuery.post("app_weatherinfo_insert.php", json, function(data) { 
			
			if (data['id'].match(/Error/)) {
		    	
		    	$('#dialogTitle').text('Error');
		    	$('#dialogMessage').text(data['id'].replace(/Error: /, ""));
		    	
	    	} else {
		    	
		    	addEntry( data['id'], json ); 
	    
		    	$('#dialogTitle').text('Success');
		    	$('#dialogMessage').text("Eintrag wurde erfolgreich gespeichert.");
	    	}
			
			$('#messageBox').modal('show');
		
		}, "json");
	
	});

});

