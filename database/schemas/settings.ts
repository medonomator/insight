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
  allAuthors: [
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

export const settings = Mongoose.model('settings', settingsSchema);
