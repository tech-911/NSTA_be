const express = require("express");
const router = express.Router();
const verify = require("../verification/verifyToken");
const {
  index,
  register,
  login,
  admin_register,
  change_password,
} = require("../controllers/authController");

router.get("/", index);
router.post("/register", register);
router.post("/admin_register", verify, admin_register);
router.post("/login", login);
router.put("/changepassword", change_password);

module.exports = router;
