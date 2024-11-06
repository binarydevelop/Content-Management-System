import React from "react";

const Gallery = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-5xl mx-auto">
      <a href="/events" className="group">
        <div className="flex items-center justify-center h-48 w-full rounded-lg overflow-hidden">
          <img
            className="h-auto max-w-full rounded-lg object-cover transform transition-transform duration-500 ease-in-out group-hover:scale-110 group-hover:opacity-90"
            src="/images/event.png"
            alt="Gallery Image 1"
          />
        </div>
        <div className="mt-2 text-center text-lg font-semibold group-hover:text-blue-600 transition-colors duration-300">
          Events
        </div>
      </a>
      <a href="/media-library" className="group">
        <div className="flex items-center justify-center h-48 w-full rounded-lg shadow-lg overflow-hidden">
          <img
            className="h-auto max-w-full rounded-lg object-cover transform transition-transform duration-500 ease-in-out group-hover:scale-110 group-hover:opacity-90"
            src="/images/media.png"
            alt="Gallery Image 2"
          />
        </div>
        <div className="mt-2 text-center text-lg font-semibold group-hover:text-blue-600 transition-colors duration-300">
          Media Library
        </div>
      </a>
      <a href="/users" className="group">
        <div className="flex items-center justify-center h-48 w-full rounded-lg shadow-lg overflow-hidden">
          <img
            className="h-auto max-w-full rounded-lg object-cover transform transition-transform duration-500 ease-in-out group-hover:scale-110 group-hover:opacity-90"
            src="/images/user.png"
            alt="Users"
          />
        </div>
        <div className="mt-2 text-center text-lg font-semibold group-hover:text-blue-600 transition-colors duration-300">
          User
        </div>
      </a>
      {/* Repeat for other gallery items */}
    </div>
  );
};

export default Gallery;
