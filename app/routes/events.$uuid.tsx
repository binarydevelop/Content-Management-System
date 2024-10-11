import { useLoaderData, useNavigate } from "@remix-run/react";
import { fetchEventDetails } from "~/utils/events-api";

export const loader = async ({ params }: { params: { uuid: string } }) => {
  const { uuid } = params;
  const data = await fetchEventDetails(uuid);
  return data; // Make sure the data is returned correctly here
};

export default function MovieDetails() {
  const data: any = useLoaderData();
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/events/edit/${data.data.uuid}`);
  };

  const handleDelete = () => {
    // Implement delete functionality here
    if (confirm("Are you sure you want to delete this event?")) {
      // Call your delete API here
      console.log("Event deleted");
      // After deletion, navigate back to the events list or a confirmation page
      navigate(`/events/cinema`);
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      {/* Edit and Delete Buttons */}
      <div className="flex justify-end mb-4">
        <button
          onClick={handleEdit}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
        >
          Edit
        </button>
        <button
          onClick={handleDelete}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          Delete
        </button>
      </div>

      <h1 className="text-4xl font-bold text-gray-900 mb-6 text-center">
        {data.data.title ?? data.data.extendedTitle}
      </h1>
      <img
        src={data.data.coverImageUrl ?? "/images/movie-fallback.jpg"}
        alt={data.data.title}
        className="mb-6 w-full h-auto object-cover rounded-lg shadow-md"
      />

      {/* Conditional Details based on eventMediaType */}
      {data.data.eventMediaType === "movie" && (
        <>
          <p className="text-lg text-gray-700 mb-6">
            <strong className="text-gray-900">Storyline:</strong>{" "}
            {data.data.storyLine}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <p className="text-lg text-gray-700 mb-2">
                <strong className="text-gray-900">Director:</strong>{" "}
                {data.data.director}
              </p>
              <p className="text-lg text-gray-700 mb-2">
                <strong className="text-gray-900">Cast:</strong> {data.data.cast}
              </p>
              <p className="text-lg text-gray-700 mb-2">
                <strong className="text-gray-900">Trivia:</strong>{" "}
                {data.data.trivia}
              </p>
            </div>
          </div>
        </>
      )}

      {data.data.eventMediaType === "other" && (
        <>
          <p className="text-lg text-gray-700 mb-6">
            <strong className="text-gray-900">Description:</strong>{" "}
            {data.data.description}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <p className="text-lg text-gray-700 mb-2">
                <strong className="text-gray-900">Event Location:</strong>{" "}
                {data.data.eventLocation}
              </p>
              <p className="text-lg text-gray-700 mb-2">
                <strong className="text-gray-900">Event Link:</strong>{" "}
                <a
                  href={data.data.eventLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline"
                >
                  {data.data.eventLink}
                </a>
              </p>
              <p className="text-lg text-gray-700 mb-2">
                <strong className="text-gray-900">Event Start Date:</strong>{" "}
                {new Date(data.data.eventStartDate).toLocaleDateString()}{" "}
                {data.data.eventStartTime}
              </p>
              <p className="text-lg text-gray-700 mb-2">
                <strong className="text-gray-900">Event End Date:</strong>{" "}
                {new Date(data.data.eventEndDate).toLocaleDateString()}{" "}
                {data.data.eventEndTime}
              </p>
              <p className="text-lg text-gray-700 mb-2">
                <strong className="text-gray-900">Location Address:</strong>{" "}
                {data.data.locationAddress ?? "N/A"}
              </p>
              <p className="text-lg text-gray-700 mb-2">
                <strong className="text-gray-900">Additional Notes:</strong>{" "}
                {data.data.additionalNotes ?? "N/A"}
              </p>
            </div>
          </div>
        </>
      )}

      {/* Metadata Section */}
      <div className="mt-8 p-4 rounded-lg shadow-2xl">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
          Additional Details
        </h2>
        <p className="text-lg text-gray-700 mb-2">
          <strong className="text-gray-900">Event Media Type:</strong>{" "}
          {data.data.eventMediaType}
        </p>
        {data.data.eventMediaType === "movie" && (
          <>
            <p className="text-lg text-gray-700 mb-2">
              <strong className="text-gray-900">YouTube Video Id:</strong>{" "}
              {data.data.videoId}
            </p>
          </>
        )}
        <p className="text-lg text-gray-700 mb-2">
          <strong className="text-gray-900">Is Active:</strong>{" "}
          {data.data.isActive ? "Yes" : "No"}
        </p>
        <p className="text-lg text-gray-700 mb-2">
          <strong className="text-gray-900">Is Active on Web:</strong>{" "}
          {data.data.isActiveWeb ? "Yes" : "No"}
        </p>
        <p className="text-lg text-gray-700 mb-2">
          <strong className="text-gray-900">Like Count:</strong>{" "}
          {data.data.likeCount}
        </p>
        {(data.data.eventMediaType === "movie" ||
          data.data.eventMediaType === "other") && (
          <p className="text-lg text-gray-700 mb-2">
            <strong className="text-gray-900">Priority:</strong>{" "}
            {data.data.priority ?? "N/A"}
          </p>
        )}
      </div>

      {/* Images Row */}
      <div className="flex justify-right space-x-6 mt-6">
        {data.data.thumbnailUrl && (
          <div className="flex flex-col items-center">
            <p className="text-lg text-gray-600 mt-2 break-words">
              <strong className="text-gray-900">Thumbnail Image:</strong>
            </p>
            <img
              src={data.data.thumbnailUrl}
              alt="Thumbnail"
              className="w-32 h-auto object-cover rounded shadow-2xl"
            />
          </div>
        )}

        {data.data.coverImageUrl && (
          <div className="flex flex-col items-center">
            <p className="text-lg text-gray-600 mt-2 break-words">
              <strong className="text-gray-900">Cover Image:</strong>
            </p>
            <img
              src={data.data.coverImageUrl}
              alt="Cover"
              className="w-32 h-auto object-cover rounded shadow-2xl"
            />
          </div>
        )}

        {data.data.iconUrl && (
          <div className="flex flex-col items-center">
            <p className="text-lg text-gray-600 mt-2 break-words">
              <strong className="text-gray-900">Icon Image:</strong>
            </p>
            <img
              src={data.data.iconUrl}
              alt="Icon"
              className="w-16 h-16 object-cover rounded shadow-2xl"
            />
          </div>
        )}
      </div>
      <div className="mt-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Event Registrations</h2>
        <table className="min-w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 p-4">User</th>
              <th className="border border-gray-300 p-4">Phone</th>
              <th className="border border-gray-300 p-4">Ticket URL</th>
            </tr>
          </thead>
          <tbody>
            {data.data.eventRegistrations.map((registration:any, index:any) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="border border-gray-300 p-4">{registration.user.name}</td>
                <td className="border border-gray-300 p-4">{registration.user.phone}</td>
                <td className="border border-gray-300 p-4">
                  <a href={registration.ticket.ticketUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                    View Ticket
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
    </div>
  );
}
