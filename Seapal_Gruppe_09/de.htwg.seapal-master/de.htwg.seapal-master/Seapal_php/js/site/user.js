$(function() {

    $('#signin').click(function(event) {
		event.preventDefault();
		
        var json = {
	          "user_username": $('#user_username').val(),
	          "user_password": $('#user_password').val() 
	    };
		
		jQuery.post("user.php", json, function(data) { 		
        
            if(data)
                {
                $("#login").hide(300);
                $("#logout").show(200);
                }
        
		}, "json");
	
	});
    
    $('#signout').click(function(event) {
		event.preventDefault();
				
        var json = {
	          "action": "signout"
	    };
                
		jQuery.post("user.php", json, function(data) { 		
        
            if(data)
                {
                $("#logout").hide(300);
                $("#login").show(200);
                }
        
		}, "json");
	
	});
    
});