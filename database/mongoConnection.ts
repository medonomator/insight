import * as Mongoose from 'mongoose';

export function setUpconnection() {
  Mongoose.connect('mongodb://51.15.245.239/software', { useNewUrlParser: true });
}
