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

function fetchProducts() {
    var endpoint = 'https://prosperc40.pythonanywhere.com/products'
    $.ajax({
        url: endpoint,
        headers: {
            'Authorization': 'Token ' + token
        },
        success: function(productData) {
            $('[num-products]').text(Object.keys(productData).length);
        },
    })
}


$(document).ready(function() {
    fetchUserDetails();
    fetchProducts();
});