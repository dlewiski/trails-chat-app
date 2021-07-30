class Message < ApplicationRecord
  belongs_to :user
  belongs_to :chatroom
  has_many :message_reactions
end
