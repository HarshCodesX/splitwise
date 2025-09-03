import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getGroupDetails, deleteExpense, settleGroup } from "../api/group"; //imported settleGroup
import { toast } from "react-toastify";

const GroupDetailsPage = () => {
  const { groupId } = useParams();
  const [group, setGroup] = useState(null);
  const [settlementdata, setSettlementData] = useState([]); //this

  useEffect(() => {
    //to fetch details of a particular group
    const fetchDetails = async () => {
      try {
        const res = await getGroupDetails(groupId);
        // console.log(res.data);
        setGroup(res.data);
      } catch (error) {
        toast.error(error.response?.data?.msg || "Failed to fetch group");
      }
    };

    fetchDetails();
  }, [groupId]); //whenever group id changes, it will fetch the details of the latest group

  //delete a particular expense inside a group
  const handleDeleteExpense = async (groupId, expenseId) => {
    try {
      await deleteExpense(groupId, expenseId);
      setGroup((prev) => ({
        ...prev,
        expenses: prev.expenses.filter((e) => e._id !== expenseId),
      }));
      setNow((prev) => !prev);
      toast.success("Expense deleted");
    } catch (error) {
      toast.error(error.response?.data?.msg || "Failed to delete expense");
    }
  };

  //makes an api call to settle the expense (receives an array)
  const handleSettle = async () => {
    try {
      const res = await settleGroup(groupId);
    //   console.log(res.data);
      setSettlementData(res.data);  
    } catch (error) {
        toast.error("Failed to settle expenses");
    }
  }

  if (!group) return <div>Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <h2 className="text-3xl font-bold text-purple-700 mb-6">
        Group: {group.eventName}
      </h2>

      {group.expenses.length === 0 ? (
        <p className="text-gray-500">No expenses added yet.</p>
      ) : (
        <div className="space-y-4">
          {group.expenses.map((expense) => (
            <div
              key={expense._id}
              className="bg-white shadow rounded-lg p-4 flex justify-between items-center"
            >
              <div>
                <p>
                  <strong>{expense.whoPaid}</strong> paid{" "}
                  <strong>₹{expense.howMuch}</strong> for{" "}
                  <strong>{expense.forWhat}</strong>
                </p>
                <p className="text-sm text-gray-600">
                  Split between: {expense.participants.join(", ")}
                </p>
              </div>
              <button
                onClick={() => handleDeleteExpense(groupId, expense._id)}
                className="text-red-600 hover:underline text-sm"
              >
                Delete
              </button>
            </div>
          ))}
          {settlementdata.length > 0 && (
                <div className="mt-6 bg-white p-4 rounded shadow">
                    <h3 className="text-lg font-semibold mb-3 text-gray-700">Settlement Details:</h3>
                    <ul className="list-disc list-inside space-y-1 text-sm text-gray-800">
                        {settlementdata.map((entry, idx) => (
                            <li key={idx}>{entry}</li>
                        ))}
                    </ul>
                </div>
              )}
        </div>
      )}

      <button
        className="mt-10 bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition"
        onClick={handleSettle}
      >
        Settle
      </button>
    </div>
  );
};

export default GroupDetailsPage;
