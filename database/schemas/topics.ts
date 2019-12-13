import * as Mongoose from 'mongoose';

const topicsSchema = new Mongoose.Schema(
  {
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
  },
  { versionKey: false },
);

export const topics = Mongoose.model('topics', topicsSchema);
