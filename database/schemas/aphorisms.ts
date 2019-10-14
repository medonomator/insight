import * as Mongoose from 'mongoose';

const aphorismsSchema = new Mongoose.Schema(
  {
    author: {
      type: String,
    },
    authorMachineName: {
      type: String,
    },
    body: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    tags: [
      {
        name: String,
        machineName: String,
      },
    ],
  },
  {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    },
  },
);

export const aphorisms = Mongoose.model('aphorisms', aphorismsSchema);
