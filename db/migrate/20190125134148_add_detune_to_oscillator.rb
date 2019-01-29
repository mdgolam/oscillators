class AddDetuneToOscillator < ActiveRecord::Migration[5.2]
  def change
    add_column :oscillators, :detune, :integer, default: 0
  end
end
