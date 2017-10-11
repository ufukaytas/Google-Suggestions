$(document).ready(function () {

	$("#custom-counter").select();


	var suggestionText = $('#suggestionText'); 
	 //Clicking Go Button
    $('#go').click(function(){
      console.log(suggestionText.val());
      suggest(suggestionText.val());
    });
    
    //Handle Enter
    $('#suggestionText').bind('keypress', function(e) {
      var code = e.keyCode || e.which;
       if(code == 13) { //Enter keycode
         suggest(suggestionText.val());
         return false;
       }
    });

    $('#suggestionText').mouseup(function() {
	  	$('#suggestionText').select();
	  	document.execCommand("copy");
	});

	function suggest(query) {
        $.getJSON("http://suggestqueries.google.com/complete/search?callback=?",
            {
              "hl":"en", // Language
              "jsonp":"suggestCallBack", // jsonp callback function name
              "q":query, // query term
              "client":"firefox" // force youtube style response, i.e. jsonp
            }
        );
  
        suggestCallBack = function (data) {
         
         var values = '';
         var searchResults = '';
            $.each(data[1], function(key, val) {
            	values += ', ' + val;
            	searchResults += '<li>' + val + '</li>'
            });

        $("#searchResults").html(searchResults);

        if(values.length > 3)
        {
        	 suggestionText.val(values.substring(2, values.length)); 
        }
        else  
        {
        	suggestionText.val(values);
        }  
         
          
        };
    }

});