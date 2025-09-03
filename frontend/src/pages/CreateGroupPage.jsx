import React from 'react';
import Navbar from '../Components/Navbar';
import CreateGroupForm from '../Components/CreateGroupForm';

const CreateGroupPage = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="max-w-3xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Create a New Group
        </h2>
        <CreateGroupForm />
      </div>
    </div>
  );
};

export default CreateGroupPage;
