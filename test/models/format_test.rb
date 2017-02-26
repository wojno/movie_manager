require 'test_helper'

class FormatTest < ActiveSupport::TestCase
  def setup 
    @format    = Format.new
    @inclusive = %w[DVD VHS Streaming]
  end

  test "should require name to be DVD, VHS or Streaming" do
    assert_not @format.valid?
    @inclusive.each{|format|
      @format.name = format
      assert @format.valid?
    } 
  end
  test "should handle case insensitive values for inclusive values" do
    skip
    @inclusive.each{|format|
      @format.name = format.downcase
      assert @format.valid?
    } 
  end
end
