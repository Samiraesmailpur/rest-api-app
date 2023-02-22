const contacts = require("../models");
const { HttpError, ctrlWrapper } = require("../helpers");
const Joi = require("joi");

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
  })
  .min(2);

const listContacts = async (req, res) => {
  const result = await contacts.listContacts();
  res.status(200).json(result);
};

const getContactById = async (req, res) => {
  const { contactId } = req.params;
  const result = await contacts.getContactById(contactId);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json(result);
};

const addContact = async (req, res) => {
  const { error } = schema.validate(req.body);
  if (error) {
    throw HttpError(400, error);
  }
  const result = await contacts.addContact(req.body);
  res.status(201).json(result);
};

const removeContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await contacts.removeContact(contactId);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json({ message: "contact deleted" });
};

const updateContact = async (req, res) => {
  const { error } = schema.validate({ required: false, ...req.body });
  if (error) {
    throw HttpError(400, "missing fields");
  }
  const { contactId } = req.params;
  const result = await contacts.updateContact(contactId, req.body);
  if (!result) {
    throw HttpError(404, "Not found");
  }

  res.status(200).json(result);
};

module.exports = {
  listContacts: ctrlWrapper(listContacts),
  getContactById: ctrlWrapper(getContactById),
  addContact: ctrlWrapper(addContact),
  removeContact: ctrlWrapper(removeContact),
  updateContact: ctrlWrapper(updateContact),
};
