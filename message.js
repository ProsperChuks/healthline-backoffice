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
        // alert('User not logged in.');
        // window.location.href = 'index.html'
    }
}

$(document).ready(function() {
    fetchUserDetails();

    var customer_endpoint = 'https://prosperc40.pythonanywhere.com/customers';
    var session_endpoint = 'https://prosperc40.pythonanywhere.com/chat-sessions';
    var messages_endpoint = 'https://prosperc40.pythonanywhere.com/chat-messages';

    $.ajax({
        url: session_endpoint,
        headers: {
            'Authorization': 'Token ' + token
        },
        success: function(chats) {
            
            const chatListContainer = $('.message-frame11712758531'); 
            chatListContainer.empty(); // Clear existing chats before displaying
            
            chats.forEach((chat, index) => {
                let cust_name = '';
                $.ajax({
                    url: customer_endpoint+'/'+chat.customer,
                    headers: {
                        'Authorization': 'Token ' + token
                    },
                    success: function(customer_data){
                        cust_name = customer_data.name;

                        $.ajax({
                            url: messages_endpoint+'?session='+chat.id,
                            headers: {
                                'Authorization': 'Token ' + token
                            },
                            success: function(res){
                                let last_message = res.slice(-1)[0];
                                const messageTimestamp = new Date(last_message.timestamp);
                                const now = new Date();
                                
                                const sessionDiv = `
                                    <div id="room${index}" class="message-frame11712758461" style="cursor: pointer;">
                                        <img
                                        alt="moreI346"
                                        src="public/external/morei346-obec.svg"
                                        class="message-more2"
                                        />
                                        <div class="message-frame11712758442">
                                        <div class="message-frame11712768611">
                                            <img
                                            alt="Rectangle205593I346"
                                            src="public/external/rectangle205593i346-dmf-200h.png"
                                            class="message-rectangle2055931"
                                            />
                                            <span style="text-transform: uppercase;" class="message-text061">${cust_name[0]}</span>
                                        </div>
                                        <div class="message-frame11712768621">
                                            <div class="message-frame11712750512">
                                            <div class="message-frame117127585202">
                                                <span class="message-text062">
                                                <span style="text-transform: capitalize;">${cust_name}</span>
                                                </span>
                                                <span class="message-text064"><span>2 min</span></span>
                                            </div>
                                            <span class="message-text066">
                                                <span class="d-inline-block text-truncate" style="max-width: 200px;">${last_message.text}</span>
                                            </span>
                                            </div>
                                            <div class="message-group11712749281">
                                            <img
                                                alt="Ellipse3680I346"
                                                src="public/external/ellipse3680i346-o7s-200h.png"
                                                class="message-ellipse36801"
                                            />
                                            <span class="message-text068">3</span>
                                            </div>
                                        </div>
                                        </div>
                                    </div>`
                                chatListContainer.append(sessionDiv);

                                $(`#room${index}`).click(function() {
                                    $.ajax({
                                        url: messages_endpoint+'?session='+chat.id,
                                        headers: {
                                          'Authorization': 'Token ' + token
                                        },
                                        success: function(messages){
                                          // Clear the chatroom container
                                          $('.chat-inner').empty();
                                          
                                          messages.forEach(function(message) {
                                            // Determine the message type
                                            let messageType = message.content_type === 9 ? 'admin' : 'customer';

                                            // Create the message div
                                          let messageDiv;
                                          if (messageType === 'admin') {
                                            // messageDiv = `
                                            //   <!-- Your admin message template here -->
                                            // `;
                                            $('.chat-inner').append(`
                                                <div class='chatContainerLeft'>
                                                    <div class='messageContainer'>
                                                        <div class='message'>
                                                            ${message.text}
                                                        </div>
                                                        <p>${message.timestamp}</p>
                                                    </div>
                                                </div>`);
                                          } else {
                                            // messageDiv = `
                                            //   <!-- Your customer message template here -->
                                            // `;
                                            $('.chat-inner').append(`
                                                <div class='chatContainer'>
                                                    <div class='userImage'>
                                                        ${message.sender.name[0]}
                                                    </div>
                                                    <div class='messageContainer'>
                                                        <div class='message'>
                                                            ${message.text}
                                                        </div>
                                                        <p>${message.timestamp}</p>
                                                    </div>
                                                </div>`
                                            );
                                          }
                                            
                                          // Append the message div to the room container
                                        //   $('.room').append(messageDiv);
                                          });
                                        }
                                    });                                
                                });
                            }
                        });
                    }
                })
            });
        }, 
    });
});