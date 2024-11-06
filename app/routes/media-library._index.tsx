import React from "react";
import { Link, Outlet } from "@remix-run/react";
import {
    SparklesIcon,
    PlusCircleIcon,
} from "@heroicons/react/24/solid";
import { ComputerDesktopIcon, CursorArrowRaysIcon, MapIcon, MusicalNoteIcon, NewspaperIcon, PaintBrushIcon, TicketIcon } from "@heroicons/react/16/solid";

const Media = () => {
    return (
        <div className="max-w-5xl mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-10">
                <h1 className="text-2xl font-bold">Media Categories</h1>
                <Link
                    to="/media-library/create"
                    className="flex items-center justify-center text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 w-full sm:w-auto"
                >
                    <PlusCircleIcon className="w-5 h-5 mr-2" />
                    <span className="whitespace-nowrap">Create New Media</span>
                </Link>
            </div>

            {/* First row of media-library categories */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <Link
                    to="/media-library/tie"
                    className="relative group flex flex-col items-center"
                >
                    <div className="flex items-center justify-center h-48 w-full rounded-xl shadow-2xl bg-blend-hard-light transform transition-transform duration-300 ease-in-out group-hover:scale-105 group-hover:shadow-lg">
                        <ComputerDesktopIcon className="w-16 h-16 text-gray-700" />
                    </div>
                    <div className="mt-2 text-center text-lg font-semibold">
                        Tech-it-Easy
                    </div>
                </Link>
                <Link
                    to="/media-librarys/guide"
                    className="relative group flex flex-col items-center"
                >
                    <div className="flex items-center justify-center h-48 w-full rounded-xl shadow-2xl bg-blend-hard-light transform transition-transform duration-300 ease-in-out group-hover:scale-105 group-hover:shadow-lg">
                        <CursorArrowRaysIcon className="w-16 h-16 text-gray-700" />
                    </div>
                    <div className="mt-2 text-center text-lg font-semibold">
                        Guide
                    </div>
                </Link>
                <Link
                    // to="/media-librarys/pop-up-club"
                    to="/media-library/digital-tour"
                    className="relative group flex flex-col items-center"
                >
                    <div className="flex items-center justify-center h-48 w-full rounded-xl shadow-2xl bg-blend-hard-light transform transition-transform duration-300 ease-in-out group-hover:scale-105 group-hover:shadow-lg">
                        <MapIcon className="w-16 h-16 text-gray-700" />
                    </div>
                    <div className="mt-2 text-center text-lg font-semibold">
                        Diguital Tour
                    </div>
                </Link>
                <Link
                    to="/media-librarys/music"
                    className="relative group flex flex-col items-center"
                >
                    <div className="flex items-center justify-center h-48 w-full rounded-xl shadow-2xl bg-blend-hard-light transform transition-transform duration-300 ease-in-out group-hover:scale-105 group-hover:shadow-lg">
                        <MusicalNoteIcon className="w-16 h-16 text-gray-700" />
                    </div>
                    <div className="mt-2 text-center text-lg font-semibold">Music</div>
                </Link>
                <Link
                    to="/media-library/meditation"
                    className="relative group flex flex-col items-center"
                >
                    <div className="flex items-center justify-center h-48 w-full rounded-xl shadow-2xl bg-blend-hard-light transform transition-transform duration-300 ease-in-out group-hover:scale-105 group-hover:shadow-lg">
                        <SparklesIcon className="w-16 h-16 text-gray-700" />
                    </div>
                    <div className="mt-2 text-center text-lg font-semibold">Meditation</div>
                </Link>
                <Link
                    to="/media-library/hobbies"
                    className="relative group flex flex-col items-center"
                >
                    <div className="flex items-center justify-center h-48 w-full rounded-xl shadow-2xl bg-blend-hard-light transform transition-transform duration-300 ease-in-out group-hover:scale-105 group-hover:shadow-lg">
                        <PaintBrushIcon className="w-16 h-16 text-gray-700" />
                    </div>
                    <div className="mt-2 text-center text-lg font-semibold">Hobbies</div>
                </Link>
                <Link
                to="/media-library/games"
                className="relative group flex flex-col items-center"
            >
                <div className="flex items-center justify-center h-48 w-full rounded-xl shadow-2xl bg-blend-hard-light transform transition-transform duration-300 ease-in-out group-hover:scale-105 group-hover:shadow-lg">
                    <TicketIcon className="w-16 h-16 text-gray-700" />
                </div>
                <div className="mt-2 text-center text-lg font-semibold">Games</div>
            </Link>
            <Link
                to="/media-library/goodnews"
                className="relative group flex flex-col items-center"
            >
                <div className="flex items-center justify-center h-48 w-full rounded-xl shadow-2xl bg-blend-hard-light transform transition-transform duration-300 ease-in-out group-hover:scale-105 group-hover:shadow-lg">
                    <NewspaperIcon className="w-16 h-16 text-gray-700" />
                </div>
                <div className="mt-2 text-center text-lg font-semibold"> News</div>
            </Link>
            </div>

            {/* Horizontal line to separate sections */}
            <hr className="my-8 border-gray-300" />
            <Outlet />
        </div>
    );
};

export default Media;
