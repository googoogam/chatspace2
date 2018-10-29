$(function(){

  function buildHTML(message){

    var ChatMessage = (message.content)? `${message.content}` : "";
    var ChatImage = (message.image)? `<img src="${message.image}">` : "";

    var html = `<div class="message">
                  <div class="message-top">
                    <p class="message-top__name">${message.user_name}</p>
                    <p class="message-top__date">${message.date}</p>
                  </div>
                  <div class ="message-bottom">
                    ${ChatMessage}
                    ${ChatImage}
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
  })
})


    .done(function(data){
      var html = buildHTML(data);
      $('.messages').append(html);
      $('#message_content').val('');
      $('#mask__submit').prop("disabled", false);
      $('.messages').animate( {scrollTop: $('chat-main__body').offset().top}, 100 );
      $('#new_message')[0].reset();
    })
