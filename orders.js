const token = localStorage.getItem('token');
const user = localStorage.getItem('userid');

function fetchUserDetails() {
    var endpoint = 'https://healthlineng.pythonanywhere.com/users/'+user
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

function reload() {
  window.location.reload();
}

$(document).ready(function() {
    fetchUserDetails();

    var endpoint = 'https://healthlineng.pythonanywhere.com/checkouts'

    $.ajax({
        url: endpoint,
        headers: {
            'Authorization': 'Token ' + token
        },
        success: function(orders) {
            
            const productsContainer = $('.orders-frame1171276820'); 
            productsContainer.empty(); // Clear existing products before displaying
        
            orders.forEach((order, index) => {
                const orderDiv = `
                    <div class="orders-frame1171276812" id="openModalButton${index}" style="cursor: pointer;">
                        <div class="orders-frame1171276810">
                        <div class="orders-frame1171276856">
                            <span class="orders-text046">
                            <span>12:38pm</span>
                            </span>
                        </div>
                        <div class="orders-frame117127680801">
                            <div class="orders-frame117127680301">
                            <span class="orders-text048">
                                <span>${order.name}</span>
                            </span>
                            </div>
                            <div class="orders-frame117127680401">
                            <span class="orders-text050">
                                <span class="d-inline-block text-truncate" style="max-width: 100px !important;">${order.email}</span>
                            </span>
                            </div>
                            <div class="orders-frame1171276814">
                            <span class="orders-text052">
                                <span>${order.phone}</span>
                            </span>
                            </div>
                            <div class="orders-frame117127680501">
                            <span class="orders-text054">
                                <span class="d-inline-block text-truncate" style="max-width: 100px !important;">${order.address}</span>
                            </span>
                            </div>
                            <div class="orders-frame117127680601">
                            <span class="orders-text056">
                                <span class="d-inline-block text-truncate" style="max-width: 200px !important;">${order.prescription}</span>
                            </span>
                            </div>
                            <div class="orders-frame1171276815">
                            <span class="orders-text058">
                                <span>3,000.00</span>
                            </span>
                            </div>
                            <div class="orders-frame1171276813">
                            <img
                                alt="menudown2662"
                                src="public/external/menudown2662-9o8.svg"
                                class="orders-menudown01"
                            />
                            </div>
                        </div>
                        </div>
                    </div>
                    <script>
                        var prec${index} = document.getElementById("presc");
                        var prec_original${index} = prec${index}.textContent;
                        var prec_truncated${index} = truncateText(prec_original${index}, 20);
                        prec${index}.textContent = prec_truncated${index}; 
                    </script>
                    <script>
                        let textElement${index} = document.getElementById("addy");
                        let originalText${index} = textElement${index}.textContent;
                        let truncatedText${index} = truncateText(originalText${index}, 20);
                        textElement${index}.textContent = truncatedText${index}; 
                    </script>

                    <div id="myModal${index}" class="modal">
                      <div class="modal-content" style="width: 64%; height: auto; background: white; box-shadow: 0px 5px 40px rgba(28, 31, 36, 0.06); border-radius: 20px; overflow: auto; border: 1px #E0E0E0 solid;">
                        <span id="close${index}" class="close-btn">&times;</span>
                        <div style="width: 920px; flex-direction: column; justify-content: flex-start; align-items: flex-start; gap: 30px; display: inline-flex">
                          <div style="width: 920px; height: 91px; border-bottom: 0.50px #9F9E9E solid; justify-content: flex-start; align-items: center; gap: 50px; display: inline-flex">
                            <div style="width: 125px; height: 11px; color: rgba(32, 32, 32, 0.80); font-size: 14px; font-family: Inter; font-weight: 400; line-height: 12.32px; word-wrap: break-word">Prescription</div>
                            <div style="justify-content: flex-start; align-items: flex-start; gap: 20px; display: flex">${order.prescription}
                              <!-- <div style="justify-content: flex-start; align-items: center; gap: 10px; display: flex">
                                <div style="width: 70px; height: 70px; padding: 10px; background: #F9F9F9; border-radius: 10px; overflow: hidden; justify-content: center; align-items: center; display: flex">
                                  <img style="width: 50px; height: 50px" src="./public/external/paracetamol.jpg" />
                                </div>
                                <div style="flex-direction: column; justify-content: flex-start; align-items: flex-start; gap: 10px; display: inline-flex">
                                  <div style="color: #202020; font-size: 16px; font-family: Inter; font-weight: 400; line-height: 14.08px; word-wrap: break-word">Paracetamol 500mg</div>
                                  <div style="color: #202020; font-size: 12px; font-family: Inter; font-weight: 500; line-height: 10.56px; word-wrap: break-word">X2</div>
                                  <div style="color: #202020; font-size: 16px; font-family: Inter; font-weight: 600; line-height: 14.08px; word-wrap: break-word">N2000</div>
                                </div>
                              </div>
                              <div style="justify-content: flex-start; align-items: center; gap: 10px; display: flex">
                                <div style="width: 70px; height: 70px; padding: 10px; background: #F9F9F9; border-radius: 10px; overflow: hidden; justify-content: center; align-items: center; display: flex">
                                  <img style="width: 50px; height: 50px" src="./public/external/paracetamol.jpg" />
                                </div>
                                <div style="flex-direction: column; justify-content: flex-start; align-items: flex-start; gap: 10px; display: inline-flex">
                                  <div style="color: #202020; font-size: 16px; font-family: Inter; font-weight: 400; line-height: 14.08px; word-wrap: break-word">Procold 1000mg</div>
                                  <div style="color: #202020; font-size: 12px; font-family: Inter; font-weight: 500; line-height: 10.56px; word-wrap: break-word">X1</div>
                                  <div style="color: #202020; font-size: 16px; font-family: Inter; font-weight: 600; line-height: 14.08px; word-wrap: break-word">N500</div>
                                </div>
                              </div> -->
                            </div>
                          </div>
                          <div style="padding-bottom: 16px; border-bottom: 0.50px rgba(0, 0, 0, 0.48) solid; flex-direction: column; justify-content: flex-start; align-items: flex-start; gap: 20px; display: flex">
                            <div style="justify-content: flex-start; align-items: flex-start; gap: 50px; display: inline-flex">
                              <div style="width: 125px; height: 11px; color: rgba(32, 32, 32, 0.80); font-size: 14px; font-family: Inter; font-weight: 400; line-height: 12.32px; word-wrap: break-word">Full Name</div>
                              <div style="width: 745px; color: #202020; font-size: 16px; font-family: Inter; font-weight: 400; line-height: 14.08px; word-wrap: break-word">${order.name}</div>
                            </div>
                            <div style="justify-content: flex-start; align-items: flex-start; gap: 50px; display: inline-flex">
                              <div style="width: 125px; height: 11px; color: rgba(32, 32, 32, 0.80); font-size: 14px; font-family: Inter; font-weight: 400; line-height: 12.32px; word-wrap: break-word">Email Address</div>
                              <div style="width: 745px; color: #202020; font-size: 16px; font-family: Inter; font-weight: 400; line-height: 14.08px; word-wrap: break-word">${order.email}</div>
                            </div>
                            <div style="justify-content: flex-start; align-items: flex-start; gap: 50px; display: inline-flex">
                              <div style="width: 125px; height: 11px; color: rgba(32, 32, 32, 0.80); font-size: 14px; font-family: Inter; font-weight: 400; line-height: 12.32px; word-wrap: break-word">Address</div>
                              <div style="width: 745px; color: #202020; font-size: 16px; font-family: Inter; font-weight: 400; line-height: 14.08px; word-wrap: break-word">${order.address}</div>
                            </div>
                            <div style="justify-content: flex-start; align-items: flex-start; gap: 50px; display: inline-flex">
                              <div style="width: 125px; height: 11px; color: rgba(32, 32, 32, 0.80); font-size: 14px; font-family: Inter; font-weight: 400; line-height: 12.32px; word-wrap: break-word">LGA</div>
                              <div style="width: 745px; color: #202020; font-size: 16px; font-family: Inter; font-weight: 400; line-height: 14.08px; word-wrap: break-word">${order.lga}</div>
                            </div>
                            <div style="justify-content: flex-start; align-items: flex-start; gap: 50px; display: inline-flex">
                              <div style="width: 125px; height: 11px; color: rgba(32, 32, 32, 0.80); font-size: 14px; font-family: Inter; font-weight: 400; line-height: 12.32px; word-wrap: break-word">State</div>
                              <div style="width: 745px; color: #202020; font-size: 16px; font-family: Inter; font-weight: 400; line-height: 14.08px; word-wrap: break-word">${order.state}</div>
                            </div>
                            <div style="height: 63px; justify-content: flex-start; align-items: flex-start; gap: 29px; display: inline-flex">
                              <div style="color: rgba(32, 32, 32, 0.80); font-size: 14px; font-family: Inter; font-weight: 400; line-height: 12.32px; word-wrap: break-word">Additional Information</div>
                              <div style="width: 745px; height: 63px; color: #202020; font-size: 16px; font-family: Inter; font-weight: 400; line-height: 21.12px; word-wrap: break-word">${order.add_info}</div>
                            </div>
                          </div>
                        </div>
                        <div style="width: 930px; height: 54px; padding: 10px; flex-direction: column; justify-content: space-between; align-items: flex-start; display: inline-flex">
                          <div style="align-self: stretch; justify-content: space-between; align-items: flex-start; display: inline-flex">
                            <div style="width: 212px; padding-left: 20px; padding-right: 20px; padding-top: 10px; padding-bottom: 10px; background: white; justify-content: center; align-items: center; gap: 10px; display: flex">
                              <div style="width: 28px; height: 28px; padding: 3.50px; justify-content: center; align-items: center; display: flex">
                                <div style="width: 21px; height: 21px; background: #202020"></div>
                              </div>
                              <div style="color: #202020; font-size: 18px; font-family: Inter; font-weight: 500; line-height: 15.84px; word-wrap: break-word">${order.phone}</div>
                            </div>
                            <div style="width: 180px; height: 50px; padding-left: 20px; padding-right: 20px; padding-top: 10px; padding-bottom: 10px; background: white; border-radius: 60px; border: 1px #202020 solid; justify-content: center; align-items: center; gap: 10px; display: flex">
                              <div style="color: #202020; font-size: 18px; font-family: Inter; font-weight: 500; line-height: 15.84px; word-wrap: break-word">Send Email</div>
                            </div>
                            <button id="cancel${index}" style="width: 180px; height: 50px; padding-left: 20px; padding-right: 20px; padding-top: 10px; padding-bottom: 10px; background: white; border-radius: 60px; border: 1px #F11919 solid; justify-content: center; align-items: center; gap: 10px; display: flex">
                              <div style="color: #F11919; font-size: 18px; font-family: Inter; font-weight: 500; line-height: 15.84px; word-wrap: break-word">Cancel Order</div>
                            </button>
                            <button id="status${index}" style="width: 180px; height: 50px; cursor: pointer; padding-left: 20px; padding-right: 20px; padding-top: 10px; padding-bottom: 10px; background: white; border-radius: 60px; border: 1px #0E9D1D solid; justify-content: center; align-items: center; gap: 10px; display: flex">
                              <div style="color: #0E9D1D; font-size: 18px; font-family: Inter; font-weight: 500; line-height: 15.84px; word-wrap: break-word">Mark Complete</div>
                            </button>
                          </div>
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
                      url: `https://healthlineng.pythonanywhere.com/checkouts/${order.id}`,
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
                      url: `https://healthlineng.pythonanywhere.com/checkouts/${order.id}`,
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

            document.getElementById('ongoing').addEventListener('click', function(event) {
              var endpoint = 'https://healthlineng.pythonanywhere.com/checkouts?completed=0'
              $.ajax({
                url: endpoint,
                headers: {
                    'Authorization': 'Token ' + token
                },
                success: function(orders_on) {
                  productsContainer.empty(); // Clear existing products before displaying
        
                  orders_on.forEach((order, index) => {
                      const orderDiv = `
                          <div class="orders-frame1171276812" id="openModalButton${index}" style="cursor: pointer;">
                              <div class="orders-frame1171276810">
                              <div class="orders-frame1171276856">
                                  <span class="orders-text046">
                                  <span>12:38pm</span>
                                  </span>
                              </div>
                              <div class="orders-frame117127680801">
                                  <div class="orders-frame117127680301">
                                  <span class="orders-text048">
                                      <span class="d-inline-block text-truncate" style="max-width: 100px !important;">${order.name}</span>
                                  </span>
                                  </div>
                                  <div class="orders-frame117127680401">
                                  <span class="orders-text050">
                                      <span>${order.email}</span>
                                  </span>
                                  </div>
                                  <div class="orders-frame1171276814">
                                  <span class="orders-text052">
                                      <span>${order.phone}</span>
                                  </span>
                                  </div>
                                  <div class="orders-frame117127680501">
                                  <span class="orders-text054">
                                      <span class="d-inline-block text-truncate" style="max-width: 100px !important;">${order.address}</span>
                                  </span>
                                  </div>
                                  <div class="orders-frame117127680601">
                                  <span class="orders-text056">
                                      <span class="d-inline-block text-truncate" style="max-width: 200px !important;">${order.prescription}</span>
                                  </span>
                                  </div>
                                  <div class="orders-frame1171276815">
                                  <span class="orders-text058">
                                      <span>3,000.00</span>
                                  </span>
                                  </div>
                                  <div class="orders-frame1171276813">
                                  <img
                                      alt="menudown2662"
                                      src="public/external/menudown2662-9o8.svg"
                                      class="orders-menudown01"
                                  />
                                  </div>
                              </div>
                              </div>
                          </div>
                          <script>
                              var prec${index} = document.getElementById("presc");
                              var prec_original${index} = prec${index}.textContent;
                              var prec_truncated${index} = truncateText(prec_original${index}, 20);
                              prec${index}.textContent = prec_truncated${index}; 
                          </script>
                          <script>
                              let textElement${index} = document.getElementById("addy");
                              let originalText${index} = textElement${index}.textContent;
                              let truncatedText${index} = truncateText(originalText${index}, 20);
                              textElement${index}.textContent = truncatedText${index}; 
                          </script>

                          <div id="myModal${index}" class="modal">
                            <div class="modal-content" style="width: 64%; height: auto; background: white; box-shadow: 0px 5px 40px rgba(28, 31, 36, 0.06); border-radius: 20px; overflow: auto; border: 1px #E0E0E0 solid;">
                              <span id="close${index}" class="close-btn">&times;</span>
                              <div style="width: 920px; flex-direction: column; justify-content: flex-start; align-items: flex-start; gap: 30px; display: inline-flex">
                                <div style="width: 920px; height: 91px; border-bottom: 0.50px #9F9E9E solid; justify-content: flex-start; align-items: center; gap: 50px; display: inline-flex">
                                  <div style="width: 125px; height: 11px; color: rgba(32, 32, 32, 0.80); font-size: 14px; font-family: Inter; font-weight: 400; line-height: 12.32px; word-wrap: break-word">Prescription</div>
                                  <div style="justify-content: flex-start; align-items: flex-start; gap: 20px; display: flex">${order.prescription}
                                    <!-- <div style="justify-content: flex-start; align-items: center; gap: 10px; display: flex">
                                      <div style="width: 70px; height: 70px; padding: 10px; background: #F9F9F9; border-radius: 10px; overflow: hidden; justify-content: center; align-items: center; display: flex">
                                        <img style="width: 50px; height: 50px" src="./public/external/paracetamol.jpg" />
                                      </div>
                                      <div style="flex-direction: column; justify-content: flex-start; align-items: flex-start; gap: 10px; display: inline-flex">
                                        <div style="color: #202020; font-size: 16px; font-family: Inter; font-weight: 400; line-height: 14.08px; word-wrap: break-word">Paracetamol 500mg</div>
                                        <div style="color: #202020; font-size: 12px; font-family: Inter; font-weight: 500; line-height: 10.56px; word-wrap: break-word">X2</div>
                                        <div style="color: #202020; font-size: 16px; font-family: Inter; font-weight: 600; line-height: 14.08px; word-wrap: break-word">N2000</div>
                                      </div>
                                    </div>
                                    <div style="justify-content: flex-start; align-items: center; gap: 10px; display: flex">
                                      <div style="width: 70px; height: 70px; padding: 10px; background: #F9F9F9; border-radius: 10px; overflow: hidden; justify-content: center; align-items: center; display: flex">
                                        <img style="width: 50px; height: 50px" src="./public/external/paracetamol.jpg" />
                                      </div>
                                      <div style="flex-direction: column; justify-content: flex-start; align-items: flex-start; gap: 10px; display: inline-flex">
                                        <div style="color: #202020; font-size: 16px; font-family: Inter; font-weight: 400; line-height: 14.08px; word-wrap: break-word">Procold 1000mg</div>
                                        <div style="color: #202020; font-size: 12px; font-family: Inter; font-weight: 500; line-height: 10.56px; word-wrap: break-word">X1</div>
                                        <div style="color: #202020; font-size: 16px; font-family: Inter; font-weight: 600; line-height: 14.08px; word-wrap: break-word">N500</div>
                                      </div>
                                    </div> -->
                                  </div>
                                </div>
                                <div style="padding-bottom: 16px; border-bottom: 0.50px rgba(0, 0, 0, 0.48) solid; flex-direction: column; justify-content: flex-start; align-items: flex-start; gap: 20px; display: flex">
                                  <div style="justify-content: flex-start; align-items: flex-start; gap: 50px; display: inline-flex">
                                    <div style="width: 125px; height: 11px; color: rgba(32, 32, 32, 0.80); font-size: 14px; font-family: Inter; font-weight: 400; line-height: 12.32px; word-wrap: break-word">Full Name</div>
                                    <div style="width: 745px; color: #202020; font-size: 16px; font-family: Inter; font-weight: 400; line-height: 14.08px; word-wrap: break-word">${order.name}</div>
                                  </div>
                                  <div style="justify-content: flex-start; align-items: flex-start; gap: 50px; display: inline-flex">
                                    <div style="width: 125px; height: 11px; color: rgba(32, 32, 32, 0.80); font-size: 14px; font-family: Inter; font-weight: 400; line-height: 12.32px; word-wrap: break-word">Email Address</div>
                                    <div style="width: 745px; color: #202020; font-size: 16px; font-family: Inter; font-weight: 400; line-height: 14.08px; word-wrap: break-word">${order.email}</div>
                                  </div>
                                  <div style="justify-content: flex-start; align-items: flex-start; gap: 50px; display: inline-flex">
                                    <div style="width: 125px; height: 11px; color: rgba(32, 32, 32, 0.80); font-size: 14px; font-family: Inter; font-weight: 400; line-height: 12.32px; word-wrap: break-word">Address</div>
                                    <div style="width: 745px; color: #202020; font-size: 16px; font-family: Inter; font-weight: 400; line-height: 14.08px; word-wrap: break-word">${order.address}</div>
                                  </div>
                                  <div style="justify-content: flex-start; align-items: flex-start; gap: 50px; display: inline-flex">
                                    <div style="width: 125px; height: 11px; color: rgba(32, 32, 32, 0.80); font-size: 14px; font-family: Inter; font-weight: 400; line-height: 12.32px; word-wrap: break-word">LGA</div>
                                    <div style="width: 745px; color: #202020; font-size: 16px; font-family: Inter; font-weight: 400; line-height: 14.08px; word-wrap: break-word">${order.lga}</div>
                                  </div>
                                  <div style="justify-content: flex-start; align-items: flex-start; gap: 50px; display: inline-flex">
                                    <div style="width: 125px; height: 11px; color: rgba(32, 32, 32, 0.80); font-size: 14px; font-family: Inter; font-weight: 400; line-height: 12.32px; word-wrap: break-word">State</div>
                                    <div style="width: 745px; color: #202020; font-size: 16px; font-family: Inter; font-weight: 400; line-height: 14.08px; word-wrap: break-word">${order.state}</div>
                                  </div>
                                  <div style="height: 63px; justify-content: flex-start; align-items: flex-start; gap: 29px; display: inline-flex">
                                    <div style="color: rgba(32, 32, 32, 0.80); font-size: 14px; font-family: Inter; font-weight: 400; line-height: 12.32px; word-wrap: break-word">Additional Information</div>
                                    <div style="width: 745px; height: 63px; color: #202020; font-size: 16px; font-family: Inter; font-weight: 400; line-height: 21.12px; word-wrap: break-word">${order.add_info}</div>
                                  </div>
                                </div>
                              </div>
                              <div style="width: 930px; height: 54px; padding: 10px; flex-direction: column; justify-content: space-between; align-items: flex-start; display: inline-flex">
                                <div style="align-self: stretch; justify-content: space-between; align-items: flex-start; display: inline-flex">
                                  <div style="width: 212px; padding-left: 20px; padding-right: 20px; padding-top: 10px; padding-bottom: 10px; background: white; justify-content: center; align-items: center; gap: 10px; display: flex">
                                    <div style="width: 28px; height: 28px; padding: 3.50px; justify-content: center; align-items: center; display: flex">
                                      <div style="width: 21px; height: 21px; background: #202020"></div>
                                    </div>
                                    <div style="color: #202020; font-size: 18px; font-family: Inter; font-weight: 500; line-height: 15.84px; word-wrap: break-word">${order.phone}</div>
                                  </div>
                                  <div style="width: 180px; height: 50px; padding-left: 20px; padding-right: 20px; padding-top: 10px; padding-bottom: 10px; background: white; border-radius: 60px; border: 1px #202020 solid; justify-content: center; align-items: center; gap: 10px; display: flex">
                                    <div style="color: #202020; font-size: 18px; font-family: Inter; font-weight: 500; line-height: 15.84px; word-wrap: break-word">Send Email</div>
                                  </div>
                                  <button id="cancel${index}" style="width: 180px; height: 50px; padding-left: 20px; padding-right: 20px; padding-top: 10px; padding-bottom: 10px; background: white; border-radius: 60px; border: 1px #F11919 solid; justify-content: center; align-items: center; gap: 10px; display: flex">
                                    <div style="color: #F11919; font-size: 18px; font-family: Inter; font-weight: 500; line-height: 15.84px; word-wrap: break-word">Cancel Order</div>
                                  </button>
                                  <button id="status${index}" style="width: 180px; height: 50px; cursor: pointer; padding-left: 20px; padding-right: 20px; padding-top: 10px; padding-bottom: 10px; background: white; border-radius: 60px; border: 1px #0E9D1D solid; justify-content: center; align-items: center; gap: 10px; display: flex">
                                    <div style="color: #0E9D1D; font-size: 18px; font-family: Inter; font-weight: 500; line-height: 15.84px; word-wrap: break-word">Mark Complete</div>
                                  </button>
                                </div>
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
                            url: `https://healthlineng.pythonanywhere.com/checkouts/${order.id}`,
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
                            url: `https://healthlineng.pythonanywhere.com/checkouts/${order.id}`,
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

            document.getElementById('Completed').addEventListener('click', function(event) {
              var endpoint = 'https://healthlineng.pythonanywhere.com/checkouts?completed=1'
              $.ajax({
                url: endpoint,
                headers: {
                    'Authorization': 'Token ' + token
                },
                success: function(orders_co) {
                  productsContainer.empty(); // Clear existing products before displaying
        
                  orders_co.forEach((order, index) => {
                      const orderDiv = `
                          <div class="orders-frame1171276812" id="openModalButton${index}" style="cursor: pointer;">
                              <div class="orders-frame1171276810">
                              <div class="orders-frame1171276856">
                                  <span class="orders-text046">
                                  <span>12:38pm</span>
                                  </span>
                              </div>
                              <div class="orders-frame117127680801">
                                  <div class="orders-frame117127680301">
                                  <span class="orders-text048">
                                      <span>${order.name}</span>
                                  </span>
                                  </div>
                                  <div class="orders-frame117127680401">
                                  <span class="orders-text050">
                                      <span class="d-inline-block text-truncate" style="max-width: 100px !important;">${order.email}</span>
                                  </span>
                                  </div>
                                  <div class="orders-frame1171276814">
                                  <span class="orders-text052">
                                      <span>${order.phone}</span>
                                  </span>
                                  </div>
                                  <div class="orders-frame117127680501">
                                  <span class="orders-text054">
                                      <span class="d-inline-block text-truncate" style="max-width: 100px !important;">${order.address}</span>
                                  </span>
                                  </div>
                                  <div class="orders-frame117127680601">
                                  <span class="orders-text056">
                                      <span class="d-inline-block text-truncate" style="max-width: 200px !important;">${order.prescription}</span>
                                  </span>
                                  </div>
                                  <div class="orders-frame1171276815">
                                  <span class="orders-text058">
                                      <span>3,000.00</span>
                                  </span>
                                  </div>
                                  <div class="orders-frame1171276813">
                                  <img
                                      alt="menudown2662"
                                      src="public/external/menudown2662-9o8.svg"
                                      class="orders-menudown01"
                                  />
                                  </div>
                              </div>
                              </div>
                          </div>
                          <script>
                              var prec${index} = document.getElementById("presc");
                              var prec_original${index} = prec${index}.textContent;
                              var prec_truncated${index} = truncateText(prec_original${index}, 20);
                              prec${index}.textContent = prec_truncated${index}; 
                          </script>
                          <script>
                              let textElement${index} = document.getElementById("addy");
                              let originalText${index} = textElement${index}.textContent;
                              let truncatedText${index} = truncateText(originalText${index}, 20);
                              textElement${index}.textContent = truncatedText${index}; 
                          </script>

                          <div id="myModal${index}" class="modal">
                            <div class="modal-content" style="width: 64%; height: auto; background: white; box-shadow: 0px 5px 40px rgba(28, 31, 36, 0.06); border-radius: 20px; overflow: auto; border: 1px #E0E0E0 solid;">
                              <span id="close${index}" class="close-btn">&times;</span>
                              <div style="width: 920px; flex-direction: column; justify-content: flex-start; align-items: flex-start; gap: 30px; display: inline-flex">
                                <div style="width: 920px; height: 91px; border-bottom: 0.50px #9F9E9E solid; justify-content: flex-start; align-items: center; gap: 50px; display: inline-flex">
                                  <div style="width: 125px; height: 11px; color: rgba(32, 32, 32, 0.80); font-size: 14px; font-family: Inter; font-weight: 400; line-height: 12.32px; word-wrap: break-word">Prescription</div>
                                  <div style="justify-content: flex-start; align-items: flex-start; gap: 20px; display: flex">${order.prescription}
                                    <!-- <div style="justify-content: flex-start; align-items: center; gap: 10px; display: flex">
                                      <div style="width: 70px; height: 70px; padding: 10px; background: #F9F9F9; border-radius: 10px; overflow: hidden; justify-content: center; align-items: center; display: flex">
                                        <img style="width: 50px; height: 50px" src="./public/external/paracetamol.jpg" />
                                      </div>
                                      <div style="flex-direction: column; justify-content: flex-start; align-items: flex-start; gap: 10px; display: inline-flex">
                                        <div style="color: #202020; font-size: 16px; font-family: Inter; font-weight: 400; line-height: 14.08px; word-wrap: break-word">Paracetamol 500mg</div>
                                        <div style="color: #202020; font-size: 12px; font-family: Inter; font-weight: 500; line-height: 10.56px; word-wrap: break-word">X2</div>
                                        <div style="color: #202020; font-size: 16px; font-family: Inter; font-weight: 600; line-height: 14.08px; word-wrap: break-word">N2000</div>
                                      </div>
                                    </div>
                                    <div style="justify-content: flex-start; align-items: center; gap: 10px; display: flex">
                                      <div style="width: 70px; height: 70px; padding: 10px; background: #F9F9F9; border-radius: 10px; overflow: hidden; justify-content: center; align-items: center; display: flex">
                                        <img style="width: 50px; height: 50px" src="./public/external/paracetamol.jpg" />
                                      </div>
                                      <div style="flex-direction: column; justify-content: flex-start; align-items: flex-start; gap: 10px; display: inline-flex">
                                        <div style="color: #202020; font-size: 16px; font-family: Inter; font-weight: 400; line-height: 14.08px; word-wrap: break-word">Procold 1000mg</div>
                                        <div style="color: #202020; font-size: 12px; font-family: Inter; font-weight: 500; line-height: 10.56px; word-wrap: break-word">X1</div>
                                        <div style="color: #202020; font-size: 16px; font-family: Inter; font-weight: 600; line-height: 14.08px; word-wrap: break-word">N500</div>
                                      </div>
                                    </div> -->
                                  </div>
                                </div>
                                <div style="padding-bottom: 16px; border-bottom: 0.50px rgba(0, 0, 0, 0.48) solid; flex-direction: column; justify-content: flex-start; align-items: flex-start; gap: 20px; display: flex">
                                  <div style="justify-content: flex-start; align-items: flex-start; gap: 50px; display: inline-flex">
                                    <div style="width: 125px; height: 11px; color: rgba(32, 32, 32, 0.80); font-size: 14px; font-family: Inter; font-weight: 400; line-height: 12.32px; word-wrap: break-word">Full Name</div>
                                    <div style="width: 745px; color: #202020; font-size: 16px; font-family: Inter; font-weight: 400; line-height: 14.08px; word-wrap: break-word">${order.name}</div>
                                  </div>
                                  <div style="justify-content: flex-start; align-items: flex-start; gap: 50px; display: inline-flex">
                                    <div style="width: 125px; height: 11px; color: rgba(32, 32, 32, 0.80); font-size: 14px; font-family: Inter; font-weight: 400; line-height: 12.32px; word-wrap: break-word">Email Address</div>
                                    <div style="width: 745px; color: #202020; font-size: 16px; font-family: Inter; font-weight: 400; line-height: 14.08px; word-wrap: break-word">${order.email}</div>
                                  </div>
                                  <div style="justify-content: flex-start; align-items: flex-start; gap: 50px; display: inline-flex">
                                    <div style="width: 125px; height: 11px; color: rgba(32, 32, 32, 0.80); font-size: 14px; font-family: Inter; font-weight: 400; line-height: 12.32px; word-wrap: break-word">Address</div>
                                    <div style="width: 745px; color: #202020; font-size: 16px; font-family: Inter; font-weight: 400; line-height: 14.08px; word-wrap: break-word">${order.address}</div>
                                  </div>
                                  <div style="justify-content: flex-start; align-items: flex-start; gap: 50px; display: inline-flex">
                                    <div style="width: 125px; height: 11px; color: rgba(32, 32, 32, 0.80); font-size: 14px; font-family: Inter; font-weight: 400; line-height: 12.32px; word-wrap: break-word">LGA</div>
                                    <div style="width: 745px; color: #202020; font-size: 16px; font-family: Inter; font-weight: 400; line-height: 14.08px; word-wrap: break-word">${order.lga}</div>
                                  </div>
                                  <div style="justify-content: flex-start; align-items: flex-start; gap: 50px; display: inline-flex">
                                    <div style="width: 125px; height: 11px; color: rgba(32, 32, 32, 0.80); font-size: 14px; font-family: Inter; font-weight: 400; line-height: 12.32px; word-wrap: break-word">State</div>
                                    <div style="width: 745px; color: #202020; font-size: 16px; font-family: Inter; font-weight: 400; line-height: 14.08px; word-wrap: break-word">${order.state}</div>
                                  </div>
                                  <div style="height: 63px; justify-content: flex-start; align-items: flex-start; gap: 29px; display: inline-flex">
                                    <div style="color: rgba(32, 32, 32, 0.80); font-size: 14px; font-family: Inter; font-weight: 400; line-height: 12.32px; word-wrap: break-word">Additional Information</div>
                                    <div style="width: 745px; height: 63px; color: #202020; font-size: 16px; font-family: Inter; font-weight: 400; line-height: 21.12px; word-wrap: break-word">${order.add_info}</div>
                                  </div>
                                </div>
                              </div>
                              <div style="width: 930px; height: 54px; padding: 10px; flex-direction: column; justify-content: space-between; align-items: flex-start; display: inline-flex">
                                <div style="align-self: stretch; justify-content: space-between; align-items: flex-start; display: inline-flex">
                                  <div style="width: 212px; padding-left: 20px; padding-right: 20px; padding-top: 10px; padding-bottom: 10px; background: white; justify-content: center; align-items: center; gap: 10px; display: flex">
                                    <div style="width: 28px; height: 28px; padding: 3.50px; justify-content: center; align-items: center; display: flex">
                                      <div style="width: 21px; height: 21px; background: #202020"></div>
                                    </div>
                                    <div style="color: #202020; font-size: 18px; font-family: Inter; font-weight: 500; line-height: 15.84px; word-wrap: break-word">${order.phone}</div>
                                  </div>
                                  <div style="width: 180px; height: 50px; padding-left: 20px; padding-right: 20px; padding-top: 10px; padding-bottom: 10px; background: white; border-radius: 60px; border: 1px #202020 solid; justify-content: center; align-items: center; gap: 10px; display: flex">
                                    <div style="color: #202020; font-size: 18px; font-family: Inter; font-weight: 500; line-height: 15.84px; word-wrap: break-word">Send Email</div>
                                  </div>
                                  <button id="cancel${index}" style="width: 180px; height: 50px; padding-left: 20px; padding-right: 20px; padding-top: 10px; padding-bottom: 10px; background: white; border-radius: 60px; border: 1px #F11919 solid; justify-content: center; align-items: center; gap: 10px; display: flex">
                                    <div style="color: #F11919; font-size: 18px; font-family: Inter; font-weight: 500; line-height: 15.84px; word-wrap: break-word">Cancel Order</div>
                                  </button>
                                  <button id="status${index}" style="width: 180px; height: 50px; cursor: pointer; padding-left: 20px; padding-right: 20px; padding-top: 10px; padding-bottom: 10px; background: white; border-radius: 60px; border: 1px #0E9D1D solid; justify-content: center; align-items: center; gap: 10px; display: flex">
                                    <div style="color: #0E9D1D; font-size: 18px; font-family: Inter; font-weight: 500; line-height: 15.84px; word-wrap: break-word">Mark Complete</div>
                                  </button>
                                </div>
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

            document.getElementById('canceled').addEventListener('click', function(event) {
              var endpoint = 'https://healthlineng.pythonanywhere.com/checkouts?canceled=1'
              $.ajax({
                url: endpoint,
                headers: {
                    'Authorization': 'Token ' + token
                },
                success: function(orders_can) {
                  productsContainer.empty(); // Clear existing products before displaying
        
                  orders_can.forEach((order, index) => {
                      const orderDiv = `
                          <div class="orders-frame1171276812" id="openModalButton${index}" style="cursor: pointer;">
                              <div class="orders-frame1171276810">
                              <div class="orders-frame1171276856">
                                  <span class="orders-text046">
                                  <span>12:38pm</span>
                                  </span>
                              </div>
                              <div class="orders-frame117127680801">
                                  <div class="orders-frame117127680301">
                                  <span class="orders-text048">
                                      <span>${order.name}</span>
                                  </span>
                                  </div>
                                  <div class="orders-frame117127680401">
                                  <span class="orders-text050">
                                      <span class="d-inline-block text-truncate" style="max-width: 100px !important;">${order.email}</span>
                                  </span>
                                  </div>
                                  <div class="orders-frame1171276814">
                                  <span class="orders-text052">
                                      <span>${order.phone}</span>
                                  </span>
                                  </div>
                                  <div class="orders-frame117127680501">
                                  <span class="orders-text054">
                                      <span class="d-inline-block text-truncate" style="max-width: 100px !important;">${order.address}</span>
                                  </span>
                                  </div>
                                  <div class="orders-frame117127680601">
                                  <span class="orders-text056">
                                      <span class="d-inline-block text-truncate" style="max-width: 200px !important;">${order.prescription}</span>
                                  </span>
                                  </div>
                                  <div class="orders-frame1171276815">
                                  <span class="orders-text058">
                                      <span>3,000.00</span>
                                  </span>
                                  </div>
                                  <div class="orders-frame1171276813">
                                  <img
                                      alt="menudown2662"
                                      src="public/external/menudown2662-9o8.svg"
                                      class="orders-menudown01"
                                  />
                                  </div>
                              </div>
                              </div>
                          </div>
                          <script>
                              var prec${index} = document.getElementById("presc");
                              var prec_original${index} = prec${index}.textContent;
                              var prec_truncated${index} = truncateText(prec_original${index}, 20);
                              prec${index}.textContent = prec_truncated${index}; 
                          </script>
                          <script>
                              let textElement${index} = document.getElementById("addy");
                              let originalText${index} = textElement${index}.textContent;
                              let truncatedText${index} = truncateText(originalText${index}, 20);
                              textElement${index}.textContent = truncatedText${index}; 
                          </script>

                          <div id="myModal${index}" class="modal">
                            <div class="modal-content" style="width: 64%; height: auto; background: white; box-shadow: 0px 5px 40px rgba(28, 31, 36, 0.06); border-radius: 20px; overflow: auto; border: 1px #E0E0E0 solid;">
                              <span id="close${index}" class="close-btn">&times;</span>
                              <div style="width: 920px; flex-direction: column; justify-content: flex-start; align-items: flex-start; gap: 30px; display: inline-flex">
                                <div style="width: 920px; height: 91px; border-bottom: 0.50px #9F9E9E solid; justify-content: flex-start; align-items: center; gap: 50px; display: inline-flex">
                                  <div style="width: 125px; height: 11px; color: rgba(32, 32, 32, 0.80); font-size: 14px; font-family: Inter; font-weight: 400; line-height: 12.32px; word-wrap: break-word">Prescription</div>
                                  <div style="justify-content: flex-start; align-items: flex-start; gap: 20px; display: flex">${order.prescription}
                                    <!-- <div style="justify-content: flex-start; align-items: center; gap: 10px; display: flex">
                                      <div style="width: 70px; height: 70px; padding: 10px; background: #F9F9F9; border-radius: 10px; overflow: hidden; justify-content: center; align-items: center; display: flex">
                                        <img style="width: 50px; height: 50px" src="./public/external/paracetamol.jpg" />
                                      </div>
                                      <div style="flex-direction: column; justify-content: flex-start; align-items: flex-start; gap: 10px; display: inline-flex">
                                        <div style="color: #202020; font-size: 16px; font-family: Inter; font-weight: 400; line-height: 14.08px; word-wrap: break-word">Paracetamol 500mg</div>
                                        <div style="color: #202020; font-size: 12px; font-family: Inter; font-weight: 500; line-height: 10.56px; word-wrap: break-word">X2</div>
                                        <div style="color: #202020; font-size: 16px; font-family: Inter; font-weight: 600; line-height: 14.08px; word-wrap: break-word">N2000</div>
                                      </div>
                                    </div>
                                    <div style="justify-content: flex-start; align-items: center; gap: 10px; display: flex">
                                      <div style="width: 70px; height: 70px; padding: 10px; background: #F9F9F9; border-radius: 10px; overflow: hidden; justify-content: center; align-items: center; display: flex">
                                        <img style="width: 50px; height: 50px" src="./public/external/paracetamol.jpg" />
                                      </div>
                                      <div style="flex-direction: column; justify-content: flex-start; align-items: flex-start; gap: 10px; display: inline-flex">
                                        <div style="color: #202020; font-size: 16px; font-family: Inter; font-weight: 400; line-height: 14.08px; word-wrap: break-word">Procold 1000mg</div>
                                        <div style="color: #202020; font-size: 12px; font-family: Inter; font-weight: 500; line-height: 10.56px; word-wrap: break-word">X1</div>
                                        <div style="color: #202020; font-size: 16px; font-family: Inter; font-weight: 600; line-height: 14.08px; word-wrap: break-word">N500</div>
                                      </div>
                                    </div> -->
                                  </div>
                                </div>
                                <div style="padding-bottom: 16px; border-bottom: 0.50px rgba(0, 0, 0, 0.48) solid; flex-direction: column; justify-content: flex-start; align-items: flex-start; gap: 20px; display: flex">
                                  <div style="justify-content: flex-start; align-items: flex-start; gap: 50px; display: inline-flex">
                                    <div style="width: 125px; height: 11px; color: rgba(32, 32, 32, 0.80); font-size: 14px; font-family: Inter; font-weight: 400; line-height: 12.32px; word-wrap: break-word">Full Name</div>
                                    <div style="width: 745px; color: #202020; font-size: 16px; font-family: Inter; font-weight: 400; line-height: 14.08px; word-wrap: break-word">${order.name}</div>
                                  </div>
                                  <div style="justify-content: flex-start; align-items: flex-start; gap: 50px; display: inline-flex">
                                    <div style="width: 125px; height: 11px; color: rgba(32, 32, 32, 0.80); font-size: 14px; font-family: Inter; font-weight: 400; line-height: 12.32px; word-wrap: break-word">Email Address</div>
                                    <div style="width: 745px; color: #202020; font-size: 16px; font-family: Inter; font-weight: 400; line-height: 14.08px; word-wrap: break-word">${order.email}</div>
                                  </div>
                                  <div style="justify-content: flex-start; align-items: flex-start; gap: 50px; display: inline-flex">
                                    <div style="width: 125px; height: 11px; color: rgba(32, 32, 32, 0.80); font-size: 14px; font-family: Inter; font-weight: 400; line-height: 12.32px; word-wrap: break-word">Address</div>
                                    <div style="width: 745px; color: #202020; font-size: 16px; font-family: Inter; font-weight: 400; line-height: 14.08px; word-wrap: break-word">${order.address}</div>
                                  </div>
                                  <div style="justify-content: flex-start; align-items: flex-start; gap: 50px; display: inline-flex">
                                    <div style="width: 125px; height: 11px; color: rgba(32, 32, 32, 0.80); font-size: 14px; font-family: Inter; font-weight: 400; line-height: 12.32px; word-wrap: break-word">LGA</div>
                                    <div style="width: 745px; color: #202020; font-size: 16px; font-family: Inter; font-weight: 400; line-height: 14.08px; word-wrap: break-word">${order.lga}</div>
                                  </div>
                                  <div style="justify-content: flex-start; align-items: flex-start; gap: 50px; display: inline-flex">
                                    <div style="width: 125px; height: 11px; color: rgba(32, 32, 32, 0.80); font-size: 14px; font-family: Inter; font-weight: 400; line-height: 12.32px; word-wrap: break-word">State</div>
                                    <div style="width: 745px; color: #202020; font-size: 16px; font-family: Inter; font-weight: 400; line-height: 14.08px; word-wrap: break-word">${order.state}</div>
                                  </div>
                                  <div style="height: 63px; justify-content: flex-start; align-items: flex-start; gap: 29px; display: inline-flex">
                                    <div style="color: rgba(32, 32, 32, 0.80); font-size: 14px; font-family: Inter; font-weight: 400; line-height: 12.32px; word-wrap: break-word">Additional Information</div>
                                    <div style="width: 745px; height: 63px; color: #202020; font-size: 16px; font-family: Inter; font-weight: 400; line-height: 21.12px; word-wrap: break-word">${order.add_info}</div>
                                  </div>
                                </div>
                              </div>
                              <div style="width: 930px; height: 54px; padding: 10px; flex-direction: column; justify-content: space-between; align-items: flex-start; display: inline-flex">
                                <div style="align-self: stretch; justify-content: space-between; align-items: flex-start; display: inline-flex">
                                  <div style="width: 212px; padding-left: 20px; padding-right: 20px; padding-top: 10px; padding-bottom: 10px; background: white; justify-content: center; align-items: center; gap: 10px; display: flex">
                                    <div style="width: 28px; height: 28px; padding: 3.50px; justify-content: center; align-items: center; display: flex">
                                      <div style="width: 21px; height: 21px; background: #202020"></div>
                                    </div>
                                    <div style="color: #202020; font-size: 18px; font-family: Inter; font-weight: 500; line-height: 15.84px; word-wrap: break-word">${order.phone}</div>
                                  </div>
                                  <div style="width: 180px; height: 50px; padding-left: 20px; padding-right: 20px; padding-top: 10px; padding-bottom: 10px; background: white; border-radius: 60px; border: 1px #202020 solid; justify-content: center; align-items: center; gap: 10px; display: flex">
                                    <div style="color: #202020; font-size: 18px; font-family: Inter; font-weight: 500; line-height: 15.84px; word-wrap: break-word">Send Email</div>
                                  </div>
                                </div>
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
        }, 
    });
});