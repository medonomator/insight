import * as Mongoose from 'mongoose';

const test = Mongoose.Schema({
  initials: {
    type: String,
    required: true,
    unique: true,
  },
  inc: {
    type: Number,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  text: {
    type: String,
  },
});
Mongoose.set('debug', true);
test.index({ age: 1 }, { unique: true, background: true, dropDups: true });

export const testSchema = Mongoose.model('testSchema', test);
