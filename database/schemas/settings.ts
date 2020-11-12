import * as Mongoose from "mongoose";

const settingsSchema = new Mongoose.Schema({
  allCategories: [
    {
      name: {
        type: String,
      },
      machineName: {
        type: String,
      },
    },
    {
      versionKey: false,
    },
  ],
  allAuthors: [
    {
      name: {
        type: String,
      },
      machineName: {
        type: String,
      },
    },
    {
      versionKey: false,
    },
  ],
});

export const settings = Mongoose.model("settings", settingsSchema);
