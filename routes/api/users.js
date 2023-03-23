const express = require("express");
const ctrl = require("../../controllers/users");
const { authenticate, validateBody, upload } = require("../../middlewares");
const { schemas } = require("../../models/user");

const router = express.Router();

router.post("/signup", validateBody(schemas.schema), ctrl.register);
router.get("/verify/:verificationToken", ctrl.verifyEmail);
router.post(
  "/verify",
  validateBody(schemas.emailSchema),
  ctrl.resendVerifyEmail
);
router.post("/login", validateBody(schemas.schema), ctrl.login);
router.get("/current", authenticate, ctrl.getCurrent);
router.post("/logout", authenticate, ctrl.logout);
router.patch(
  "/",
  validateBody(schemas.updateSchema),
  authenticate,
  ctrl.updateSubscription
);
router.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  ctrl.updateAvatar
);

module.exports = router;
