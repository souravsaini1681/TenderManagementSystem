import { useEffect, useState } from "react";
import TenderCard from "../../Components/molecules/TenderCard";
import axios from "axios";
import { PulseLoader } from "react-spinners"; // Import a loader component

function Home() {
  const [allTendersData, setAllTendersData] = useState([]);
  const [filteredTenders, setFilteredTenders] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true); // Add a loading state

  useEffect(() => {
    const fetchTenderData = async () => {
      try {
        const tenderData = await axios.get(
          "http://localhost:5000/api/tenders/"
        );
        setAllTendersData(tenderData.data);
        setFilteredTenders(tenderData.data);
      } catch (error) {
        console.log("error in fetching tender Data", error);
      } finally {
        setLoading(false); // Set loading to false when data is fetched
      }
    };
    fetchTenderData();
  }, []);

  // Filter tenders based on the search query
  useEffect(() => {
    const filtered = allTendersData.filter(
      (tender) =>
        tender.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tender.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredTenders(filtered);
  }, [searchQuery, allTendersData]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 p-4 rounded-lg">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4 md:mb-0">
          Tenders
        </h1>
        <div className="relative w-full md:w-1/3">
          <input
            type="text"
            placeholder="Search for tenders..."
            className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500"
            onChange={handleSearchChange}
          />
          <svg
            className="absolute top-1/2 right-3 transform -translate-y-1/2 h-5 w-5 text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M11 4a7 7 0 014.54 11.618l4.14 4.14a1.5 1.5 0 01-2.12 2.12l-4.14-4.14A7 7 0 1111 4z"
            />
          </svg>
        </div>
      </div>
      {loading ? (
        <div className="flex justify-center items-center min-h-screen">
          <PulseLoader color="#3490dc" />{" "}
          {/* Show a loader while fetching data */}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredTenders.length === 0 ? (
            <div className="col-span-full text-center text-gray-500 py-6">
              <p className="text-xl font-medium">No tenders available</p>
            </div>
          ) : (
            filteredTenders.map((val) => (
              <TenderCard
                name={val.name}
                bids={val.bids}
                startTime={val.startTime}
                endTime={val.endTime}
                description={val.description}
                startingBid={val.startingBid}
                id={val._id}
                key={val._id}
              />
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default Home;
