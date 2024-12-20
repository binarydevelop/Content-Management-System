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
import { TicketIcon } from "@heroicons/react/16/solid";
import { BellIcon } from "@heroicons/react/20/solid";

const Events = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-2xl font-bold">Event Categories</h1>
        <Link
          to="/events/create"
          className="flex items-center justify-center text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 w-full sm:w-auto"
        >
          <PlusCircleIcon className="w-5 h-5 mr-2" />
          <span className="whitespace-nowrap">Create New Event</span>
        </Link>
      </div>

      {/* First row of event categories */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <Link
          to="/events/cinema"
          className="relative group flex flex-col items-center"
        >
          <div className="flex items-center justify-center h-48 w-full rounded-xl shadow-2xl bg-blend-hard-light transform transition-transform duration-300 ease-in-out group-hover:scale-105 group-hover:shadow-lg">
            <FilmIcon className="w-16 h-16 text-gray-700" />
          </div>
          <div className="mt-2 text-center text-lg font-semibold">
            Cinema Hall
          </div>
        </Link>
        <Link
          to="/events/sunday-club"
          className="relative group flex flex-col items-center"
        >
          <div className="flex items-center justify-center h-48 w-full rounded-xl shadow-2xl bg-blend-hard-light transform transition-transform duration-300 ease-in-out group-hover:scale-105 group-hover:shadow-lg">
            <SparklesIcon className="w-16 h-16 text-gray-700" />
          </div>
          <div className="mt-2 text-center text-lg font-semibold">
            The Sunday Club
          </div>
        </Link>
        <Link
          to="/events/tambola"
          className="relative group flex flex-col items-center"
        >
          <div className="flex items-center justify-center h-48 w-full rounded-xl shadow-2xl bg-blend-hard-light transform transition-transform duration-300 ease-in-out group-hover:scale-105 group-hover:shadow-lg">
            <TicketIcon className="w-16 h-16 text-gray-700" />
          </div>
          <div className="mt-2 text-center text-lg font-semibold">Tambola Time</div>
        </Link>
        <Link
          to="/events/online-activites"
          className="relative group flex flex-col items-center"
        >
          <div className="flex items-center justify-center h-48 w-full rounded-xl shadow-2xl bg-blend-hard-light transform transition-transform duration-300 ease-in-out group-hover:scale-105 group-hover:shadow-lg">
            <BellIcon className="w-16 h-16 text-gray-700" />
          </div>
          <div className="mt-2 text-center text-lg font-semibold">Online Activites</div>
        </Link>
      </div>

      {/* Horizontal line to separate sections */}
      <hr className="my-8 border-gray-300" />

      {/* Second row with Event Registrations */}
      <div className="grid grid-cols-3 mx-auto gap-4">
        <Link
          // to="/events/registrations"
          to="/events/registrations"
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
          to="/events/calendar"
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

export default Events;
