class Movie < ApplicationRecord
  validates :title, uniqueness: { case_sensitive: false },
                    length:     { minimum: 1, maximum: 50 }

  validates :length, numericality: { only_integer: true, 
                                     greater_than: 0,
                                     less_than: 500
                                   }

  validates :release_year, numericality: { only_integer: true, 
                                           greater_than: 1800,
                                           less_than: 2100
                                         }
end
