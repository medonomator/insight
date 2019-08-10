import * as Mongoose from 'mongoose';

const usersSchema = new Mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    avatarUrl: {
      type: String,
      default: '',
    },
    role: {
      type: String,
      default: 'user',
    },
    status: {
      type: String,
      default: 'newbie',
    },
    city: {
      type: String,
      default: '',
    },
    activity: {
      type: String,
      default: '',
    },
    interests: {
      type: String,
      default: '',
    },
    about: {
      type: String,
      default: '',
    },
    age: {
      type: Number,
      default: null,
    },
    regDate: {
      type: Date,
      default: Date.now,
    },
    sex: {
      type: String,
      enum: ['male', 'female'],
      default: 'male',
    },
    userId: {
      type: String,
    },
    birthDate: {
      type: String,
      default: '',
    },
  },
  { versionKey: false },
);

export const users = Mongoose.model('users', usersSchema);
