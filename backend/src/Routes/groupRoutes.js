const express = require("express");
const {isLoggedIn} = require("../middlewares/isLoggedIn")
const {createGroup, getAllGroups, addExpense, settleExpense, deleteGroup, deleteExpense, getGroupById, getGroupDetails} = require("../controllers/groupController");
const router = express.Router();
router.post("/create", isLoggedIn, createGroup);
router.get("/all", isLoggedIn, getAllGroups);
router.post("/:groupId/expenses", isLoggedIn, addExpense);
router.get("/:groupId/settle", isLoggedIn, settleExpense);
router.delete("/:groupId/delete", deleteGroup);
router.delete("/:groupId/:expenseId/delete", deleteExpense);
router.get("/:groupId", isLoggedIn, getGroupById);
router.get("/:groupId/details", isLoggedIn, getGroupDetails)

module.exports = router