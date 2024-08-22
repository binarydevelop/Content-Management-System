import { useLoaderData, useNavigate } from "@remix-run/react";
import { fetchEventDetails } from "~/utils/api";

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
        src={data.data.coverImageUrl ?? '/images/movie-fallback.jpg'}
        alt={data.data.title}
        className="mb-6 w-full h-auto object-cover rounded-lg shadow-md"
      />
      <p className="text-lg text-gray-700 mb-6">
        <strong className="text-gray-900">Storyline:</strong> {data.data.storyLine}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <p className="text-lg text-gray-700 mb-2">
            <strong className="text-gray-900">Director:</strong> {data.data.director}
          </p>
          <p className="text-lg text-gray-700 mb-2">
            <strong className="text-gray-900">Cast:</strong> {data.data.cast}
          </p>
          <p className="text-lg text-gray-700 mb-2">
            <strong className="text-gray-900">Trivia:</strong> {data.data.trivia}
          </p>
        </div>
      </div>

      {/* Metadata Section */}
      <div className="mt-8 p-4 rounded-lg shadow-2xl">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Additional Details</h2>
        <p className="text-lg text-gray-700 mb-2">
          <strong className="text-gray-900">YouTube Video Id:</strong> {data.data.videoId}
        </p>
        <p className="text-lg text-gray-700 mb-2">
          <strong className="text-gray-900">Is Active:</strong> {data.data.isActive ? "Yes" : "No"}
        </p>
        <p className="text-lg text-gray-700 mb-2">
          <strong className="text-gray-900">Is Active on Web:</strong> {data.data.isActiveWeb ? "Yes" : "No"}
        </p>
        <p className="text-lg text-gray-700 mb-2">
          <strong className="text-gray-900">Like Count:</strong> {data.data.likeCount}
        </p>
        <p className="text-lg text-gray-700 mb-2">
          <strong className="text-gray-900">Priority:</strong> {data.data.priority}
        </p>
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

        {data.data.iconImageUrl && (
          <div className="flex flex-col items-center">
            <p className="text-lg text-gray-600 mt-2 break-words">
              <strong className="text-gray-900">Icon Image:</strong>
            </p>
            <img
              src={data.data.iconImageUrl}
              alt="Icon"
              className="w-16 h-16 object-cover rounded shadow-2xl"
            />
            <p className="text-sm text-gray-600 mt-2 break-words">
              <strong className="text-gray-900">Icon Image URL:</strong> {data.data.iconImageUrl}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
