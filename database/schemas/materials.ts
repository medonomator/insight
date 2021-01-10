import * as Mongoose from "mongoose";

const materialsSchema = new Mongoose.Schema(
  {
    name: {
      type: String,
      default: [],
    },
    description: {
      type: String,
      required: true,
    },
    tags: [],
    websiteUrl: {
      type: String,
      default: "",
    },
    youtubeUrl: {
      type: String,
      default: "",
    },
    audioBooks: {
      type: String,
      default: "",
    },
    books: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
    versionKey: false,
  }
);

export const materials = Mongoose.model("materials", materialsSchema);
