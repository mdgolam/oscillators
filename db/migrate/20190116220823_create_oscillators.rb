class CreateOscillators < ActiveRecord::Migration[5.2]
  def change
    create_table :oscillators do |t|
      t.string :title

      t.timestamps
    end
  end
end
