class User < ApplicationRecord
  validates :username, presence: true, uniqueness: { case_sensitive: false }, length: { maximum: 105 }
  has_many :messages
  has_many :message_reactions
  has_many :chatrooms, through: :messages
end
