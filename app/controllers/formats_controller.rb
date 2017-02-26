class FormatsController < ApplicationController
  def index
    render json: Format.all.order(:name).
      map {|format| { id: format.id, name: format.name }}
  end
end
