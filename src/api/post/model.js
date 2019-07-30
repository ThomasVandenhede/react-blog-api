import mongoose, { Schema } from "mongoose";

const postSchema = new Schema(
  {
    body: {
      type: String
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
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
      body: this.body,
      user: this.user,
      author: this.author,
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
