class Recipe < ApplicationRecord
  validates :title, :cook_time, :prep_time, :ratings, :author, :image_url, presence: true
  validates :cook_time, :prep_time, numericality: { only_integer: true }
  validates :ratings, numericality: true
  validate :valid_image_url

  has_many :ingredient_data, dependent: :delete_all
  belongs_to :category

  def valid_image_url
    errors.add(:image_url, "must be a valid url") unless (URI.parse image_url rescue nil)
  end
end
