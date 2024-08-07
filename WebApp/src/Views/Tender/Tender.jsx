import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";
import CustomModal from "../../Components/molecules/CustomModal";
import axios from "axios";
import { Bounce, toast } from "react-toastify";
import { PulseLoader } from "react-spinners";

function Tender() {
  const { tenderId } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [response, setResponse] = useState();
  const [loading, setLoading] = useState(true);

  const [tenderData, setTenderData] = useState({
    name: "",
    description: "",
    startingBid: 0,
    startTime: "",
    endTime: "",
    bufferTime: "",
    bids: [],
  });

  useEffect(() => {
    const getTenderData = async () => {
      setLoading(true);
      try {
        const tenderData = await axios.get(
          "http://localhost:5000/api/tenders/" + tenderId
        );
        const endTime = new Date(tenderData.data.endTime);
        const formattedBids = tenderData.data.bids
          .sort((a, b) => b.bidCost - a.bidCost)
          .map((val) => ({
            ...val,
            bidTime: new Date(val.bidTime).toLocaleString("en-US", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
            }),
          }));

        setTenderData({
          ...tenderData.data,
          startTime: new Date(tenderData.data.startTime).toLocaleString(
            "en-US",
            {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
            }
          ),
          endTime: endTime.toLocaleString("en-US", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          }),
          bids: formattedBids,
        });
      } catch (err) {
        console.log("error getting tender data", err);
      } finally {
        setLoading(false); // Set loading to false when data is fetched
      }
    };
    getTenderData();
  }, [tenderId, response]);

  const handleCreateBid = async (newBid) => {
    // Validate the new bid
    if (isNaN(newBid.bidCost)) {
      toast("Please enter a valid bid cost", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        type: "error",
        theme: "light",
        transition: Bounce,
      });
      return;
    }
    if (!newBid.bidCost) {
      toast("Please enter a bid cost", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        type: "error",
        theme: "light",
        transition: Bounce,
      });
      return;
    }
    if (newBid.bidCost < tenderData.startingBid) {
      toast(`Bid cost must be at least ${tenderData.startingBid}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        type: "error",
        theme: "light",
        transition: Bounce,
      });
      return;
    }
    // Check if the bid was placed in the last 5 minutes before the end time
    const [hours, minutes] = tenderData.bufferTime.split(":").map(Number);
    const bufferTimeMs = hours * 60 * 60 * 1000 + minutes * 60 * 1000;
    // Add buffer time to endTime
    const endTime = new Date(tenderData.endTime);
    const endTimeWithBuffer = new Date(endTime.getTime() + bufferTimeMs);
    const bidTime = new Date(newBid.bidTime);
    if (bidTime > endTime) {
      toast("Time to place a bid is over!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        type: "error",
        theme: "light",
        transition: Bounce,
      });
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:5000/api/tenders/update/" + tenderId,
        newBid
      );

      if (bidTime >= endTime - 5 * 60 * 1000) {
        toast("A last-minute bid was placed!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          type: "info",
          theme: "light",
          transition: Bounce,
        });
        await axios.post(
          "http://localhost:5000/api/tenders/buffer/" + tenderId,
          {
            endTime: endTimeWithBuffer.toISOString(),
          }
        );
      }

      setResponse(response);
    } catch (e) {
      console.log(e);
    }
    setIsModalOpen(false);
  };

  // Determine the highest bid
  const highestBid = tenderData.bids.length > 0 ? tenderData.bids[0] : null;

  return (
    <div className="p-6 max-w-4xl mx-auto my-8 bg-white shadow-lg rounded-lg">
      {loading ? (
        <div className="flex justify-center items-center min-h-screen">
          <PulseLoader color="#3490dc" />{" "}
        </div>
      ) : (
        <>
          <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
              {tenderData.name}
            </h1>
            <button
              onClick={() => setIsModalOpen(true)}
              className="mt-4 sm:mt-0 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
            >
              Place a Bid
            </button>
          </div>
          <p className="text-gray-700 mb-6">{tenderData.description}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <p className="bg-green-500 text-white p-2 rounded-lg">
              <strong>Starting Bid:</strong> $
              {tenderData.startingBid.toFixed(2)}
            </p>
            <p className="text-gray-600 p-2">
              <strong>Start Time:</strong> {tenderData.startTime}
            </p>
            <p className="text-gray-600 p-2">
              <strong>End Time:</strong> {tenderData.endTime}
            </p>
          </div>
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Bids</h2>
            {tenderData.bids.length === 0 ? (
              <div className="text-center text-gray-500 py-6">
                <p className="text-xl font-medium">
                  No bids placed yet. Be the first to place a bid!
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Company Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Bid Cost
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Bid Time
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {tenderData.bids.map((bid, index) => (
                      <tr
                        key={index}
                        className={`${
                          highestBid && bid.bidCost === highestBid.bidCost
                            ? "bg-blue-100 font-bold"
                            : "hover:bg-gray-50"
                        } transition duration-300 ease-in-out`}
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {bid.companyName}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          ${bid.bidCost.toFixed(2)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {bid.bidTime}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
          <CustomModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onSubmit={handleCreateBid}
          />
        </>
      )}
    </div>
  );
}

Tender.propTypes = {
  tenderId: PropTypes.string.isRequired,
};

export default Tender;
