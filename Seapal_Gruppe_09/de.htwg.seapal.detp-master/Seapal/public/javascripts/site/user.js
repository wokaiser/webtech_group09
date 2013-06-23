$(function() {

    $('#signin').click(function(event) {
		event.preventDefault();
		
        var json = {
	          "user_username": $('#user_username').val(),
	          "user_password": $('#user_password').val() 
	    };
		
		jQuery.post("/login", json, function(data) { 		

            if(data)
                {
                //clear cookie-less session
                Session.clear();
                //set the actual session
                Session.load(data.mySession);
                //init mySession
                initMySession();
                //if we are on the app_map, we should reload the site to view the session change.
                if (/app_map/.test(window.location.href)) {window.location.reload();}
                js_loggedin = true;
                $("#login").hide(300);
                $("#logout").show(200);
                $("#loginname").text($('#user_username').val());
                } else {
					$('#dialogTitle').text('Access denied');
					$('#dialogMessage').text("Username / password wrong");
					$('#messageBox').modal('show');
                }
        
		}, "json");
	
	});
    
    $('#signout').click(function(event) {
		event.preventDefault();
				
        var json = {
	          "action": "signout",
              "mySession": Session.dump()
	    };
                
		jQuery.post("/logout", json, function(data) { 		
        
            if(data)
                {
                $("#loginname").text("");
                //clear cookie-less session
                Session.clear();
                js_loggedin = false;
                $("#logout").hide(300);
                $("#login").show(200);
                $("#loginname").text('');
                document.location.href='/';
                }
        
		}, "json");
		
	});
    
});