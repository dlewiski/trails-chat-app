class Api::SessionsController < ApplicationController
  def create
    user = User.find_by(username: params[:session][:username].downcase)
    if user
      session[:user_id] = user.id
      render json: user
    else
        render json: { message: 'Error', authenticated: false }
    end
  end

  def destroy
    session[:user_id] = nil
    render json: { message: 'Session destroyed for user'}
  end
end
