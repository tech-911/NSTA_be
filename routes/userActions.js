const express = require("express");
const router = express.Router();
const verify = require("../verification/verifyToken");
const {
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
} = require("../controllers/bookingController");

router.post("/bookings", verify, CreateBooking);
router.delete("/deletebooking", verify, DeleteBooking);
router.get("/getpendingbookings", verify, GetPendingBooking);
router.get("/getbookings", verify, GetBooking);
router.post("/getallbookingsbystatus", verify, GetAllBookingbyStatus);
router.post("/getusernumber", verify, GetNumberofUsers);
router.get("/getuserrequest", verify, GetNumberofUsersRequest); // gets the number of all request both pending accepted and declined of all users
router.get("/acceptedrequestnumber", verify, GetNumberofAcceptedRequests); //gets the number of all request of users accepted by admin and super admin
router.put("/updatebookstatus", verify, UpdateBookStatus); //update the status of user request
router.post("/getIndividualUserRequest", verify, getUserRequest); // get accepted, pending and declined request per user using user_id
router.put("/savetransactionid", verify, saveTransactionId); // saves a transaction id in a paid users booked object

module.exports = router;
