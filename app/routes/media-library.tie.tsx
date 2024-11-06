import { Link, Outlet, useLoaderData, useLocation } from "@remix-run/react";
import { useState, useEffect } from "react";
import { fetchMediaLibrary } from "~/utils/media-api";

export const loader = async ({ request }: { request: Request }) => {
  const url = new URL(request.url);
  const page = parseInt(url.searchParams.get("page") || "1", 10);
  const perPage = parseInt(url.searchParams.get("perPage") || "25", 10);
  const languageCode = url.searchParams.get("languageCode") || "hindi"; // Default to '1' for English

  return fetchMediaLibrary({ page, perPage, mediaCategory: 'tech-it-easy', languageCode: languageCode });
};

export default function MediaLibrary() {
  const data: any = useLoaderData();
  const location = useLocation();  // To access the current URL and modify it based on dropdown selection
  const [languageCode, setLanguageCode] = useState("1");  // Default to English ('1')

  // Function to handle language change
  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLanguageCode = e.target.value;
    setLanguageCode(newLanguageCode);

    // Update the URL with the new language code and reload data
    const newUrl = new URL(window.location.href);
    newUrl.searchParams.set("languageCode", newLanguageCode);
    window.location.href = newUrl.toString();
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Tech It Easy Videos</h1>

      {/* Language Dropdown */}
      <div className="mb-4 flex justify-center">
        <select
          value={languageCode}
          onChange={handleLanguageChange}
          className="p-2 border rounded"
        >
          <option value="english">English</option>
          <option value="hindi">Hindi</option>
        </select>
      </div>

      <div className="flex flex-col items-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl w-full">
          {data.mediaLibrary.map((obj: any) => (
            <Link
              to={`/media-library/${obj.uuid}`}
              key={obj.uuid}
              className="flex flex-col items-center p-4 border rounded shadow-2xl max-w-xs w-full transition-transform transform hover:scale-105 hover:shadow-xl"
            >
              <img
                src={obj.thumbnailUrl}
                alt={obj.title}
                className="mb-2 w-full h-auto rounded"
              />
              <h2 className="text-xl font-bold mb-2 text-center">{obj.title}</h2>
            </Link>
          ))}
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-center mt-4 space-x-4">
          {data.page > 1 && (
            <a href={`?page=${data.page - 1}&perPage=${data.perPage}&languageCode=${languageCode}`} className="btn">
              Previous
            </a>
          )}
          {data.hasNextPage && (
            <a href={`?page=${data.page + 1}&perPage=${data.perPage}&languageCode=${languageCode}`} className="btn">
              Next
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
