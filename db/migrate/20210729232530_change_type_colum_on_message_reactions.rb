class ChangeTypeColumOnMessageReactions < ActiveRecord::Migration[6.1]
  def change
    change_column :message_reactions, :type, :string
  end
end
