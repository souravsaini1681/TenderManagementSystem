import { useState } from "react";
import PropTypes from "prop-types";

function CustomModal({ isOpen, onClose, onSubmit }) {
  const [companyName, setCompanyName] = useState("");
  const [bidCost, setBidCost] = useState("");

  const handleSubmit = () => {
    onSubmit({
      companyName,
      bidCost: parseFloat(bidCost),
      bidTime: new Date().toISOString(),
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4">Create a New Bid</h2>
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Company Name</label>
          <input
            type="text"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            className="border rounded-lg p-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Bid Cost</label>
          <input
            type="number"
            value={bidCost}
            onChange={(e) => setBidCost(e.target.value)}
            className="border rounded-lg p-2 w-full"
          />
        </div>

        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

CustomModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default CustomModal;
