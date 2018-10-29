json.user_name @message.user.name
json.image     @message.image.url
json.content   @message.content
json.date      @message.created_at.strftime("%Y/%m/%d %H:%M ")
json.group_id  @message.group.id
json.user_id    @message.user.id
