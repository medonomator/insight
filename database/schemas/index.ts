import * as Mongoose from "mongoose";

const users = Mongoose.Schema({
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
  sex: {
    type: String,
    enum: ['male', 'female'],
    default: 'male',
  },
  birthDate: {
    type: String,
    default: '',
  },
  articleId: Mongoose.Schema.Types.ObjectId,
}, { versionKey: false });

export const usersSchema = Mongoose.model("usersSchema", users);
