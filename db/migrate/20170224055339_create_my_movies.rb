class CreateMyMovies < ActiveRecord::Migration[5.0]
  def change
    create_table :my_movies do |t|
      t.references :user, foreign_key: true
      t.references :movie, foreign_key: true
      t.integer :rating, default: nil, null: true
      t.references :format, foreign_key: true

      t.timestamps
    end
  end
end
