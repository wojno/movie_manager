require 'test_helper'

class OmniauthCallbacksControllerTest < ActionDispatch::IntegrationTest
  test 'should authenticate the user through Google' do
    get dashboard_index_path
    assert_response :redirect
    follow_redirect!
    google_login

    assert_response :redirect
    assert_equal('http://www.example.com/dashboard', response.location)

    get formats_path
    assert_response :success
  end
end
