class ChangeTypeColumToContentOnMessageReactions < ActiveRecord::Migration[6.1]
  def change
    rename_column :message_reactions, :type, :content 
  end
end
