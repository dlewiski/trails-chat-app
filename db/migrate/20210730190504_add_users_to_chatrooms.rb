class AddUsersToChatrooms < ActiveRecord::Migration[6.1]
  def change
    add_column :chatrooms, :user_id, :integer
    add_foreign_key :chatrooms, :users
  end
end
