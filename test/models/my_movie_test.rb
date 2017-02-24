require 'test_helper'

class MyMovieTest < ActiveSupport::TestCase
  def setup
    @my_movie = MyMovie.new(movie: movies(:jedi),
                            format: formats(:dvd),
                            user: users(:luke))
  end
  test 'should require a user' do
    assert @my_movie.valid?
    @my_movie.user = nil
    assert_not @my_movie.valid?
  end
  test 'should require a movie' do
    assert @my_movie.valid?
    @my_movie.movie = nil
    assert_not @my_movie.valid?
  end
  test 'should require a format' do
    assert @my_movie.valid?
    @my_movie.format = nil
    assert_not @my_movie.valid?
  end
  test 'should restrict rating to nil or 1 - 5' do
    assert_nil @my_movie.rating
    assert @my_movie.valid?
    (1..5).each{|rating|
      @my_movie.rating = rating
      assert @my_movie.valid?
    }
    (6..10).each{|rating|
      @my_movie.rating = rating
      assert_not @my_movie.valid?
      assert_equal(
        'must be less than or equal to 5',
        @my_movie.errors[:rating].first
      )
    }
  end
  test 'should restrict the user from adding the same movie / format combo' do
    assert_equal('The Empire Strikes Back', users(:luke).my_movies.first.movie.title)
    @my_movie.movie = movies(:empire)
    assert_not @my_movie.valid?
    @my_movie.save
    assert_equal(
      ['The Empire Strikes Back'],
      users(:luke).my_movies.map{|my_movie| my_movie.movie.title}
    )
  end
end
