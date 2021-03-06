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
                //clear cookie-less session
                Session.clear();
                //set the actual session
                Session.set(SESSION, session);
                js_loggedin = true;
                $("#login").hide(300);
                $("#logout").show(200);
                $("#loginname").text($('#user_username').val());
                } else {
                    console.log("login fail");
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
                //clear cookie-less session
                Session.clear();
                js_loggedin = false;
                $("#logout").hide(300);
                $("#login").show(200);
                $("#loginname").text('');
                document.location.href='../site/index.php';
                }
        
		}, "json");
		
	});
    
});