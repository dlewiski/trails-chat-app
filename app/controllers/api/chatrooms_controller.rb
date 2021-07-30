class Api::ChatroomsController < ApplicationController

  # Easy way to skip CSFR check before post actions. Would send CSFR token header if not an example app
  skip_before_action :verify_authenticity_token

  # GET /chatrooms or /chatrooms.json
  def index
    chatrooms = Chatroom.all
    render json: chatrooms
  end

  # GET /chatrooms/1 or /chatrooms/1.json
  def show
    chatroom = Chatroom.find(params[:id]) 
    connected_user = User.find(request.headers['UserId'].to_i)
    connected_user.chatroom_id = chatroom.id
    if connected_user.save
      connected_users = chatroom.users
    end

    messages_with_user = chatroom.messages.map {|message| {message: message, user: message.user}}

    chatroom_with_messages = {chatroom: chatroom, messages: messages_with_user, connectedUsers: connected_users}

     ActionCable.server.broadcast(
      "chatroom_#{params[:id]}",
      {
        connectedUser: connected_user
      }
    )
    
    render json: chatroom_with_messages
  end

  # POST /chatrooms or /chatrooms.json
  def create
    chatroom = Chatroom.new({name: params[:name]})
    chatrooms = Chatroom.all


    if chatroom.save
      ActionCable.server.broadcast(
      "chatroom_channel",
       {allChatrooms: chatrooms, newChatroom: chatroom})
    end
  end

  # PATCH/PUT /chatrooms/1 or /chatrooms/1.json
  def update
    user = User.find(request.headers['UserId'])
    user.chatroom_id = nil

    if user.save 
      render json: {message: 'Successfully removed user from chatroom', user: user}
    else
      render json: {message: 'Error saving update user', user: user}
    end
  end

  # DELETE /chatrooms/1 or /chatrooms/1.json
  def destroy
    @chatroom.destroy
    respond_to do |format|
      format.html { redirect_to chatrooms_url, notice: "Chatroom was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_chatroom
      @chatroom = Chatroom.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    # def chatroom_params
    #   params.require(:chatroom).permit(:name)
    # end
end
