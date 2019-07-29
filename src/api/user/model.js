import crypto from "crypto";
import bcrypt from "bcrypt";
import randtoken from "rand-token";
import mongoose, { Schema } from "mongoose";
import mongooseKeywords from "mongoose-keywords";
import { env } from "../../config";

const roles = ["user", "admin"];

const userSchema = new Schema(
  {
    email: {
      type: String,
      match: /^\S+@\S+\.\S+$/,
      required: true,
      unique: true,
      trim: true,
      lowercase: true
    },
    password: {
      type: String,
      required: true,
      minlength: 6
    },
    username: {
      type: String,
      index: true,
      trim: true
    },
    firstName: {
      type: String,
      trim: true
    },
    lastName: {
      type: String,
      trim: true
    },
    gender: {
      type: String,
      enum: ["male", "female"]
    },
    role: {
      type: String,
      enum: roles,
      default: "user"
    },
    picture: {
      type: String,
      trim: true
    }
  },
  {
    timestamps: true
  }
);

userSchema.path("email").set(function(email) {
  if (!this.picture || this.picture.indexOf("https://gravatar.com") === 0) {
    const hash = crypto
      .createHash("md5")
      .update(email)
      .digest("hex");
    this.picture = `https://gravatar.com/avatar/${hash}?d=identicon`;
  }

  if (!this.username) {
    this.username = email.replace(/^(.+)@.+$/, "$1");
  }

  return email;
});

userSchema.pre("save", function(next) {
  if (!this.isModified("password")) return next();

  /* istanbul ignore next */
  const rounds = env === "test" ? 1 : 9;

  bcrypt
    .hash(this.password, rounds)
    .then(hash => {
      this.password = hash;
      next();
    })
    .catch(next);
});

userSchema.methods = {
  view(full) {
    let view = {};
    let fields = ["id", "username", "picture"];

    if (full) {
      fields = [...fields, "email", "createdAt"];
    }

    fields.forEach(field => {
      view[field] = this[field];
    });

    return view;
  },

  authenticate(password) {
    return bcrypt
      .compare(password, this.password)
      .then(valid => (valid ? this : false));
  }
};

userSchema.statics = {
  roles,

  createFromService({ service, id, email, username, picture }) {
    return this.findOne({
      $or: [{ [`services.${service}`]: id }, { email }]
    }).then(user => {
      if (user) {
        user.services[service] = id;
        user.username = username;
        user.picture = picture;
        return user.save();
      } else {
        const password = randtoken.generate(16);
        return this.create({
          services: { [service]: id },
          email,
          password,
          username,
          picture
        });
      }
    });
  }
};

userSchema.plugin(mongooseKeywords, { paths: ["email", "username"] });

const model = mongoose.model("User", userSchema);

export const schema = model.schema;
export default model;
