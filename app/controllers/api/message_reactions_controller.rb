class Api::MessageReactionsController < ApplicationController
  skip_before_action :verify_authenticity_token
  # before_action :set_message_reaction, only: %i[ show edit update destroy ]

  # GET /message_reactions or /message_reactions.json
  def index
    @message_reactions = MessageReaction.all
  end

  # GET /message_reactions/1 or /message_reactions/1.json
  def show
  end

  # GET /message_reactions/new
  def new
    @message_reaction = MessageReaction.new
  end

  # GET /message_reactions/1/edit
  def edit
  end

  # POST /message_reactions or /message_reactions.json
  def create
    message_reaction = MessageReaction.new({content: params[:reaction], message_id: params[:messageId].to_i, user_id: 1})

    if message_reaction.save
      updatedMessage = Message.find(params[:messageId]) 
      ActionCable.server.broadcast(
      "message_#{params[:messageId]}",
      newMessageReaction: message_reaction,
      updatedMessage: updatedMessage,
    )
    end
  end

  # PATCH/PUT /message_reactions/1 or /message_reactions/1.json
  def update
    respond_to do |format|
      if @message_reaction.update(message_reaction_params)
        format.html { redirect_to @message_reaction, notice: "Message reaction was successfully updated." }
        format.json { render :show, status: :ok, location: @message_reaction }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @message_reaction.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /message_reactions/1 or /message_reactions/1.json
  def destroy
    @message_reaction.destroy
    respond_to do |format|
      format.html { redirect_to message_reactions_url, notice: "Message reaction was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_message_reaction
      @message_reaction = MessageReaction.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def message_reaction_params
      params.require(:message_reaction).permit(:type, :message_id, :user_id)
    end
end
