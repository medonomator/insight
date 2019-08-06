import * as Mongoose from 'mongoose';
Mongoose.Promise = global.Promise;

export function setUpconnection() {
  Mongoose.connect('mongodb://localhost/test', { useNewUrlParser: true });
}
