require 'test_helper'

class UserTest < ActiveSupport::TestCase

  def setup
    OmniAuth.config.test_mode = true
  end

  test 'should sign in with Google, existing user' do
    google = OmniAuth::AuthHash.new({
      provider: 'google_oauth2',
      uid: '1138',
      info: {
        first_name: 'Luke',
        last_name:  'Skywalker',
        email:      'luke@starwars.com'
      }
    })
    assert_equal(1, User.count)
    User.find_for_oauth(google)
    assert_equal('luke@starwars.com', User.first.email)
  end

  test 'should sign in with Google, first time user' do
    google = OmniAuth::AuthHash.new({
      provider: 'google_oauth2',
      uid: '123456',
      info: {
        first_name: 'Leia',
        last_name:  'Organa',
        email:      'leia@starwars.com'
      }
    })
    assert_equal(1, User.count)
    User.find_for_oauth(google)
    assert_equal(2, User.count)
    leia = User.last
    assert_equal('leia@starwars.com', leia.email)
    assert_equal('123456', leia.uid)
  end

  test 'should only allow approved providers such as Google' do
    twitter = OmniAuth::AuthHash.new({
      provider: 'twitter',
      uid: '0xDEADBEEF',
      info: {
        first_name: 'Darth',
        last_name:  'Vader',
        email:      'vader@starwars.com',
        nickname:   'Dark Lord of the Sith'
      }
    })
    assert_equal(1, User.count)
    User.find_for_oauth(twitter)
    assert_equal(1, User.count)
  end
end
