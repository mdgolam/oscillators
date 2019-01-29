class AddWaveToOscillators < ActiveRecord::Migration[5.2]
  def change
    add_column :oscillators, :wave, :string, default: "square"
  end
end
