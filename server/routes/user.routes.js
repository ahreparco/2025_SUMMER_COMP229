import express from "express";
import { create, list, read, update, remove, userByID } from "../controllers/user.controller.js";
import { requireSignin, hasAuthorization } from "../controllers/auth.controller.js"; // Or wherever these are

const router = express.Router();

router.route("/api/users")
  .post(create)
  .get(list);

router.route("/api/users/:userId")
  .get(requireSignin, read)
  .put(requireSignin, hasAuthorization, update)
  .delete(requireSignin, hasAuthorization, remove);

// Param middleware
router.param("userId", userByID);

export default router;
