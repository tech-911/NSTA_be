const { User } = require("../model/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {
  registerValidationMethod,
  loginValidationMethod,
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

module.exports = {
  index,
  register,
  admin_register,
  login,
};
