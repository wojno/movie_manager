require 'test_helper'

class FormatsControllerTest < ActionDispatch::IntegrationTest

  test "should get a listing of all formats when authenticated" do
    sign_in users(:luke)
    get formats_url
    assert_response :success
    response_content = JSON.parse(response.body)
    assert_equal(3, response_content.length)
    assert_equal(%w[DVD Streaming VHS], response_content.pluck('name'))
  end

  test "should require authentication prior to retriving formats" do
    get formats_url
    assert_response :found
    assert_equal('http://www.example.com/users/sign_in', response.location)
  end
end
