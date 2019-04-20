import * as Mongoose from 'mongoose';
Mongoose.Promise = global.Promise;

export function setUpconnection() {
  Mongoose.connect('mongodb://localhost/test', { useMongoClient: true });
};

const expense = Mongoose.Schema({
  food: { type: Number },
  household: { type: Number },
  travel: { type: Number },
  clothes: { type: Number },
  rent: { type: Number },
  mobile: { type: Number },
  name: { type: String }
});

// just comment

export const expenseScope = Mongoose.model("expenseScope", expense);