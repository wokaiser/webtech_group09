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
		entry += "<td>" + json.weather_date + "</td>";
		entry += "<td>" + json.weather_time + "</td>";
        entry += "<td>" + json.strength + "</td>";
        entry += "<td>" + json.wind_direction + "</td>";
        entry += "<td>" + json.airpressure + "</td>";
        entry += "<td>" + json.temperature + "</td>";
        entry += "<td>" + json.clouds + "</td>";
        entry += "<td>" + json.rain + "</td>";
        entry += "<td>" + json.wave_direction + "</td>";
        entry += "<td>" + json.waveheight + "</td>";
        entry += "<td style='width:30px; text-align:left;'><div class='btn-group'>";
        entry += "<a class='btn btn-small view weather' id='" + id + "'><span><i class='icon-eye-open'></i></span></a>";
        entry += "<a class='btn btn-small remove weather' id='" + id + "'><span><i class='icon-remove'></i></span></a>";
        entry += "</div></td>";
        entry += "</tr>";

		$('#entries_weather').append(entry);
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

