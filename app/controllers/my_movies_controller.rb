# Controller for CRUD operations on a user's movie inventory
class MyMoviesController < ApplicationController

  # GET /my_movies
  def index
    my_movies = []
    movies = MyMovie.all.includes(:movie, :format).where(user: current_user)
    movies.each{|my_movie|
      my_movies << my_movie.friendly_format
    }
    render json: my_movies
  end

  # POST /my_movies
  def create
    @my_movie = MyMovie.new(my_movie_params)

    if @my_movie.save
      render json: { status: :created, data: @my_movie.friendly_format }
    else
      render json: @my_movie.errors, status: :unprocessable_entity
    end
  end

  private
    # Never trust parameters from the scary internet, only allow the white list through.
    def my_movie_params
     new_movie  = params.require(:my_movie).
                         permit(:rating, :format_id, movie: [:id, :title])
     if new_movie.permitted?
       assemble_for_db(new_movie)
     end
    end

    def assemble_for_db(params)
      {
        rating:    params[:rating],
        format_id: params[:format_id],
        user_id:   current_user.id,
        movie_id:  determine_movie(params[:movie])
      }
    end

    def determine_movie(movie_data)
      return nil unless movie_data
      if (movie_data[:id])
        movie_data[:id]  
      elsif (movie_data[:title])
        title = movie_data[:title]
        # OPTIMIZE: user should not be adding this information,
        # will need admin scrub processing
        Movie.where('lower(title) = ?', title.downcase).first_or_create(title: title, release_year: 2099, length: 1).id
      end
    end
end
