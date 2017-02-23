class Format < ApplicationRecord
  validates :name,
    inclusion: { 
      in:      %w[DVD VHS Streaming],
      message: "%{value} is not a valid format"
    }
end
