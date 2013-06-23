$(function() {

    function initInput(id) {
        document.getElementById(id).innerHTML = ""
        document.getElementById("error_"+id).style.display = "none";
    }
    
    function isValidEmailAddress(emailAddress) {
        var pattern = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);
        return pattern.test(emailAddress);
    };
    
    function checkInputLength(value, name, id, minLen, maxLen) {
        if ( value.length == 0 && minLen == null) {
            document.getElementById("txt_"+id).innerHTML = "Input required";
            document.getElementById(id).style.display = "block";
            return false;
        }
        else if ( value.length < minLen) {
            document.getElementById("txt_"+id).innerHTML = name+" should have at least "+minLen+" characters."
            document.getElementById(id).style.display = "block";
            return false;
        } 
        else if ( value.length > maxLen) {
            document.getElementById("txt_"+id).innerHTML = name+" should have at most "+maxLen+" characters."
            document.getElementById(id).style.display = "block";
            return false;
        } else {
            document.getElementById(id).style.display = "none";
            return true;
        }
    }
    
    function checkAccountEmail(value) {
        if( !isValidEmailAddress( value ) ) {
            document.getElementById("txt_error_new_account_email").innerHTML = "Please input an email adress."
            document.getElementById("error_new_account_email").style.display = "block";
            return false;
        } else {
            document.getElementById("error_new_account_email").style.display = "none";
            return true;
        }
    }
       
    $("#new_account_user").keyup(function(){
        if (checkInputLength($(this).val(), "Username", "error_new_account_user", 6, 10)) {
            //check if the user already exist
            $.getJSON(
                "json_user_check.php",
                { username: $(this).val()}, function(data){
                    if (0 != data.length) {
                        document.getElementById("txt_error_new_account_user").innerHTML = "Username already exist. Please choose another username."
                        document.getElementById("error_new_account_user").style.display = "block";
                        return false;
                    } else {
                        return true;
                    }
                }
            );
        }
    });
    
     $("#new_account_vorname").keyup(function(){
        checkInputLength($(this).val(), "Fist name", "error_new_account_vorname", null, 10);
    });
    
    $("#new_account_nachname").keyup(function(){
        checkInputLength($(this).val(), "Last name", "error_new_account_nachname", null, 10);
    });
    
    $("#new_account_email").keyup(function(){
        checkAccountEmail($(this).val());
    });
    
    $("#new_account_pw").keyup(function(){
        checkInputLength($(this).val(), "Password", "error_new_account_pw", 5, 20);
    });

	$('#new_account_signup').click(function(event) {

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

        valid = checkInputLength($('#new_account_user').val(), "Username", "error_new_account_user", 6, 10)
             && checkInputLength($('#new_account_vorname').val(), "Fist name", "error_new_account_vorname", null, 10)
             && checkInputLength($('#new_account_nachname').val(), "Last name", "error_new_account_nachname", null, 10)
             && checkInputLength($('#new_account_pw').val(), "Password", "error_new_account_pw", 5, 20)
             && checkAccountEmail($('#new_account_email').val());
        
		if(!valid) {
			$('#dialogTitle').text('Error');
		    $('#dialogMessage').text("Please adjust your sign up information.");
		    $('#messageBox').modal('show');
		    return;
		}
        
        //check if the user already exist
        $.getJSON(
            "json_user_check.php",
            { username: $('#new_account_user').val()}, function(data){
                if (0 != data.length) {
                    document.getElementById("txt_error_new_account_user").innerHTML = "Username already exist. Please choose another username."
                    document.getElementById("error_new_account_user").style.display = "block";
                    $('#dialogTitle').text('Error');
                    $('#dialogMessage').text("Please adjust your sign up information.");
                    $('#messageBox').modal('show');
                    return false;
                } else {
                    document.getElementById("error_new_account_user").style.display = "none";

                    var json = {
                        "username": $('#new_account_user').val(),
                        "vorname" : $('#new_account_vorname').val(),
                        "nachname" : $('#new_account_nachname').val(),
                        "email": $('#new_account_email').val(),
                        "password": $('#new_account_pw').val(),
                        "mySession":"",
                        "regdate" : today
                    };	   
                    
                    jQuery.post("welcome_insert.php", json, function(data) { 
                    
                        if (data['bnr'].match(/Error/)) {
                            
                            $('#dialogTitle').text('Error');
                            $('#dialogMessage').text(data['bnr'].replace(/Error: /, ""));
                            
                        } else {
                            initInput("new_account_user");
                            initInput("new_account_vorname");
                            initInput("new_account_nachname");
                            initInput("new_account_email");
                            initInput("new_account_pw");                           
                            $('#dialogTitle').text('Success');
                            $('#dialogMessage').text("You have successfully signed up.");
                        }
                        
                        $('#messageBox').modal('show');
                    
                    }, "json");
                }
            }
        );
	});
});