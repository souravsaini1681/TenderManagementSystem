import clsx from "clsx";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { ROUTES_CONFIG, STRING } from "../../../shared/Constants";
import axios from "axios";
import { toast, Bounce } from "react-toastify";

function TenderCard({
  name,
  description,
  startTime,
  endTime,
  bids,
  startingBid,
  id,
  isAdmin,
}) {
  const formattedStartTime = new Date(startTime).toLocaleString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  const formattedEndTime = new Date(endTime).toLocaleString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  const topBids = bids.sort((a, b) => b.bidCost - a.bidCost).slice(0, 4);

  const navigate = useNavigate();

  const handleTenderCardPress = () => {
    navigate(ROUTES_CONFIG.TENDER.path + id);
  };

  const handleDelete = async (e) => {
    e.stopPropagation();
    try {
      await axios.delete(`http://localhost:5000/api/tenders/` + id);

      toast("Tender data deleted successfully", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        type: "success",
        theme: "light",
        transition: Bounce,
      });
      window.location.reload();
    } catch (error) {
      console.error("Error deleting tender:", error);
    }
  };

  return (
    <div
      className="bg-gradient-to-r from-gray-50 to-gray-200 shadow-lg rounded-lg cursor-pointer p-6 max-w-md mx-auto my-6 transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl sm:mx-12 sm:my-12"
      onClick={handleTenderCardPress}
    >
      <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-gray-900 text-center">
        {name}
      </h2>
      <p className="text-gray-700 mb-6 text-center">{description}</p>

      <div className="flex flex-col justify-between items-center text-gray-600 text-sm mb-6 w-full">
        <div className="flex items-center space-x-2 my-3 w-full overflow-hidden">
          <strong className="text-gray-800 whitespace-nowrap">
            {STRING.TENDER_CARD.startTime}:
          </strong>
          <span className="truncate">{formattedStartTime}</span>
        </div>
        <div className="flex items-center space-x-2 w-full overflow-hidden">
          <strong className="text-gray-800 whitespace-nowrap">
            {STRING.TENDER_CARD.endTime}:
          </strong>
          <span className="truncate">{formattedEndTime}</span>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-900 text-center mb-2">
          {STRING.TENDER_CARD.startingBid}
        </h3>
        <div className="flex justify-center">
          <span className="text-2xl font-bold text-white rounded-full p-2 px-4 bg-green-600">
            ${startingBid}
          </span>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-semibold text-gray-900 mb-4 text-center">
          {STRING.TENDER_CARD.topBids}:
        </h3>
        {topBids.length > 0 ? (
          <ul className="list-disc list-inside space-y-3 text-gray-700">
            {topBids.map((bid, index) => (
              <li
                key={index}
                className={clsx(
                  "flex justify-between items-center px-2 py-1",
                  index === 0
                    ? "border text-white shadow-md bg-blue-500 py-3 px-2 rounded-lg"
                    : ""
                )}
              >
                <span className="font-medium">{bid.companyName}</span>
                <span className="text-white rounded-full p-1 px-3 bg-green-600 font-semibold">
                  ${bid.bidCost.toFixed(2)}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-gray-600">
            No bids placed yet. Be the first to place a bid!
          </p>
        )}
      </div>

      {isAdmin && (
        <div className="mt-6 flex justify-center">
          <button
            onClick={handleDelete}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
}

TenderCard.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  startTime: PropTypes.string.isRequired,
  endTime: PropTypes.string.isRequired,
  startingBid: PropTypes.number.isRequired,
  bids: PropTypes.arrayOf(
    PropTypes.shape({
      companyName: PropTypes.string.isRequired,
      bidTime: PropTypes.string.isRequired,
      bidCost: PropTypes.number.isRequired,
    })
  ).isRequired,
  id: PropTypes.string.isRequired,
  isAdmin: PropTypes.bool.isRequired,
};

export default TenderCard;
