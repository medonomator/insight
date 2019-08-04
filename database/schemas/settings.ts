import * as Mongoose from 'mongoose';

const settingsSchema = new Mongoose.Schema({
  allCategories: [
    {
      name: {
        type: String,
      },
      machineName: {
        type: String,
      },
    },
  ],
});

Mongoose.set('debug', true);

export const settings = Mongoose.model('settings', settingsSchema);
