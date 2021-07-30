class CreateMessageReactions < ActiveRecord::Migration[6.1]
  def change
    create_table :message_reactions do |t|
      t.text :type
      t.references :message, null: false, foreign_key: true
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
