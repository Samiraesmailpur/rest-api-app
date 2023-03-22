const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("../helpers");
const Joi = require("joi");

const emailRegex =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const userSchema = new Schema(
  {
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      match: emailRegex,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    token: {
      type: String,
      default: null,
    },
    avatarURL: {
      type: String,
      required: true,
    },
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      required: [true, "Verify token is required"],
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.post("save", handleMongooseError);

const schema = Joi.object({
  password: Joi.string().min(4).required(),
  email: Joi.string().pattern(emailRegex).required(),
  subscription: Joi.string().default("starter"),
});
const updateSchema = Joi.object({
  subscription: Joi.string().default("starter").required(),
});

const emailSchema = Joi.object({
  email: Joi.string().pattern(emailRegex).required(),
});

const schemas = {
  schema,
  updateSchema,
  emailSchema,
};

const User = model("user", userSchema);

module.exports = { User, schemas };
