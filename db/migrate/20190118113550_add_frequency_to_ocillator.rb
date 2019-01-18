class AddFrequencyToOcillator < ActiveRecord::Migration[5.2]
  def change
    add_column :oscillators, :frequency, :integer, default: 440
  end
end
