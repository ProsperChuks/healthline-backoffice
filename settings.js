const token = localStorage.getItem('token');
const user = localStorage.getItem('userid');

function fetchUserDetails() {
    var endpoint = 'https://prosperc40.pythonanywhere.com/users/'+user
    if (token) {
        $.ajax({
            url: endpoint, // Your backend endpoint
            headers: {
                'Authorization': 'Token ' + token 
            },
            success: function(userData) {
                $('[data-username]').text(userData.username);
                $('[data-fullname]').text(userData.name);
                $('[data-email]').text(userData.email);
            },
            error: function() {
                alert('Failed to Load User Data!')
                window.location.href = 'index.html'
            }
        });
    } else {
        // Handle case where the user is not logged in
        alert('User not logged in.');
        window.location.href = 'index.html'
    }
}

$(document).ready(function() {
    fetchUserDetails();

    $('#chapass').click(function() {
        element = document.getElementById('formpass')
        element.style.display = 'block'
    });

    $('#formpass').submit(function(event) {
        event.preventDefault();
        const old = $(this).find('input[name="old_password"]').val();
        const new_pass = $(this).find('input[name="new_password"]').val();

        $.ajax({
            url: "https://prosperc40.pythonanywhere.com/api/change-password/",
            type: "PUT",
            headers: {
                'Authorization': 'Token ' + token
            },
            contentType: "application/json",
            data: "{\"old_password\":\""+old+"\", \"new_password\":\""+new_pass+"\"}",
            success: function() {
                alert('Password Changed Successfully!')
                window.location.href = 'settings.html'; 
            },
            error: function(jqXHR, textStatus, errorThrown) { // Enhanced error handling
                console.log('Error: ', jqXHR, textStatus, errorThrown);
                // $('#resultMessage').html('Sign in failed. Please check your credentials.');
            }
        });
    });
    
    $('#delete').click(function() {
        $.ajax({
          url: `https://prosperc40.pythonanywhere.com/user/${user}`,
          type: "DELETE",
          headers: {
            'Authorization': 'Token ' + token
          },
          success: function() {
            localStorage.removeItem('token');
            localStorage.removeItem('userid');
            window.location.href = 'index.html'
          },
          error: function(error) {
            // Error handling
            console.error("DELETE failed:", error); 
          }
        });
    });

    $('#logout').click(function() {
        $.ajax({
          url: `https://prosperc40.pythonanywhere.com/api/logout/`,
          type: "POST",
          headers: {
            'Authorization': 'Token ' + token
          },
          success: function() {
            localStorage.removeItem('token');
            localStorage.removeItem('userid');
            window.location.href = 'index.html'
          },
          error: function(error) {
            // Error handling
            console.error("LOGOUT failed:", error); 
          }
        });
    });
});