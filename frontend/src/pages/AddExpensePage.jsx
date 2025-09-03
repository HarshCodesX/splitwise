import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { addExpense } from "../api/group";
import {toast} from "react-toastify"
import axios from "axios";

const AddExpensePage = () => {
  const { groupId } = useParams();
  const [group, setGroup] = useState(null);
  const [formData, setFormData] = useState({
    whoPaid: "",
    forWhat: "",
    howMuch: "",
    participants: [],
  });
  const navigate = useNavigate();

  useEffect(() => {
    //get the details of the group
    const fetchGroup = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/group/${groupId}`, {
          withCredentials: true,
        });
        setGroup(res.data);
      } catch (err) {
        toast.error("Failed to load group");
      }
    };
    fetchGroup();
  }, [groupId]); //fetches details whenever groupId changes

  //roues to create a new group
  const handleLogoClick = () => {
    navigate("/create-group");
  }

  //navigate to view all the expenses
  const handleButtonClick = () => {
    navigate(`/group/${groupId}/details`)
  }

  //to enter details of expense inside state
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  //to add or remove participants from the participants array
  const handleCheckboxChange = (member) => {
    setFormData((prev) => ({
      ...prev,
      participants: prev.participants.includes(member)
        ? prev.participants.filter((m) => m !== member)
        : [...prev.participants, member],
    }));
  };

  //makes api call to the backend to register an expense
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addExpense(groupId, formData); 
      toast.success("Expense added successfully");
      setFormData({
        whoPaid: "",
        forWhat: "",
        howMuch: "",
        participants: [],
      });
    } catch (err) {
      toast.error(err.response?.data?.msg || "Failed to add expense");
    }
  };

  if (!group) return <div>Loading...</div>;

  return (
    <>
    <nav className="flex justify-between items-center p-3 bg-blue-500">
      <h2 onClick={handleLogoClick} className="cursor-pointer font-bold text-2xl text-white">Expensify</h2>
      <button onClick={handleButtonClick} className="bg-green-600 p-2 rounded-xl cursor-pointer">View Expense</button>
    </nav>
    <div className="p-4 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Add Expense to {group.eventName}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Who Paid:</label>
          <select
            name="whoPaid"
            value={formData.whoPaid}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          >
            <option value="">Select member</option>
            {group.members.map((member) => (
              <option key={member} value={member}>
                {member}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block mb-1">For What:</label>
          <input
            type="text"
            name="forWhat"
            value={formData.forWhat}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block mb-1">How Much:</label>
          <input
            type="number"
            name="howMuch"
            value={formData.howMuch}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block mb-1">Participants:</label>
          <div className="flex flex-wrap gap-2 mt-1">
            {group.members.map((member) => (
              <label key={member} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={formData.participants.includes(member)}
                  onChange={() => handleCheckboxChange(member)}
                />
                <span>{member}</span>
              </label>
            ))}
          </div>
        </div>
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Add Expense
        </button>
      </form>
    </div>
    </>
  );
};

export default AddExpensePage;
