const {Group} = require("../models/group.model");
const {settle} = require("../utils/calculateExpense")

//creates a group
const createGroup = async (req, res) => {
    const {eventName, members} = req.body;
    if(!eventName || !Array.isArray(members) || members.length == 0){
        return res.status(400).json({"msg": "event name and members are required"});
    }
    try {
        const group = new Group({
            eventName, members, expenses: [], createdBy: req.Id
        })
        await group.save();
        res.status(200).json({"msg": "Group created successfully", group});
    } catch (error) {
        res.status(400).json({"msg": error.message});
    }
}

//deletes a group
const deleteGroup = async (req, res) => {
    try {
        const groupId = req.params.groupId;
        const response = await Group.findByIdAndDelete(groupId);
        if(response){
            res.status(200).json({"msg": "Group deleted successfully"});
        }
        else{
            res.status(400).json({"msg": error.message});
        }
    } catch (error) {
        res.status(400).json({"msg" : error.message});
    }
}

//send all the groups
const getAllGroups = async (req, res) => {
    try {
        const groups = await Group.find({createdBy: req.Id});
        res.status(200).json(groups);
    } catch (error) {
        res.status(500).json({"msg": error.message});
    }
}

//register an expense inside a group
const addExpense = async (req, res) => {
    const {groupId} = req.params;
    const {whoPaid, forWhat, howMuch, participants} = req.body;

    if(!whoPaid || !forWhat || !howMuch || participants.length == 0){
        return res.status(400).json({ message: "All expense fields are required" })
    }

    try {
        const group = await Group.findById(groupId);
        if(!group){
            return res.status(400).json({"msg": "Group not found"});
        }
        const invalidNames = [whoPaid, ...participants].filter(
            name => !group.members.includes(name)
        );

        if(invalidNames.length > 0){
            return res.status(400).json({"msg": "Invalid members"});
        }
        group.expenses.push({whoPaid, forWhat, howMuch, participants});
        await group.save();
        res.status(200).json({ message: "Expense added", group });
    } catch (error) {
        res.status(400).json({"msg": error.message});
    }
}

//to delete an expense from a group
const deleteExpense = async(req, res) => {
    try {
        const {groupId, expenseId} = req.params;
        const group = await Group.findById(groupId);
        group.expenses = group.expenses.filter((expense) => {
            return expense._id.toString() != expenseId;
        })
        await group.save();
        res.status(200).json({"msg": "expense deleted successfully"});
    } catch (error) {
        res.status(400).json({"msg": error.message});
    }
}

//to settle the expense
const settleExpense = async (req, res) => {
    try {
        const group = await Group.findById(req.params.groupId);
        if(!group){
            return res.status(400).json({"msg": "Group not found"});
        }
        const result = settle(group);
        // res.status(200).json({"data": result});
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({"msg": error.message});
    }
}

const getGroupById = async (req, res) => {
  try {
    const { groupId } = req.params;
    const group = await Group.findById(groupId);

    if (!group) {
      return res.status(404).json({ msg: "Group not found" });
    }

    // if any unauthorized person is checking
    if (String(group.createdBy) !== String(req.Id)) {
      return res.status(403).json({ msg: "Unauthorized access" });
    }

    res.status(200).json(group);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

const getGroupDetails = async (req, res) => {
    const {groupId} = req.params;
    try {
        const group = Group.findById(groupId);
        if (!group) {
            return res.status(404).json({ msg: "Group not found" });
        }
        if (group.createdBy.toString() !== req.Id) {
            return res.status(403).json({ msg: "Unauthorized access" });
        }
        res.status(200).json(group); 
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

module.exports = {createGroup, deleteGroup, getAllGroups, addExpense, deleteExpense, settleExpense, getGroupById, getGroupDetails}