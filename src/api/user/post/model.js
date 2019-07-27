import mongoose, { Schema } from 'mongoose'

const userPostSchema = new Schema({
  title: {
    type: String
  },
  author: {
    type: String
  },
  content: {
    type: String
  },
  timestamp: {
    type: String
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

userPostSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      title: this.title,
      author: this.author,
      content: this.content,
      timestamp: this.timestamp,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('UserPost', userPostSchema)

export const schema = model.schema
export default model
