$(document).on('turbolinks:load', function(){
  function buildHTML(message){
    var chatMessage = (message.content)? `${message.content}` : "";
    var chatImage = (message.image)? `<img src="${message.image}">` : "";
    var html = `<div class="message" data-id="${message.id}">
                  <div class="message-top">
                    <p class="message-top__name">${message.user_name}</p>
                    <p class="message-top__date">${message.date}</p>
                  </div>
                  <div class ="message-bottom">
                    ${chatMessage}
                    ${chatImage}
                  </div>
                </div>`;
  return html;
  }

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })

    .done(function(data){
      if (data.id != null){
        var html = buildHTML(data);
        $('.chat-body').append(html);
        $('#new_message')[0].reset();
        $('.form__send-btn').prop('disabled', false);
        $('.chat-body').animate({scrollTop: $('.chat-body')[0].scrollHeight},"fast");
      }else{
        alert('error')
      }
    })
    .fail(function() {
      alert('error');
    })
  });

var interval = setInterval(function(){
    var presentMessageId = $('.message').last().attr('data-id')
    var presentHTML = window.location.href
    if (presentHTML.match(/\/groups\/\d+\/messages/)) {
    $.ajax ({
      url: presentHTML,
      type: 'GET',
      data: {id: presentMessageId},
      dataType: 'json',
      processData: false,
      contentType: false
           })

    .done(function(json){
    var insertHTML ="";
    json.forEach(function(message){
      if (message.id > presentMessageId){
        insertHTML += buildHTML(message);
        $messages = $('.chat-body');
        $messages.append(insertHTML);
        $messages.animate({scrollTop: $messages[0].scrollHeight}, 'fast');
      }
    });
  })

    .fail(function(data){
        alert('error')
      });
     } else {
      clearInterval(interval)
    }
  },5000);
});
