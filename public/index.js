var socket = io('http://localhost:3333');

function renderMessage(message) {
  $('.messages').append('<div class="message"><strong>'+ message.author +'</strong>: ' + message.message + '</div>');
}

socket.on('receivedMessage', function(message) {
  renderMessage(message);
});

socket.on('previousMessages', (messages) => {
  for (message of messages) {
    renderMessage(message);
  }
});

$('#chat').submit(function (e) {

  e.preventDefault();

  var author = $('input[name=username]').val();
  var message = $('input[name=message]').val();

  if(author.length && message.length) {{
    var messageObj = {
      author: author,
      message: message
    };

    renderMessage(messageObj);

    socket.emit('sendMessage', messageObj);

    $('input[name=message]').val('');
  }}
});