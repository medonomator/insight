import * as Mongoose from 'mongoose';

const mainDataSchema = new Mongoose.Schema(
  {
    mainPage: {
      type: Object,
      headerH1: {
        type: String,
      },
      headerText: {
        type: String,
      },
    },
    aphorismPage: {
      type: Object,
      headerH1: {
        type: String,
      },
      headerText: {
        type: String,
      },
    },
    affirmationPage: {
      type: Object,
      headerH1: {
        type: String,
      },
      headerText: {
        type: String,
      },
    },
    materialPage: {
      type: Object,
      headerH1: {
        type: String,
      },
      headerText: {
        type: String,
      },
    },
  },
  { versionKey: false },
);
export const mainData = Mongoose.model('mainData', mainDataSchema);
