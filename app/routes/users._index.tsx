import React from "react";
import { Link, Outlet } from "@remix-run/react";
import {
  FilmIcon,
  SparklesIcon,
  PuzzlePieceIcon,
  RectangleGroupIcon,
  WrenchScrewdriverIcon,
  PlusCircleIcon,
  CalendarDaysIcon,
} from "@heroicons/react/24/solid";
import { UserCircleIcon } from "@heroicons/react/16/solid";

const Users = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Users</h1>
        <Link
          to="/users/create"
          className="flex items-center justify-center text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 w-full sm:w-auto"
        >
          <PlusCircleIcon className="w-5 h-5 mr-2" />
          <span className="whitespace-nowrap">Create New User</span>
        </Link>
      </div>

      {/* First row of event categories */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <Link
          to="/"
          className="relative group flex flex-col items-center"
        >
          <div className="flex items-center justify-center h-48 w-full rounded-xl shadow-2xl bg-blend-hard-light transform transition-transform duration-300 ease-in-out group-hover:scale-105 group-hover:shadow-lg">
            <UserCircleIcon className="w-16 h-16 text-gray-700" />
          </div>
          <div className="mt-2 text-center text-lg font-semibold">
            Users Lisitng
          </div>
        </Link>
        <Link
          // to="/events/workshop"
          to="/events"
          className="relative group flex flex-col items-center"
        >
          <div className="flex items-center justify-center h-48 w-full rounded-xl shadow-2xl bg-blend-hard-light transform transition-transform duration-300 ease-in-out group-hover:scale-105 group-hover:shadow-lg">
            <WrenchScrewdriverIcon className="w-16 h-16 text-gray-700" />
          </div>
          <div className="mt-2 text-center text-lg font-semibold">
            Workshops
          </div>
        </Link>
        <Link
          // to="/events/pop-up-club"
          to="/events"
          className="relative group flex flex-col items-center"
        >
          <div className="flex items-center justify-center h-48 w-full rounded-xl shadow-2xl bg-blend-hard-light transform transition-transform duration-300 ease-in-out group-hover:scale-105 group-hover:shadow-lg">
            <SparklesIcon className="w-16 h-16 text-gray-700" />
          </div>
          <div className="mt-2 text-center text-lg font-semibold">
            Pop-up Club
          </div>
        </Link>
        <Link
          // to="/events/games"
          to="/events"
          className="relative group flex flex-col items-center"
        >
          <div className="flex items-center justify-center h-48 w-full rounded-xl shadow-2xl bg-blend-hard-light transform transition-transform duration-300 ease-in-out group-hover:scale-105 group-hover:shadow-lg">
            <PuzzlePieceIcon className="w-16 h-16 text-gray-700" />
          </div>
          <div className="mt-2 text-center text-lg font-semibold">Games</div>
        </Link>
      </div>

      {/* Horizontal line to separate sections */}
      <hr className="my-8 border-gray-300" />

      {/* Second row with Event Registrations */}
      <div className="grid grid-cols-3 mx-auto gap-4">
        <Link
          // to="/events/registrations"
          to="/events"
          className="relative group flex flex-col items-center"
        >
          <div className="flex items-center justify-center h-48 w-full rounded-xl shadow-2xl  transform transition-transform duration-300 ease-in-out group-hover:scale-105 group-hover:shadow-2xl">
            <RectangleGroupIcon className="w-16 h-16 text-gray-700" />
          </div>
          <div className="mt-2 text-center text-lg font-semibold">
            Event Registrations
          </div>
        </Link>
        <Link
          // to="/events/calendar"
          to="/events"
          className="relative group flex flex-col items-center"
        >
          <div className="flex items-center justify-center h-48 w-full rounded-xl shadow-2xl  transform transition-transform duration-300 ease-in-out group-hover:scale-105 group-hover:shadow-2xl">
            <CalendarDaysIcon className="w-16 h-16 text-gray-700" />
          </div>
          <div className="mt-2 text-center text-lg font-semibold">
            Event Calendar
          </div>
        </Link>
      </div>
      <Outlet />
    </div>
  );
};

export default Users;