# OmniauthCallback support for multiple oauth authentication providers
class OmniauthCallbacksController < Devise::OmniauthCallbacksController 

  def self.provides_callback_for(provider) 
    class_eval %Q{ 
      def #{provider} 
        @user = User.find_for_oauth(env["omniauth.auth"])
        if @user && @user.persisted?
          sign_in_and_redirect @user, event: :authentication 
        else 
          session = nil
          redirect_to user_session_path
        end 
      end 
    } 
  end 

  # whitelist oauth providers
  [:google_oauth2].each do |provider| 
    provides_callback_for provider 
  end 

end
