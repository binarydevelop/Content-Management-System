// app/components/Sidebar.tsx

import React from "react";
import { Link } from "@remix-run/react";
import { CalendarIcon, VideoCameraIcon, UserIcon  } from "@heroicons/react/16/solid";
import { HomeIcon } from "@heroicons/react/24/solid";

const Sidebar = () => {
  return (
    <div className="fixed top-0 left-0 h-full w-64 bg-gray-800 text-white p-6">
      <div className="p-4 flex items-center justify-center">
        <img
          src="/images/logo.png"
          alt="Logo"
          className="w-32 h-auto"
        />
      </div>
      <hr className="my-4 border-gray-700" />
      <nav className="mt-10">
        <ul>
          <li className="mb-4">
            <Link to="/events" className="flex items-center py-2 px-4 rounded hover:bg-gray-700">
              <CalendarIcon className="w-6 h-6 mr-3" />
              Events
            </Link>
          </li>
          <li className="mb-4">
            <Link to="/posts" className="flex items-center py-2 px-4 rounded hover:bg-gray-700">
              <VideoCameraIcon className="w-6 h-6 mr-3" />
              Media Library
            </Link>
          </li>
          <li className="mb-4">
            <Link to="/categories" className="flex items-center py-2 px-4 rounded hover:bg-gray-700">
              <UserIcon className="w-6 h-6 mr-3" />
              Users
            </Link>
          </li>
          <hr className="my-4 border-gray-700" />
          <li className="mb-4">
            <Link to="/" className="flex items-center py-2 px-4 rounded hover:bg-gray-700">
              <HomeIcon className="w-6 h-6 mr-3" />
              Home
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
