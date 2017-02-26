require 'test_helper'

class MovieTest < ActiveSupport::TestCase
  def setup
    @movie = Movie.new(title: 'Star Wars', length: 125, release_year: 1977)
  end

  test 'should not allow duplicate entries by title' do
    assert @movie.save
    new_movie = Movie.new(title: 'star wars', length: 125, release_year: 1977)
    assert_not new_movie.valid?
    assert_equal 'has already been taken',
                  new_movie.errors['title'].join
  end

  test 'should require a title' do
    assert @movie.valid?
    @movie.title = nil
    assert_not @movie.valid?
  end

  test 'should require a title with at least 1 character' do
    assert @movie.valid?
    @movie.title = ''
    assert_not @movie.valid?
    @movie.title = 'A'
    assert @movie.valid?
  end

  test 'should limit a title to 50 characters' do
    assert @movie.valid?
    @movie.title = 'Super long movie title with an unrealistic long name'
    assert_not @movie.valid?
    assert_equal 'is too long (maximum is 50 characters)',
                  @movie.errors['title'].join
  end

  test 'should require a length' do
    assert @movie.valid?
    @movie.length = nil
    assert_not @movie.valid?
  end

  test 'should require a length greater than 0' do
    assert @movie.valid?
    @movie.length = 0
    assert_not @movie.valid?
    @movie.length = 120
    assert @movie.valid?
  end

  test 'should require a length less than 500' do
    assert @movie.valid?
    @movie.length = 500
    assert_not @movie.valid?
    assert_equal 'must be less than 500',
                  @movie.errors['length'].join
  end
  
  test 'should require a release_year' do
    assert @movie.valid?
    @movie.release_year = nil
    assert_not @movie.valid?
  end

  test 'should require a release_year greater than 1800' do
    assert @movie.valid?
    @movie.release_year = 1800
    assert_not @movie.valid?
    assert_equal 'must be greater than 1800',
                  @movie.errors['release_year'].join
    @movie.release_year = 1875
    assert @movie.valid?
  end

  test 'should require a release_year less than 2100' do
    assert @movie.valid?
    @movie.release_year = 2100
    assert_not @movie.valid?
    assert_equal 'must be less than 2100',
                  @movie.errors['release_year'].join
    @movie.release_year = 1977
    assert @movie.valid?
  end
end
