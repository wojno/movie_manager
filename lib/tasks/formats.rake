namespace :formats do
  desc "Create initial formats for movie manager"
  task import: :environment do
    %w[VHS DVD Streaming].each{|format|
      Format.find_or_create_by(name: format)
    }
  end
end
