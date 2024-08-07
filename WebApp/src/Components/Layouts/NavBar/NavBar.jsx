import { useState } from "react";
import { STRING } from "../../../shared/Constants";
import { Link } from "react-router-dom";

function NavBar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-xl font-bold">
          {STRING.WEB_APP_NAME}
        </div>
        <div
          className={`${
            isOpen ? "flex justify-end" : "hidden"
          } w-full lg:flex lg:items-center lg:w-auto`}
        >
          <div className="space-y-4 lg:space-y-0 lg:space-x-4 lg:flex lg:ml-auto">
            <Link
              to="/"
              className="block text-white hover:bg-gray-700 px-4 py-2 rounded transition duration-300"
            >
              Home
            </Link>
            <Link
              to="/admin"
              className="block text-white hover:bg-gray-700 px-4 py-2 rounded transition duration-300"
            >
              Admin
            </Link>
          </div>
        </div>
        <div className="block lg:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white hover:text-gray-400 focus:outline-none focus:text-gray-400"
          >
            <svg
              className="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              )}
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
