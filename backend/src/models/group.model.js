const mongoose = require("mongoose");
const { User } = require("./user.model");

const expenseSchema = new mongoose.Schema({
  whoPaid: {
    type: String,
    required: true,
  },
  forWhat: {
    type: String,
    required: true,
  },
  howMuch: {
    type: Number,
    required: true,
  },
  participants: [
    {
      type: String,
      required: true,
    }
  ]
});

const groupSchema = new mongoose.Schema({
  eventName: {
    type: String,
    required: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  members: [
    {
      type: String,
      required: true,
    }
  ],
  expenses: [expenseSchema],
}, { timestamps: true });

const Group = mongoose.model("Group", groupSchema);
module.exports = {Group};