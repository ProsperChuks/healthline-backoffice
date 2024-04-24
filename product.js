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

function gotoProduct(id) {
    window.location.href = 'newproduct.html?id=' + id;
}

$(document).ready(function() {
    
    const pageSize = 9;
    let currentPage = 1;

    fetchUserDetails();
    let form = document.getElementById('addProduct');
    
    var endpoint = 'https://prosperc40.pythonanywhere.com/products'
    $.ajax({
        url: endpoint,
        headers: {
            'Authorization': 'Token ' + token
        },
        success: function(productData) {
            
            function displayProducts(productData, currentPage, pageSize) {
                const productsContainer = $('.products-gallery'); 
                productsContainer.empty(); // Clear existing products before displaying
            
                const startIndex = (currentPage - 1) * pageSize;
                const endIndex = startIndex + pageSize;
                const paginatedProducts = productData.slice(startIndex, endIndex);
            
                paginatedProducts.forEach((product, index) => { 
                    const productDiv = `
                                <div class="products-gallery-card${index}">
                                    <div class="image-container">    
                                        <img
                                        alt="${product.drug_name}"
                                        src="${product.image}"
                                        class="products-image"
                                        />
                                        <div class="overlay">
                                            <div class="icon" style="cursor: pointer;" onclick="gotoProduct(${product.id})">&#9998;&nbsp;Edit</div>
                                        </div>
                                    </div>
                                    <br>
                                    <div class="products-frame147">
                                    <div class="products-frame84">
                                        <div class="products-text25">
                                        <div class="products-frame1171276959">
                                            <span class="products-text26">
                                            <span>${product.drug_name}</span>
                                            </span>
                                        </div>
                                        <span class="products-text28">
                                            <span>${product.category}</span>
                                        </span>
                                        </div>
                                        <span class="products-text30"><span>${product.price}</span></span>
                                    </div>
                                    <div class="products-frame146">
                                        <div class="products-frame144">
                                        <img
                                            alt="Ellipse43I1072"
                                            src="https://play.teleporthq.io/static/svg/default-img.svg"
                                            class="products-ellipse43"
                                        />
                                        <span class="products-text32">
                                            <span>Available for delivery</span>
                                        </span>
                                        </div>
                                        <div class="products-frame145">
                                        <img
                                            alt="Ellipse43I1072"
                                            src="https://play.teleporthq.io/static/svg/default-img.svg"
                                            class="products-ellipse4301"
                                        />
                                        <span class="products-text34"><span>In Stock</span></span>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                            `;
                    productsContainer.append(productDiv); 
                });
            }
        
            function updatePaginationButtons() {
                $('.prev-page').prop('disabled', currentPage === 1);
                $('.next-page').prop('disabled', currentPage * pageSize >= productData.length);
            };

            function updatePaginationInfo() {
                const startIndex = (currentPage - 1) * pageSize + 1;
                let endIndex = startIndex + pageSize - 1;
                if (endIndex > productData.length) {
                  endIndex = productData.length;
                }
              
                $('.pagination-info').text(`${startIndex} - ${endIndex} of ${productData.length}`);
            }

            displayProducts(productData, currentPage, pageSize); // Initial display
            updatePaginationButtons();
            updatePaginationInfo();

            $('#searchInput').on('input', function() { // Event listener for input changes
                const searchTerm = $(this).val().toLowerCase(); // Get search term
                currentPage = 1; // Reset to the first page when searching
            
                // Only perform AJAX call if the search term is long enough
                if (searchTerm.length >= 3) { 
                  $.ajax({
                    url: `https://prosperc40.pythonanywhere.com/products?items=${searchTerm}`, // search endpoint
                    headers: {
                      'Authorization': 'Token ' + token
                    },
                    success: function(productData) {
                      displayProducts(productData, currentPage, pageSize);
                      updatePaginationButtons();
                      updatePaginationInfo();
                    },
                  });
                } else if (searchTerm.length === 0) {
                  // Display the full product set 
                  displayProducts(productData, currentPage, pageSize); 
                  updatePaginationButtons();
                  updatePaginationInfo();
                }
            });
        
            // Pagination Button Click Handlers
            $('.next-page').click(() => { 
                currentPage++;
                displayProducts(productData, currentPage, pageSize); 
                updatePaginationButtons();
                updatePaginationInfo();
            });
        
            $('.prev-page').click(() => {
                currentPage--;
                displayProducts(productData, currentPage, pageSize); 
                updatePaginationButtons();
                updatePaginationInfo();
            });
        },  
    });

    $('#file-input').on('change', function() {
        const file = this.files[0]; // Get the selected file
    
        if (file) {
          const reader = new FileReader();
    
          reader.onload = function(event) {
            $('#imagePreview').attr('src', event.target.result);
            $('#imagePreview').show(); // Show the preview
          };
    
          reader.readAsDataURL(file); // Read the image
        }
    });

    if (!id) {
        form.addEventListener('submit', function(event) {
            event.preventDefault();
            // Call your function to send a POST request
            const indications = $(this).find('textarea[name="indications"]').val();
            const indicationsArray = indications.split(',').map(item => item.trim());
            const formData = new FormData();
    
            formData.append('image', $('#file-input')[0].files[0]); 
            formData.append('drug_name', $(this).find('input[name="drug_name"]').val()); 
            formData.append('drug_desc', $(this).find('textarea[name="desc"]').val());
            formData.append('price', $(this).find('input[name="price"]').val());
            formData.append('category', $(this).find('input[name="category"]').val());
            formData.append('presentation', $(this).find('input[name="presentation"]').val());
            formData.append('composition', document.getElementById("compos").value);
            formData.append('indications', JSON.stringify(indicationsArray));
    
            // Send AJAX request
            $.ajax({
                url: `https://prosperc40.pythonanywhere.com/products`,
                method: "POST",
                headers: {
                'Authorization': 'Token ' + token
                },
                data: formData,
                processData: false,
                contentType: false,
                beforeSend: function() {
                    console.log('Sending data:', formData);
                },
                success: function(response) {
                    alert('Product Added Successfully!');
                    window.location.href = 'products.html'; 
                },
                error: function(jqXHR, textStatus, errorThrown) { // Enhanced error handling
                    console.log('Error: ', jqXHR, textStatus, errorThrown);
                    $('#resultMessage').html('Failed to Upload.');
                }
            });
        });
    }
});