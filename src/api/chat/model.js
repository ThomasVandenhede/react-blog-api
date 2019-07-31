import mongoose, { Schema } from "mongoose";

const chatMessageSchema = new Schema(
  {
    username: { type: String },
    message: { type: String }
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

chatMessageSchema.methods = {
  view(full) {
    const view = {
      // simple view
      id: this.id,
      username: this.username,
      message: this.message,
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

const model = mongoose.model("ChatMessage", chatMessageSchema);

export const schema = model.schema;
export default model;
