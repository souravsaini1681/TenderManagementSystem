import { useEffect, useState } from "react";
import TenderCard from "../../Components/molecules/TenderCard";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ROUTES_CONFIG } from "../../shared/Constants";
import { PulseLoader } from "react-spinners"; // Import a loader component

function AdminHomePanel() {
  const [allTendersData, setAllTendersData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true); // Add a loading state

  useEffect(() => {
    const fetchTenderData = async () => {
      try {
        const tenderData = await axios.get(
          "http://localhost:5000/api/tenders/"
        );
        setAllTendersData(tenderData.data);
      } catch (error) {
        console.log("Error fetching tender data", error);
      } finally {
        setLoading(false); // Set loading to false when data is fetched
      }
    };
    fetchTenderData();
  }, []);

  const navigate = useNavigate();

  const handleAddTender = () => {
    navigate(ROUTES_CONFIG.ADD_TENDER.path);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  const filteredTenders = allTendersData.filter((tender) =>
    tender.name.toLowerCase().includes(searchQuery)
  );

  return (
    <div className="container mx-auto p-6">
      <div className="mb-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        <h1 className="text-4xl font-extrabold text-gray-900">Admin Panel</h1>
        <div className="w-full md:w-1/3 flex items-center space-x-2">
          <input
            type="text"
            placeholder="Search for tenders..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={handleSearchChange}
          />
          <button
            onClick={handleAddTender}
            className="bg-blue-600 text-white px-6 text-nowrap py-2.5 rounded-lg shadow-md hover:bg-blue-700 transition duration-300 flex items-center"
          >
            <svg
              className="h-5 w-5 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 4v16m8-8H4"
              />
            </svg>
            Add Tender
          </button>
        </div>
      </div>
      {loading ? (
        <div className="flex justify-center items-center min-h-screen">
          <PulseLoader color="#3490dc" />{" "}
          {/* Show a loader while fetching data */}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredTenders.length > 0 ? (
            filteredTenders.map((val) => (
              <TenderCard
                key={val._id}
                name={val.name}
                bids={val.bids}
                startTime={val.startTime}
                endTime={val.endTime}
                description={val.description}
                startingBid={val.startingBid}
                id={val._id}
                isAdmin={true}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-6 text-gray-500">
              <p className="text-xl font-medium">No tenders found.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default AdminHomePanel;
