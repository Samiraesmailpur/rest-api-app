const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("../helpers");
const Joi = require("joi");

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true }
);

contactSchema.post("save", handleMongooseError);

const schema = Joi.object()
  .keys({
    required: Joi.boolean().default(true),
    name: Joi.string().when("required", {
      is: true,
      then: Joi.required(),
      otherwise: Joi.optional(),
    }),
    email: Joi.string().when("required", {
      is: true,
      then: Joi.required(),
      otherwise: Joi.optional(),
    }),
    phone: Joi.number().when("required", {
      is: true,
      then: Joi.required(),
      otherwise: Joi.optional(),
    }),
    favorite: Joi.boolean().default(false),
  })
  .min(2);

const updateSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

const schemas = {
  schema,
  updateSchema,
};

const Contact = model("contact", contactSchema);

module.exports = { Contact, schemas };
