import React from "react";
import { Link, Outlet } from "@remix-run/react";
import {
  FilmIcon,
  SparklesIcon,
  PuzzlePieceIcon,
  RectangleGroupIcon,
  WrenchScrewdriverIcon,
} from "@heroicons/react/24/solid";

const Events = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Event Categories</h1>
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
