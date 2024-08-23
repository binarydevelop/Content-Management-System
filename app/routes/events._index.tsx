import React from "react";
import { Link, Outlet } from "@remix-run/react";
import {
  FilmIcon,
  SparklesIcon,
  PuzzlePieceIcon,
  RectangleGroupIcon,
  WrenchScrewdriverIcon,
  PlusCircleIcon,
} from "@heroicons/react/24/solid";

const Events = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Event Categories</h1>
        <Link
          to="/events/create"
          className="flex items-center justify-center text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 w-full sm:w-auto"
        >
          <PlusCircleIcon className="w-5 h-5 mr-2" />
          <span className="whitespace-nowrap">Create New Event</span>
        </Link>
      </div>


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
          to="/events/workshops"
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
          to="/events/pop-up-club"
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
          to="/events/games"
          className="relative group flex flex-col items-center"
        >
          <div className="flex items-center justify-center h-48 w-full rounded-xl shadow-2xl bg-blend-hard-light transform transition-transform duration-300 ease-in-out group-hover:scale-105 group-hover:shadow-lg">
            <PuzzlePieceIcon className="w-16 h-16 text-gray-700" />
          </div>
          <div className="mt-2 text-center text-lg font-semibold">Games</div>
        </Link>
        <Link
          to="/events/registrations"
          className="relative group flex flex-col items-center"
        >
          <div className="flex items-center justify-center h-48 w-full rounded-xl shadow-2xl bg-gray-200 transform transition-transform duration-300 ease-in-out group-hover:scale-105 group-hover:shadow-lg">
            <RectangleGroupIcon className="w-16 h-16 text-gray-700" />
          </div>
          <div className="mt-2 text-center text-lg font-semibold">
            Event Registrations
          </div>
        </Link>
      </div>
      <Outlet />
    </div>
  );
};

export default Events;
