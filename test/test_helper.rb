require 'simplecov'
SimpleCov.start 'rails'
ENV['RAILS_ENV'] ||= 'test'
require File.expand_path('../../config/environment', __FILE__)
require 'rails/test_help'

class ActiveSupport::TestCase
  # Setup all fixtures in test/fixtures/*.yml for all tests in alphabetical order.
  fixtures :all

  # Add more helper methods to be used by all tests here...
  class ActionDispatch::IntegrationTest
    include Devise::Test::IntegrationHelpers
  end

  def google_login
    OmniAuth.config.test_mode = true
    OmniAuth.config.mock_auth[:default] = OmniAuth::AuthHash.new({
      provider: 'google_oauth2',
      uid: '5555',
      info:  {email: 'han@starwars.com', first_name: 'Han', last_name: 'Solo'}
    })
    get user_google_oauth2_omniauth_callback_path
  end

  def teardown
    OmniAuth.config.mock_auth[:default] = nil
  end
end
