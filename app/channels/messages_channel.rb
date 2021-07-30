class MessagesChannel < ApplicationCable::Channel
  def subscribed
    # stream_from "some_channel"
    stream_from "chatroom_#{params[:chatroomId]}"
  end

  def receive(data)
    # Returns the data that this channel is sent from send method
    puts("in received method of Messages Channel")
    MessagesChannel.broadcast_to("chatroom_#{params[:chatroomId]}", data)
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
    user = User.find(params[:userId])
    user.chatroom_id = nil
    response = {}

    if user.save 
      response = {message: 'Successfully removed user from chatroom', user: user}
    else
      response = {message: 'Error saving update user', user: user}
    end
    
    ActionCable.server.broadcast(
      "chatroom_#{params[:chatroomId]}",
      {
        response: response
      }
    )
  end
end
