class AddUserIndexToChatroom < ActiveRecord::Migration[6.1]
  def change
    add_index(:chatrooms, :user_id, name: 'index_chatroom_on_user_id')
  end
end
