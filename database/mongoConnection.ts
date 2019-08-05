import * as Mongoose from 'mongoose';
Mongoose.Promise = global.Promise;

export function setUpconnection() {
  Mongoose.connect( 'mongodb+srv://medonomator:284378wiz@cluster0-vpios.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true } );
}
