import mongoose, { Schema } from "mongoose";

const postSchema = new Schema(
  {
    title: {
      type: String
    },
    body: {
      type: String
    },
    userId: {
      type: String
    }
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (obj, ret) => {
        delete ret._id;
      }
    }
  }
);

postSchema.methods = {
  view(full) {
    const view = {
      // simple view
      id: this.id,
      title: this.title,
      body: this.body,
      userId: this.userId,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };

    return full
      ? {
          ...view
          // add properties for a full view
        }
      : view;
  }
};

const model = mongoose.model("Post", postSchema);

export const schema = model.schema;
export default model;
