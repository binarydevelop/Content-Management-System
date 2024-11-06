import { Link, Outlet, useLoaderData, useSearchParams } from "@remix-run/react";
import { useState, useEffect } from "react";
import { fetchEvents } from "~/utils/events-api";
import {getStartAndEndOfMonth} from "~/utils/helper"


export const loader = async ({ request }: { request: Request }) => {
  const url = new URL(request.url);
  const page = parseInt(url.searchParams.get("page") || "1", 10);
  const perPage = parseInt(url.searchParams.get("perPage") || "25", 10);
  const startDate = url.searchParams.get("startDate") || `${new Date()}`;
  const endDate = url.searchParams.get("endDate") || `${new Date()}`;

  return fetchEvents({ page, perPage, eventType: 'joy-time', startDate, endDate });
};

export default function OnlineActivites() {
  const data: any = useLoaderData();
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedMonth, setSelectedMonth] = useState<number>(new Date().getMonth()); // Default to current month

  useEffect(() => {
    // Get the start and end dates of the selected month
    const { startDate, endDate } = getStartAndEndOfMonth(selectedMonth);
    setSearchParams({ page: '1', perPage: '25', startDate, endDate });
  }, [selectedMonth, setSearchParams]);

  const handleMonthChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedMonth(parseInt(event.target.value)); // Update the selected month state
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Online Activities</h1>

      {/* Month Dropdown */}
      <div className="mb-4 flex justify-center">
        <select
          value={selectedMonth}
          onChange={handleMonthChange}
          className="p-2 rounded border border-gray-300"
        >
          {["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"].map((month, index) => (
            <option key={month} value={index}>
              {month}
            </option>
          ))}
        </select>
      </div>

      {/* Event List */}
      <div className="flex flex-col items-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl w-full">
          {data.events.map((event: any) => (
            <Link
              to={`/events/${event.uuid}`}
              key={event.uuid}
              className="flex flex-col items-center p-4 border rounded shadow-2xl max-w-xs w-full transition-transform transform hover:scale-105 hover:shadow-xl"
            >
              <img
                src={event.thumbnailUrl}
                alt={event.title}
                className="mb-2 w-full h-auto rounded"
              />
              <h2 className="text-xl font-bold mb-2 text-center">{event.title}</h2>
              <h2 className="text-xl font-bold mb-2 text-center">{`${new Date(event.eventStartDate).toDateString()}` }</h2>
            </Link>
          ))}
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-center mt-4 space-x-4">
          {data.page > 1 && (
            <a href={`?page=${data.page - 1}&perPage=${data.perPage}`} className="btn">
              Previous
            </a>
          )}
          {data.hasNextPage && (
            <a href={`?page=${data.page + 1}&perPage=${data.perPage}`} className="btn">
              Next
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
