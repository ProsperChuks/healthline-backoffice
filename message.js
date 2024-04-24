const token = localStorage.getItem('token');
const user = localStorage.getItem('userid');
let uid = 0;

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
                uid = userData.id;
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

function acceptRequest(id) {
    var endpoint = `https://prosperc40.pythonanywhere.com/chat-requests/`+id;
    $.ajax({
        type : 'PATCH',
        url: endpoint,
        data : {'status': 'a'},
        headers: {
            'Authorization': 'Token ' + token 
        },
        success: function(response) {
            console.log(response);
            location.reload();
        },
        error: function(error) {
            console.log(error);
            location.reload();
        }
    });
}

function rejectRequest(id) {
    var endpoint = `https://prosperc40.pythonanywhere.com/chat-requests/`+id;
    $.ajax({
        type : 'PATCH',
        url: endpoint,
        data : {'status': 'r'},
        headers: {
            'Authorization': 'Token ' + token 
        },
        success: function(response) {
            console.log(response);
            location.reload();
        },
        error: function(error) {
            console.log(error);
            location.reload();
        }
    });
}

function formatTimestamp(timestampString) {
    const date = new Date(timestampString);
    return date.toLocaleString(); // Basic formatting
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
            const chatlistrequest = $('.requests');
            // chatListContainer.empty();
            chatlistrequest.empty();
            chatlistrequest.append("<h6>New Chat Requests</h6>");

            var endpoint = 'https://prosperc40.pythonanywhere.com/chat-requests?status=p'
            $.ajax({
                url: endpoint,
                headers: {
                    'Authorization': 'Token ' + token 
                },
                success: function(response) {
                    response.forEach(function(chatRequest, index) {
                        // Create a new div for the chat request
                        const chatRequestDiv = `                         
                            <div class="friend row" style="cursor: pointer;">
                                <div class="col-10">    
                                    <img src="https://media.istockphoto.com/id/1495088043/vector/user-profile-icon-avatar-or-person-icon-profile-picture-portrait-symbol-default-portrait.jpg?s=612x612&w=0&k=20&c=dhV2p1JwmloBTOaGAtaA3AW1KSnjsdMt7-U_3EZElZ0=" />
                                    <p>
                                        <strong>${chatRequest.customer.name}</strong><br>
                                        <span>${chatRequest.message}</span>
                                    </p>
                                </div>
                                <div class="col-2 button-container">
                                    <button class="but red" onclick="rejectRequest(${chatRequest.id})">&#10005;</button>
                                    <button class="but green" onclick="acceptRequest(${chatRequest.id})">&#10003;</button>
                                </div>
                            </div>`
                    
                        // Append the chat request div to the main div
                        chatlistrequest.append(chatRequestDiv);
                    });
                },
                error: function(error) {
                    console.log(error);
                }
            });
            
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
                                
                                const sessionDiv = `
                                    <div id="room${index}" class="message-frame11712758461" style="cursor: pointer;">
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
                                                <span class="message-text064"><span>${formatTimestamp(last_message.timestamp)}</span></span>
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
                                                <div class="message-frame1171275843">
                                                    <div class="message-frame1171275844">
                                                    <div class="message-frame1171275846">
                                                        <span class="message-text025">${cust_name[0]}</span>
                                                    </div>
                                                    <div class="message-frame11712750501">
                                                        <span class="message-text026">
                                                        <span>${cust_name}</span>
                                                        </span>
                                                    </div>
                                                    </div>
                                                    <span class="dropdown4">
                                                        <img alt="more3463" src="public/external/more3463-cksp.svg" class="message-more" />
                                                        <div id="myDropdown" class="dropdown-content4">
                                                            <p id="del_sel" data-session="${message.session}" style="margin-bottom: 0 !important;">Delete</p>
                                                        </div>
                                                    </span>
                                                </div>
                                                <div class='chatContainerLeft'>
                                                    <div class='messageContainer'>
                                                        <div class='message'>
                                                            ${message.text}
                                                        </div>
                                                        <p>${formatTimestamp(message.timestamp)}</p>
                                                    </div>
                                                </div>
                                                <form class="message-frame1171275852" id="send_text" data-session="${message.session}">
                                                    <div class="message-frame1171275855">
                                                    <div>
                                                        <textarea placeholder="Your Message..." class="textfocus"></textarea>
                                                    </div>
                                                    </div>
                                                    <button type="submit" class="message-button">
                                                    <span class="message-text031"><span>Send</span></span>
                                                    </button>
                                                </form>`);
                                          } else {
                                            // messageDiv = `
                                            //   <!-- Your customer message template here -->
                                            // `;
                                            $('.chat-inner').append(`
                                                <div class="message-frame1171275843">
                                                    <div class="message-frame1171275844">
                                                    <div class="message-frame1171275846">
                                                        <span class="message-text025">${cust_name[0]}</span>
                                                    </div>
                                                    <div class="message-frame11712750501">
                                                        <span class="message-text026">
                                                        <span>${cust_name}</span>
                                                        </span>
                                                    </div>
                                                    </div>
                                                    <span class="dropdown4">
                                                        <img alt="more3463" src="public/external/more3463-cksp.svg" class="message-more" />
                                                        <div id="myDropdown" class="dropdown-content4">
                                                            <p id="del_sel" data-session="${message.session}" style="margin-bottom: 0 !important;">Delete</p>
                                                        </div>
                                                    </span>
                                                </div>
                                                <div class='chatContainer'>
                                                    <div class='userImage'>
                                                        ${message.sender.name[0]}
                                                    </div>
                                                    <div class='messageContainer'>
                                                        <div class='message'>
                                                            ${message.text}
                                                        </div>
                                                        <p>${formatTimestamp(message.timestamp)}</p>
                                                    </div>
                                                </div>
                                                <form class="message-frame1171275852" id="send_text" data-session="${message.session}">
                                                    <div class="message-frame1171275855">
                                                    <div>
                                                        <textarea placeholder="Your Message..." class="textfocus"></textarea>
                                                    </div>
                                                    </div>
                                                    <button type="submit" class="message-button">
                                                    <span class="message-text031"><span>Send</span></span>
                                                    </button>
                                                </form>`
                                            );
                                          }
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
    $(document).on('click', '#del_sel', function() {
        var session = $(this).data('session');
        var endpoint = `https://prosperc40.pythonanywhere.com/chat-sessions/${session}`

        $.ajax({
            url: endpoint,
            type : 'DELETE',
            headers: {
                'Authorization': 'Token ' + token,
            },
            success: function(response) {
                console.log(response);
                location.reload();
            },
            error: function(error) {
                console.log(error);
                location.reload();
            }
        });

    });
    $(document).on('submit', '#send_text', function(e) {
        e.preventDefault();  // Prevent the form from being submitted normally                                        
        var messagen = $(this).find('.textfocus').val();
        var session = $(this).data('session');
        var endpoint = 'https://prosperc40.pythonanywhere.com/chat-messages'                         
        
        // You can add your AJAX call or other code here to send the message
        const formData = new FormData();
        formData.append('text', messagen); 
        formData.append('content_type', '9');
        formData.append('object_id', uid.toString());
        formData.append('session', session.toString());

        $.ajax({
            url: endpoint,
            type : 'POST',
            data : formData,
            headers: {
                'Authorization': 'Token ' + token,
            },
            processData: false,
            contentType: false,
            success: function(response) {
                console.log(response);
                location.reload();
            },
            error: function(error) {
                console.log(error);
                location.reload();
            }
        });

        $('.textfocus').val('');  // Clear the textarea
    });
});