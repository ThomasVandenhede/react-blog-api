import mongoose, { Schema } from "mongoose";

const friendRequestSchema = new Schema(
  {
    from: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    to: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected"],
      default: "pending"
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
