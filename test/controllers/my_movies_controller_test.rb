require 'test_helper'

class MyMoviesControllerTest < ActionDispatch::IntegrationTest
  setup do
    sign_in users(:luke)
  end

  test 'should return a list of user movies for current_user' do
    get my_movies_url
    assert_response :success
    data = JSON.parse(response.body)
    assert_equal(1, data.size)
    assert_equal('The Empire Strikes Back', data.first['title'])
    assert(data.size < MyMovie.count)
  end

  test 'should require a complete my_movie object for processing' do
    post my_movies_url, params: { my_movie: { format_id: Format.first.id, rating: 4, movie: {} } }
    assert_response :unprocessable_entity
    post my_movies_url, params: { my_movie: { format_id: Format.first.id, rating: 4 } }
    assert_response :unprocessable_entity
    post my_movies_url, params: { my_movie: { rating: 4, movie: {id: Movie.first.id }} }
    assert_response :unprocessable_entity
  end

  test 'should not add a movie already in the users collection' do
    post my_movies_url, params: { my_movie: { format_id: Format.first.id, rating: 4, movie: {id: Movie.first.id} } }
    data = JSON.parse(response.body)
    assert_equal("has already been taken", data['movie'].first)
  end

  test 'should add an existing movie to the account' do
    assert_difference('MyMovie.count') do
      post my_movies_url, params: { my_movie: { format_id: Format.first.id, rating: 4, movie: {id: Movie.last.id}  } }
    end
    body = JSON.parse(response.body)
    assert_equal("created", body['status'])
  end

  test 'it should add a movie even when the title is supplied but record exists' do
    assert_difference('MyMovie.count') do
      post my_movies_url, params: { my_movie: { format_id: Format.first.id, rating: 4, movie: {title: 'return of the JEDI'}  } }
    end
    body = JSON.parse(response.body)
    assert_equal("created", body['status'])
  end

  test 'it should add a new movie to the account' do
    assert_difference('MyMovie.count') do
      post my_movies_url, params: { my_movie: { format_id: Format.first.id, rating: 4, movie: {title: 'Rogue One - A Star Wars Story'}  } }
    end
    body = JSON.parse(response.body)
    assert_equal("created", body['status'])
  end

#  test "should show my_movie" do
#    get my_movie_url(@my_movie)
#    assert_response :success
#  end

#  test "should get edit" do
#    get edit_my_movie_url(@my_movie)
#    assert_response :success
#  end

#  test "should update my_movie" do
#    patch my_movie_url(@my_movie), params: { my_movie: {  } }
#    assert_redirected_to my_movie_url(@my_movie)
#  end

#  test "should destroy my_movie" do
#    assert_difference('MyMovie.count', -1) do
#      delete my_movie_url(@my_movie)
#    end

#    assert_redirected_to my_movies_url
#  end
end
