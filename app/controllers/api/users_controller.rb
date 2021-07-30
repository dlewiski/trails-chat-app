class Api::UsersController < ApplicationController
  # before_action :set_user, only: %i[ show edit update destroy ]
  skip_before_action :verify_authenticity_token

  def index
    token = request.headers['Authentication']
    payload = JWT.decode(token, 'chatapp')
    user = User.find(payload[0]['user_id'])
    if user
        render json: user
    else 
        render json: { message: 'Error', user: 'Could not get user from token' }
    end
  end

  # GET /users/1 or /users/1.json
  def show
    # token = request.headers['Authentication'].split(' ')[1]
    # payload = JWT.decode(token)
    # user = User.find(payload['user_id'])
    # if user
    #     render json: user
    # else 
    #     render json: { message: 'Error', user: 'Could not get user from token' }
    # end
  end

  # GET /users/new
  def new
    @user = User.new
  end

  # GET /users/1/edit
  def edit
  end

  # POST /users or /users.json
  def create
    user = User.new(username: params[:username])
    if user.save
        payload = {'user_id': user.id}
        token = JWT.encode(payload, 'chatapp')
        render json: {
            user: user,
            token: token
        }
    else 
        render json: { message: 'There was an error creating your account' }
    end
  end

  # PATCH/PUT /users/1 or /users/1.json
  def update
    respond_to do |format|
      if @user.update(user_params)
        format.html { redirect_to @user, notice: "User was successfully updated." }
        format.json { render :show, status: :ok, location: @user }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @user.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /users/1 or /users/1.json
  def destroy
    @user.destroy
    respond_to do |format|
      format.html { redirect_to users_url, notice: "User was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_user
      @user = User.find(params[:id])
    end

    def current_user
      return @current_user if @current_user.present?

      if session[:user_id].present?
        @current_user = User.find(session[:user_id])
      else
        redirect_to action: 'index', status: 401
      end

    end

    # Only allow a list of trusted parameters through.
    def user_params
      params.fetch(:user, {})
    end
end
