import * as Mongoose from 'mongoose';
Mongoose.Promise = global.Promise;

export function setUpconnection() {
  Mongoose.connect( 'mongodb+srv://medonomator:ppcopasen123@cluster0-vpios.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true } );
}
