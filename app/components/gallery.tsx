

import React from "react";

const Gallery = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-5xl mx-auto">
      <a href="/events" className="group">
        <div className="flex items-center justify-center h-48 w-full rounded-lg shadow-lg">
          <img
            className="h-auto max-w-full rounded-lg object-cover"
            src="/images/event.png"
            alt="Gallery Image 1"
          />
        </div>
        <div className="mt-2 text-center text-lg font-semibold">Events</div>
      </a>
      <a href="/path-to-detail-page-2" className="group">
        <div className="flex items-center justify-center h-48 w-full rounded-lg shadow-lg">
          <img
            className="h-auto max-w-full rounded-lg object-cover"
            src="/images/media.png"
            alt="Gallery Image 2"
          />
        </div>
        <div className="mt-2 text-center text-lg font-semibold">Media Library</div>
      </a>
      <a href="/path-to-detail-page-3" className="group">
        <div className="flex items-center justify-center h-48 w-full rounded-lg shadow-lg">
          <img
            className="h-auto max-w-full rounded-lg object-cover"
            src="/images/user.png"
            alt="Gallery Image 3"
          />
        </div>
        <div className="mt-2 text-center text-lg font-semibold">User</div>
      </a>
      {/* Repeat for other gallery items */}
    </div>
  );
};

export default Gallery;

