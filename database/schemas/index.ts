import mongoose from "mongoose";

const users = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  avatarUrl: {
    type: String,
    default: ''
  },
  role: {
    type: String,
    default: 'user'
  },
  status: {
    type: String,
    default: ''
  },
  city: {
    type: String,
    default: ''
  },
  activity: {
    type: String,
    default: ''
  },
  interests: {
    type: String,
    default: ''
  },
  about: {
    type: String,
    default: ''
  },
  age: {
    type: Number,
    default: null
  },
  regDate: {
    type: Date,
    default: Date.now
  },
  options: {
    enableKeys: true,
    secretName: 'secretName',
    secretAge: 324,
    arr: [1, 2, 3, 4, 5],
    arrObje: [
      {
        firstName: 'first',
        lastName: 'second'
      },
      {
        firstName: 'Dasha',
        lastName: 'Sonya'
      },
    ],
    stock: {
      velosity: 'keksik',
      majority: 'large'
    }
  }
}, { versionKey: false });

export const usersSchema = mongoose.model("usersSchema", users);