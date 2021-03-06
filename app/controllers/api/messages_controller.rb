class Api::MessagesController < ApplicationController
  skip_before_action :verify_authenticity_token
  # before_action :set_message, only: %i[ show edit update destroy ]

  # GET /messages or /messages.json
  def index
    @messages = Message.all
  end

  # GET /messages/1 or /messages/1.json
  def show
  end

  # GET /messages/new
  def new
    @message = Message.new
  end

  # GET /messages/1/edit
  def edit
  end

  # POST /messages or /messages.json
  def create
    message = Message.new({content: params[:message], chatroom_id: params[:chatroomId].to_i, user_id: params[:userId].to_i})

    if message.save
      user = message.user
      message_reactions = message.message_reactions

      message_reactions.map {|reaction| {reaction: reaction, user: reaction.user}}
      updatedChatroom = Chatroom.find(params[:chatroomId]) 
      ActionCable.server.broadcast(
      "chatroom_#{params[:chatroomId]}",
      {
        newMessage: {message: message, user: user},
        messageReactions: message_reactions,
        user: user,
        updatedChatroom: updatedChatroom
      }
    )
    end
  end

  # PATCH/PUT /messages/1 or /messages/1.json
  def update
    respond_to do |format|
      if @message.update(message_params)
        format.html { redirect_to @message, notice: "Message was successfully updated." }
        format.json { render :show, status: :ok, location: @message }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @message.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /messages/1 or /messages/1.json
  def destroy
    @message.destroy
    respond_to do |format|
      format.html { redirect_to messages_url, notice: "Message was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_message
      @message = Message.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def message_params
      params.require(:message).permit(:content, :user_id, :chatroom_id)
    end
end
