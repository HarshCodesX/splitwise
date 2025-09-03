import React, { useState } from 'react';
import { createGroup } from '../api/group';
import { toast } from 'react-toastify';

const CreateGroupForm = () => {
  const [eventName, setEventName] = useState('');
  const [memberInput, setInputMember] = useState('');
  const [members, setMembers] = useState([]);

  //add members inside array
  const handleAddMember = () => {
    const trimmed = memberInput.trim();
    if (trimmed && !members.includes(trimmed)) {
      setMembers([...members, trimmed]);
      setInputMember('');
    }
  };

  //remove member from array
  const handleRemoveMember = (indexToRemove) => {
    setMembers(members.filter((_, index) => index !== indexToRemove));
  };

  //handles submit action and makes api call to create a group
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!eventName || members.length === 0) {
      toast.error('Please enter event name and add at least one member');
      return;
    }
    try {
      const res = await createGroup({ eventName, members });
      if (res.status === 200) {
        toast.success('Group created');
        setEventName('');
        setMembers([]);
      }
    } catch (error) {
      toast.error('Something went wrong');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto bg-white p-6 rounded-xl shadow-md space-y-6"
    >
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Event Name:
        </label>
        <input
          type="text"
          value={eventName}
          placeholder="Enter Event Name"
          onChange={(e) => setEventName(e.target.value)}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Add Members:
        </label>
        <div className="flex gap-2">
          <input
            value={memberInput}
            onChange={(e) => setInputMember(e.target.value)}
            placeholder="Enter member name"
            type="text"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="button"
            onClick={handleAddMember}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
          >
            Add
          </button>
        </div>
      </div>

      {members.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {members.map((member, index) => (
            <div
              key={index}
              className="flex items-center bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium"
            >
              {member}
              <button
                type="button"
                onClick={() => handleRemoveMember(index)}
                className="ml-2 text-blue-500 hover:text-blue-700 font-bold"
              >
                &times;
              </button>
            </div>
          ))}
        </div>
      )}

      <button
        type="submit"
        className="w-full py-2 px-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-200"
      >
        Create Group
      </button>
    </form>
  );
};

export default CreateGroupForm;
