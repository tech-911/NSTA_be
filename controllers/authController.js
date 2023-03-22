const { User } = require("../model/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {
  registerValidationMethod,
  loginValidationMethod,
  changePasswordValidationMethod,
  editUserInfoValidationMethod,
} = require("../validations/validation");

const index = (req, res) => {
  console.log("a get request was made to /");
  res.send("hellow world from the router flile");
};

const register = async (req, res) => {
  const { name, email, password, role } = req.body;
  //===============validation===============

  const { error, value } = registerValidationMethod(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  //===============Checking existence of user===============

  const userExist = await User.findOne({ email: email });

  if (userExist) return res.status(400).send("Email already exists");

  //=====================hash password========================
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  //======================saving data on DB=======================
  try {
    const user = await new User({ name, email, hashedPassword, role });
    const saveValue = await user.save();
    console.log(saveValue);
    await res.send(saveValue);
  } catch (err) {
    console.log(err);
    res.status(404).send(err);
  }

  //===============create new user on DB===============
};

const admin_register = async (req, res) => {
  const { name, email, password, role } = req.body;
  //===============validation===============

  const { error, value } = registerValidationMethod(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  //===============Checking existence of user===============

  const userExist = await User.findOne({ email: email });

  if (userExist) return res.status(400).send("Email already exists");

  //=====================hash password========================
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  //======================saving data on DB=======================
  try {
    const user = await new User({ name, email, hashedPassword, role });
    const saveValue = await user.save();
    console.log(saveValue);
    await res.send(saveValue);
  } catch (err) {
    console.log(err);
    res.status(404).send(err);
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  //===============validation===============

  const { error, value } = loginValidationMethod(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  //===============Checking existence of user by email===============

  let user = await User.findOne({ email: email });

  if (!user) return res.status(400).send("Email doesnt exists");

  //===============Comapring user input password with that registered on the database===============
  const validPassword = await bcrypt.compare(password, user.hashedPassword);
  if (!validPassword) return res.status(400).send("Invalid password");

  // Creating jwt token
  const jwtSecretKey = process.env.TOKEN_SECRET;
  const token = jwt.sign({ _id: user._id }, jwtSecretKey);
  let newUser = { user, token };
  res.header("auth-token", token).send(newUser);
};

const change_password = async (req, res) => {
  //=====================get user request data========================

  const { email, old_password, new_password } = req.body;

  //===================Validate user request object===========================

  const { error, value } = changePasswordValidationMethod(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //=====================get user object from db for specified user email========================

  let user = await User.findOne({ email: email });
  if (!user) return res.status(400).send("unAuthorized user");

  //====================check if the old password is correct========================

  const validPassword = await bcrypt.compare(old_password, user.hashedPassword);
  if (!validPassword) return res.status(400).send("Invalid password");

  //=====================hash password========================
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(new_password, salt);

  //======================saving new password to DB=======================

  User.updateOne({ email: email }, { hashedPassword: hashedPassword })
    .then((result) => {
      console.log(result);
      res.send("password changed");
    })
    .catch((error) => {
      console.error(error);
      res.status(400).send(error);
    });
};

const edit_user_info = async (req, res) => {
  //=====================get user request data========================

  const { name, email, _id } = req.body;

  //===================Validate user request object===========================

  const { error, value } = editUserInfoValidationMethod(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //===================check and update user db===========================
  try {
    const response = await User.updateMany(
      { _id: _id },
      { $set: { name: name, email: email } }
    );
    console.log(response);
    res.send(response);
  } catch (err) {
    return res.status(400).send(err);
  }

  //===================check and update bookings db===========================
};

module.exports = {
  index,
  register,
  admin_register,
  login,
  change_password,
  edit_user_info,
};
