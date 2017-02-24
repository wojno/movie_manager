# Authenticated User model based on default Devise
class User < ApplicationRecord
  has_many :my_movies
  has_many :movies, through: :my_movies
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :trackable, :timeoutable,
         :omniauthable, :omniauth_providers => [:google_oauth2]

  def self.find_for_oauth(access_token)
    data, uid, provider = access_token.info, access_token.uid,
                          access_token.provider
    return nil unless omniauth_providers.include? provider.to_sym
    user = User.where(provider: provider, uid: uid).first
    if user
      return user
    else
      User.create(
        first_name: data["first_name"],
        last_name:  data["last_name"],
        email:      data["email"],
        provider:   provider,
        uid:        uid
      )
    end
  end
end
