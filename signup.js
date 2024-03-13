$(document).ready(function() {
    $('#signupform').submit(function(event) {
      event.preventDefault(); // Prevent default form submission
  
      const username = $(this).find('input[name="username"]').val();
      const name = $(this).find('input[name="fullname"]').val();
      const email = $(this).find('input[type="email"]').val();
      const password = $(this).find('input[type="password"]').val();
  
      // Basic validation
      if (!email || !password) {
        $('#resultMessage').html('Please fill in all details');
        return;
      }
  
      // Send AJAX request
      $.ajax({
        url: "https://prosperc40.pythonanywhere.com/api/register/",
        method: "POST",
        contentType: "application/json",
        data: "{\"username\":\""+username+"\", \"name\":\""+name+"\", \"email\":\""+email+"\", \"password\":\""+password+"\"}",
        success: function() {
            alert('Sign Up Successful. Log In')
            window.location.href = 'index.html'; 
        },
        error: function(jqXHR, textStatus, errorThrown) { // Enhanced error handling
            console.log('Error: ', jqXHR, textStatus, errorThrown);
            $('#resultMessage').html('Sign Up failed.');
        }
      });
    });
  });