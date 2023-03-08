const express = require("express");
const ctrl = require("../../controllers/contacts");
const { isValidId, authenticate, validateBody } = require("../../middlewares");
const { schemas } = require("../../models/contact");

const router = express.Router();

router.get("/", authenticate, ctrl.listContacts);

router.get("/:contactId", authenticate, isValidId, ctrl.getContactById);

router.post("/", authenticate, validateBody(schemas.schema), ctrl.addContact);

router.delete("/:contactId", authenticate, isValidId, ctrl.removeContact);

router.put(
  "/:contactId",
  authenticate,
  validateBody(schemas.updateContactSchema),
  isValidId,
  ctrl.updateContact
);

router.patch(
  "/:contactId/favorite",
  authenticate,
  validateBody(schemas.updateSchema),
  isValidId,
  ctrl.updateStatusContact
);

module.exports = router;
