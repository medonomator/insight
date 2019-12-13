import * as Mongoose from 'mongoose';

const authorsSchema = new Mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  machineName: {
    type: String,
    required: true,
    unique: true,
  },
});

export const authors = Mongoose.model('authors', authorsSchema);