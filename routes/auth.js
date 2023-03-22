const express = require("express");
const router = express.Router();
const verify = require("../verification/verifyToken");
const {
  index,
  register,
  login,
  admin_register,
  change_password,
  edit_user_info,
  delete_user_account,
  get_admin_list,
} = require("../controllers/authController");

router.get("/", index);
router.get("/getadminlist", verify, get_admin_list);
router.post("/register", register);
router.post("/admin_register", verify, admin_register);
router.post("/login", login);
router.put("/changepassword", verify, change_password);
router.put("/edituserinfo", verify, edit_user_info);
router.delete("/delete", verify, delete_user_account);

module.exports = router;
