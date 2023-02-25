const { Booking } = require("../model/Booking");
const { bookingValidation } = require("../validations/bookingValidation");
const { User } = require("../model/User");

const CreateBooking = async (req, res) => {
  const status = "pending";
  const {
    name,
    email,
    destination,
    passangers_number,
    time,
    date,
    car_type,
    user_id,
  } = req.body;

  //===============validation===============
  const { error, value } = bookingValidation(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  //===============Checking if user_id exist=====================

  await User.findOne({ _id: user_id }).catch((err) => {
    if (err) return res.status(400).send("Invalid user_id! Re-register");
  });

  // if (!user) return res.status(400).send("user_id not found! re-register");

  //======================saving data on DB=======================
  try {
    const user = await new Booking({
      name,
      email,
      destination,
      passangers_number,
      time,
      date,
      car_type,
      status,
      user_id,
    });
    const saveValue = await user.save();
    console.log(saveValue);
    await res.send(saveValue);
  } catch (err) {
    console.log(err);
    res.status(404).send(err);
  }
};
const GetPendingBooking = async (req, res) => {
  Booking.find({ status: "pending" }, (err, docs) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.send(docs);
    }
  });
};
const GetAllBookingbyStatus = async (req, res) => {
  const { status } = req.body;
  Booking.find({ status: status }, (err, docs) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.send(docs);
    }
  });
};

const GetBooking = async (req, res) => {
  Booking.find({}, (err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).send(err);
    } else {
      console.log(docs);
      res.send(docs);
    }
  });
};
const GetNumberofUsers = async (req, res) => {
  const { user_type } = req.body;
  User.countDocuments({ role: user_type }, (err, count) => {
    if (err) return res.status(400).send(err);
    res.send({ count });
  });
};
const GetNumberofUsersRequest = (req, res) => {
  Booking.countDocuments({ status: "pending" }, (err, count) => {
    if (err) return res.status(400).send(err);
    res.send({ count });
  });
};

const GetNumberofAcceptedRequests = (req, res) => {
  Booking.countDocuments({ status: "accepted" }, (err, count) => {
    if (err) return res.status(400).send(err);
    res.send({ count });
  });
};

const UpdateBookStatus = (req, res) => {
  const { _id, status } = req.body;

  Booking.findOneAndUpdate(
    { _id: _id },
    { status: status },
    { new: true },
    (err, doc) => {
      if (err) return res.status(400).send(err);
      res.send(doc);
    }
  );
};

const DeleteBooking = (req, res) => {
  const { _id } = req.body;
  Booking.deleteOne({ _id: _id }, (err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).send(err);
    } else {
      console.log(docs);
      res.send(docs);
    }
  });
};

const getUserRequest = (req, res) => {
  const { user_id, status } = req.body;
  Booking.find({ status: status, user_id: user_id }, (err, docs) => {
    if (err) return res.status(400).send(err);
    res.send(docs);
  });
};
const saveTransactionId = (req, res) => {
  const { prevObj = {}, transaction_id, _id } = req.body;
  Booking.findOneAndUpdate(
    { _id: _id },
    { data: { ...prevObj, transaction_id } },
    { new: true },
    (err, doc) => {
      if (err) return res.status(400).send(err);
      res.send(doc);
    }
  );
};

module.exports = {
  CreateBooking,
  GetBooking,
  GetNumberofUsers,
  GetNumberofUsersRequest,
  UpdateBookStatus,
  GetPendingBooking,
  GetNumberofAcceptedRequests,
  DeleteBooking,
  getUserRequest,
  saveTransactionId,
  GetAllBookingbyStatus,
};
