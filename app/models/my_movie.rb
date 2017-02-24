class MyMovie < ApplicationRecord
  belongs_to :user
  belongs_to :movie
  belongs_to :format

  validates_presence_of   :movie, :user, :format 
  validates_uniqueness_of :movie, scope: [:user, :format]

  validates :rating, numericality: {
    greater_than: 0,
    less_than_or_equal_to: 5,
    allow_nil: true
  }
end
