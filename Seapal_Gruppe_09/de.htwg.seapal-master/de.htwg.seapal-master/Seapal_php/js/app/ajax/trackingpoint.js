$(function() {
	
	function loadEntry(id) { 
			        	
	    jQuery.get("app_tracking_point_load.php", {'trackpointnr': id}, function(data) {
	        $('#strength').val(data['windstaerke']);
	        $('#wind_direction').val(data['windrichtung']);
	        $('#airpressure').val(data['luftdruck']);
	        $('#temperature').val(data['temperatur']);
	        $('#clouds').val(data['wolken']);
	        $('#rain').val(data['regen']);
	        $('#waveheight').val(data['wellenhoehe']);
	        $('#wave_direction').val(data['wellenrichtung']);
	        $('#marker').val(data['marker']);
	        $('#btm').val(data['btm']);
	        $('#dtm').val(data['dtm']);
	        $('#sog').val(data['sog']);
	        $('#cog').val(data['cog']);
	        $('#manoever').val(data['manoever']);
	        $('#vorsegel').val(data['vorsegel']);
	        $('#weather_date').val(data['wdate']);
	        $('#weather_time').val(data['wtime']);
	        $('#motor').val(data['motor']);
	        $('#tank').val(data['tank']);
	    } , "json");
	}
	
	function addEntry(trackpointnr, json) {
		
		var entry = ""; 
			
		entry += "<tr class='selectable' id='" + trackpointnr + "'>";
		entry += "<td>" + json.marker + "</td>";
		entry += "<td>" + json.btm + "</td>";
		entry += "<td>" + json.dtm + "</td>";
		entry += "<td>" + json.sog + "</td>";
		entry += "<td>" + json.cog + "</td>";
		entry += "<td>" + json.manoever + "</td>";
		entry += "<td>" + json.vorsegel + "</td>";
		entry += "<td>" + json.wdate + "</td>";
		entry += "<td>" + json.wtime + "</td>";
		entry += "<td>" + json.motor + "</td>";
		entry += "<td>" + json.tank + "</td>";
        entry += "<td>" + json.strength + "</td>";
        entry += "<td>" + json.wind_direction + "</td>";
        entry += "<td>" + json.airpressure + "</td>";
        entry += "<td>" + json.temperature + "</td>";
        entry += "<td>" + json.clouds + "</td>";
        entry += "<td>" + json.rain + "</td>";
        entry += "<td>" + json.wave_direction + "</td>";
        entry += "<td>" + json.waveheight + "</td>";
        entry += "<td style='width:30px; text-align:left;'><div class='btn-group'>";
        entry += "<a class='btn btn-small view trackingpoint' id='" + trackpointnr + "'><span><i class='icon-eye-open'></i></span></a>";
        entry += "<a class='btn btn-small remove trackingpoint' id='" + trackpointnr + "'><span><i class='icon-remove'></i></span></a>";
        entry += "</div></td>";
        entry += "</tr>";

		$('#entries_trackingpoint').append(entry);
	}

	$('a.view.trackingpoint').live("click", function(event) {
		loadEntry($(this).attr('id'));
	});

	$('a.remove.trackingpoint').live("click", function(event) {
		var buttonID = this;
	 	var id = $(this).attr('id');
		jQuery.post("app_tracking_point_delete.php", { "trackpointnr": id }, function(data) {
		 
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

	$('#save_trackingpoint').click(function(event) {	
		event.preventDefault();

		var query = window.location.search;
		
		var tracknrQuery = query.match(/tracknr=\d/);
		var tracknr = tracknrQuery[0].replace(/tracknr=/, "");
		
		var json = {
				"tracknr": tracknr,
	          	"strength": $('#strength').val(),
	          	"wind_direction": $('#wind_direction').val(),
	         	"airpressure": $('#airpressure').val(),
		        "temperature": $('#temperature').val(),
		        "clouds": $('#clouds').val(),
		        "rain": $('#rain').val(),
		        "waveheight": $('#waveheight').val(),
		        "wave_direction": $('#wave_direction').val(),
		        "marker": $('#marker').val(),
		        "btm": $('#btm').val(),
		        "dtm": $('#dtm').val(),
		        "sog": $('#sog').val(),
		        "cog": $('#cog').val(),
		        "manoever": $('#manoever').val(),
		        "vorsegel": $('#vorsegel').val(),
		        "wdate": $('#weather_date').val(),
		        "wtime": $('#weather_time').val(),
		        "motor": $('#motor').val(),
		        "tank": $('#tank').val(),
	    };

	    console.log(json);
		
		jQuery.post("app_tracking_point_insert.php", json, function(data) { 
			
			if (data['trackpointnr'].match(/Error/)) {
		    	
		    	$('#dialogTitle').text('Error');
		    	$('#dialogMessage').text(data['trackpointnr'].replace(/Error: /, ""));
		    	
	    	} else {
		    	
		    	addEntry( data['trackpointnr'], json ); 
	    
		    	$('#dialogTitle').text('Success');
		    	$('#dialogMessage').text("Eintrag wurde erfolgreich gespeichert.");
	    	}
			
			$('#messageBox').modal('show');
		
		}, "json");
	
	});

});

