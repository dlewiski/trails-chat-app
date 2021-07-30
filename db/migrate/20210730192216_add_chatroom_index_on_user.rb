class AddChatroomIndexOnUser < ActiveRecord::Migration[6.1]
  def change
    add_column :users, :chatroom_id, :integer
    add_index :users, :chatroom_id, name: 'index_users_on_chatroom_id'
  end
end
