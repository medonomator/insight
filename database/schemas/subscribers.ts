import * as Mongoose from 'mongoose';

const subscribersSchema = new Mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    },
    versionKey: false,
  },
);

export const subscribers = Mongoose.model('subscribers', subscribersSchema);
