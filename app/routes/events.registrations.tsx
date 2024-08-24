import { useLoaderData } from "@remix-run/react";
import { fetchAllEvents, fetchEventUsers } from "~/utils/api";
import { useState } from "react";

export const loader = async () => {
  const data = await fetchAllEvents();
  data.config = {
    apiBaseUrl: process.env.API_BASE_URL,
    apiVersion: process.env.API_VERSION,
    apiAuthToken: process.env.API_AUTH_TOKEN,
  }
  return data;
};

export default function EventsListing() {
  const data: any = useLoaderData();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedEventUsers, setSelectedEventUsers] = useState<any>(null);

  const handleEventClick = async (eventId: string) => {

    const userData = await fetchEventUsers(eventId, {
        baseUrl: data.config.apiBaseUrl,
        apiToken: data.config.apiAuthToken,
        apiVersion: data.config.apiVersion,
    });
console.log(selectedEventUsers)
    setSelectedEventUsers(userData.data);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedEventUsers(null);
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-4xl font-bold text-gray-900 mb-6 text-center">All Events</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {data.data.map((event: any) => (
          <div
            key={event.uuid}
            className="p-4 bg-white shadow-2xl rounded-lg cursor-pointer"
            onClick={() => handleEventClick(event.uuid)}
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-2">{event.title}</h2>
            <img
              src={event.coverImageUrl ?? "/images/event-fallback.jpg"}
              alt={event.title}
              className="mb-4 w-full h-32 object-cover rounded-lg shadow-md"
            />
            <p className="text-lg text-gray-700">{event.extendedTitle}</p>

          </div>
        ))}
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Registered Users
            </h2>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-200">
                <thead>
                  <tr>
                    <th className="px-4 py-2 border-b">#</th>
                    <th className="px-4 py-2 border-b">Name</th>
                    <th className="px-4 py-2 border-b">Phone Number</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedEventUsers?.map((user: any, index: number) => (
                    <tr key={user.id} className="hover:bg-gray-100">
                      <td className="px-4 py-2 border-b text-center">{index + 1}</td>
                      <td className="px-4 py-2 border-b text-center">{user.user.name}</td>
                      <td className="px-4 py-2 border-b text-center">{user.user.phone}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-lg text-gray-900 my-4">
              Total Users: {selectedEventUsers?.length}
            </p>
            <button
              onClick={closeModal}
              className="bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
