class Category < ApplicationRecord
  has_many :recipes, dependent: :delete_all

  validates :name, presence: true
  validates :name, uniqueness: { case_sensitive: false }
end
