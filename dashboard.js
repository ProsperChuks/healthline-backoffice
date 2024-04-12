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

function fetchOrders() {
    var endpoint = 'https://prosperc40.pythonanywhere.com/checkouts'
    $.ajax({
        url: endpoint,
        headers: {
            'Authorization': 'Token ' + token
        },
        success: function(productData) {
            $('[num-orders]').text(Object.keys(productData).length);
        },
    })
}

function fetchCompletedOrders() {
    var endpoint = 'https://prosperc40.pythonanywhere.com/checkouts?completed=1'
    $.ajax({
        url: endpoint,
        headers: {
            'Authorization': 'Token ' + token
        },
        success: function(productData) {
            $('[num-c-orders]').text(Object.keys(productData).length);
        },
    })
}

function fetchCanceledOrders() {
    var endpoint = 'https://prosperc40.pythonanywhere.com/checkouts?canceled=1'
    $.ajax({
        url: endpoint,
        headers: {
            'Authorization': 'Token ' + token
        },
        success: function(productData) {
            $('[num-can-orders]').text(Object.keys(productData).length);
        },
    })
}

function fetchNewMessages() {
    var endpoint = 'https://prosperc40.pythonanywhere.com/chat-requests?status=p'
    $.ajax({
        url: endpoint,
        headers: {
            'Authorization': 'Token ' + token
        },
        success: function(productData) {
            $('[new-messages]').text(Object.keys(productData).length);
        },
    })
}


$(document).ready(function() {
    fetchUserDetails();
    fetchProducts();
    fetchOrders();
    fetchCompletedOrders();
    fetchCanceledOrders();
    fetchNewMessages();

    var endpoint = 'https://prosperc40.pythonanywhere.com/checkouts?completed=0'

    $.ajax({
        url: endpoint,
        headers: {
            'Authorization': 'Token ' + token
        },
        success: function(orders) {
            
            const productsContainer = $('.dashboard-frame1171276846'); 
            productsContainer.empty(); // Clear existing products before displaying
        
            orders.forEach((order, index) => {
                const orderDiv = `
                    <div class="dashboard-frame1171276811">
                        <div class="dashboard-frame1171276856">
                        <span class="dashboard-text079">
                            <span>12:38pm</span>
                        </span>
                        </div>
                        <div class="dashboard-frame1171276808">
                        <div class="dashboard-frame1171276803">
                            <span class="dashboard-text081">
                            <span>${order.name}</span>
                            </span>
                        </div>
                        <div class="dashboard-frame1171276804">
                            <span class="dashboard-text083">
                            <span>${order.email}</span>
                            </span>
                        </div>
                        <div class="dashboard-frame1171276814">
                            <span class="dashboard-text085">
                            <span>${order.phone}</span>
                            </span>
                        </div>
                        <div class="dashboard-frame1171276805">
                            <span class="dashboard-text087">
                            <span class="d-inline-block text-truncate" style="max-width: 100px !important;">${order.address}</span>
                            </span>
                        </div>
                        <div class="dashboard-frame1171276806">
                            <span class="dashboard-text089">
                            <span class="d-inline-block text-truncate" style="max-width: 200px !important;">${order.prescription}</span>
                            </span>
                        </div>
                        <div class="dashboard-frame1171276815">
                            <span class="dashboard-text091">
                            <span>00</span>
                            </span>
                        </div>
                        <div class="dashboard-frame1171276813">
                            <img
                            alt="menudownI318"
                            src="https://play.teleporthq.io/static/svg/default-img.svg"
                            class="dashboard-menudown1"
                            />
                        </div>
                        </div>
                    </div>
                    `;
                productsContainer.append(orderDiv);

                element = document.getElementById(`openModalButton${index}`);
                element2 = document.getElementById(`status${index}`);
                element3 = document.getElementById(`cancel${index}`);
                if (order.is_completed == true){
                    element.style.backgroundColor = 'rgba(233, 243, 241, 1)';
                    element2.style.display = 'none';
                    element3.style.display = 'none';
                } else {
                    element.style.backgroundColor = 'rgba(255, 255, 255, 1)'; // Color for not completed
                }

                if (order.canceled === true){
                  element.style.display = 'none';
                }

                $(`#status${index}`).click(function() {
                    var newData = {
                        is_completed: 1
                    };
            
                    $.ajax({
                      url: `https://prosperc40.pythonanywhere.com/checkouts/${order.id}`,
                      type: "PATCH",
                      headers: {
                        'Authorization': 'Token ' + token
                      },
                      data: JSON.stringify(newData),
                      contentType: "application/json",
                      success: function(result) {
                        // Success! Data updated
                        console.log("PATCH successful:", result); 
                        window.location.href = 'orders.html'
                      },
                      error: function(error) {
                        // Error handling
                        console.error("PATCH failed:", error); 
                      }
                    });
                });

                $(`#cancel${index}`).click(function() {
                    var newData = {
                      canceled: 1
                    };
            
                    $.ajax({
                      url: `https://prosperc40.pythonanywhere.com/checkouts/${order.id}`,
                      type: "PATCH",
                      headers: {
                        'Authorization': 'Token ' + token
                      },
                      data: JSON.stringify(newData),
                      contentType: "application/json",
                      success: function(result) {
                        // Success! Data updated
                        console.log("PATCH successful:", result); 
                        window.location.href = 'orders.html'
                      },
                      error: function(error) {
                        // Error handling
                        console.error("PATCH failed:", error); 
                      }
                    });
                });

                const modal = document.getElementById(`myModal${index}`);
                const openBtn = document.getElementById(`openModalButton${index}`);
                const closeBtn = document.getElementById(`close${index}`);

                // Open Modal
                openBtn.onclick = function() {
                modal.style.display = "block";
                }

                // Close Modal
                closeBtn.onclick = function() {
                modal.style.display = "none";
                }

                // Close when clicking outside the modal
                window.onclick = function(event) {
                if (event.target == modal) {
                    modal.style.display = "none";
                }
                }
            });
        },
    })
});