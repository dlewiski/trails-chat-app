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
    render json: chatroom, include: :messages
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
    respond_to do |format|
      if @chatroom.update(chatroom_params)
        format.html { redirect_to @chatroom, notice: "Chatroom was successfully updated." }
        format.json { render :show, status: :ok, location: @chatroom }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @chatroom.errors, status: :unprocessable_entity }
      end
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
