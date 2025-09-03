import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchMyGroups, deleteGroup } from "../api/group";
import { toast } from "react-toastify";

const MyGroups = () => {
  const [groups, setGroups] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    //fetch all the groups made by logged in user
    const getGroups = async () => {
      try {
        const res = await fetchMyGroups();
        setGroups(res.data);
      } catch (error) {
        alert(error.response?.data?.msg || "Failed to fetch groups");
      }
    };

    getGroups();
  }, []);

  //delete group created by user
  const handleDelete = async (groupId) => {
    if (!window.confirm("Are you sure you want to delete this group?")) return;

    try {
      await deleteGroup(groupId);
      setGroups(groups.filter((group) => group._id !== groupId));
      toast.success("Group deleted successfully");
    } catch (error) {
      toast.error(error.response?.data?.msg || "Failed to delete group");
    }
  };

  //used to view all the expenses inside a particular group
  const handleViewGroup = (groupId) => {
    navigate(`/group/${groupId}/details`);
  }

  //to add expense in a particular group
  const handleAddExpense = (groupId) => {
    navigate(`/group/${groupId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 via-white to-slate-100 py-10 px-4">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-purple-700 mb-10">
          My Groups
        </h2>

        {groups.length === 0 ? (
          <p className="text-center text-slate-500 text-lg">No groups found.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {groups.map((group) => (
              <div
                key={group._id}
                className="bg-white rounded-2xl shadow-xl p-6 hover:shadow-2xl transition duration-300 border-t-4 border-purple-500"
              >
                <h3 className="text-2xl font-semibold text-slate-800 mb-3">
                  {group.eventName}
                </h3>

                <div className="mb-4 flex flex-wrap gap-2">
                  {group.members.map((member, index) => (
                    <span
                      key={index}
                      className="bg-purple-100 text-purple-800 px-3 py-1 text-sm rounded-full font-medium"
                    >
                      {member}
                    </span>
                  ))}
                </div>

                <div className="flex justify-start gap-3 mt-15">
                  <button
                    onClick={() => handleAddExpense(group._id)}
                    className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
                  >
                    Add Expense
                  </button>

                  <button
                    onClick={() => handleViewGroup(group._id)}
                    className="bg-green-500 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
                  >
                    View
                  </button>

                  <button
                    onClick={() => handleDelete(group._id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyGroups;
