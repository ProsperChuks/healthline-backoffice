$(document).ready(function() {
    $('#signinForm').submit(function(event) {
      event.preventDefault(); // Prevent default form submission
  
      const email = $(this).find('input[type="text"]').val();
      const password = $(this).find('input[type="password"]').val();
  
      // Basic validation
      if (!email || !password) {
        $('#resultMessage').html('Please fill in both email and password');
        return;
      }
  
      // Send AJAX request
      $.ajax({
        url: "https://healthlineng.pythonanywhere.com/api/login/",
        method: "POST",
        contentType: "application/json",
        data: "{\"username\":\""+email+"\", \"password\":\""+password+"\"}",
        success: function(response) {
            // Successful login, store the token
            localStorage.setItem('token', response.token);
            localStorage.setItem('userid', response.user); 
            window.location.href = 'dashboard.html'; 
        },
        error: function(jqXHR, textStatus, errorThrown) { // Enhanced error handling
            console.log('Error: ', jqXHR, textStatus, errorThrown);
            $('#resultMessage').html('Sign in failed. Please check your credentials.');
        }
      });
    });
  });
  