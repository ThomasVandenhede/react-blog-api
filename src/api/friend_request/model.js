import mongoose, { Schema } from "mongoose";

const friendRequestSchema = new Schema(
  {
    from: {
      type: String
    },
    to: {
      type: String
    },
    status: {
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

friendRequestSchema.methods = {
  view(full) {
    const view = {
      // simple view
      id: this.id,
      from: this.from,
      to: this.to,
      status: this.status,
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

const model = mongoose.model("FriendRequest", friendRequestSchema);

export const schema = model.schema;
export default model;
