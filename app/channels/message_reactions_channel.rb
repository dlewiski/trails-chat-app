class MessageReactionsChannel < ApplicationCable::Channel
  def subscribed
    # stream_from "some_channel"
    stream_from "message_#{params[:messageId]}"
  end

  def receive(data)
    # Returns the data that this channel is sent from send method
    puts("in received method of Message Reactions Channel")
    MessageReactionsChannel.broadcast_to("message_#{params[:messageId]}", data)
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
