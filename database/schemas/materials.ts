import * as Mongoose from 'mongoose';

const materialsSchema = new Mongoose.Schema(
  {
    name: {
      type: String,
    },
    description: {
      type: String,
      required: true,
    },
    tags: [
      {
        name: String,
        machineName: String,
      },
    ],
    websiteUrl: {
      type: String,
    },
    youtubeUrl: {
      type: String,
    },
    audioBooks: {
      type: String,
    },
    books: {
      type: String,
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

export const materials = Mongoose.model('materials', materialsSchema);
