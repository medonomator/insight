import * as Mongoose from 'mongoose';

const aphorismsSchema = new Mongoose.Schema({
  author: {
    type: String,
  },
  body: {
    type: String,
    required: true,
  },
  tags: [
    {
      name: String,
      machineName: String,
    },
  ],
});
Mongoose.set('debug', true);

export const aphorisms = Mongoose.model('aphorisms', aphorismsSchema);
