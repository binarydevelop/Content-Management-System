import { useLoaderData, useNavigate, Form } from "@remix-run/react";
import { fetchEventDetails, updateEvent } from "~/utils/api"; // Ensure this API call is correctly implemented
import { useState, useEffect } from "react";
import { redirect } from "@remix-run/node";

export const loader = async ({ params }: { params: { uuid: string } }) => {
    const { uuid } = params;
    const data = await fetchEventDetails(uuid); // Replace with your API call
    if (!data || !data.data) {
      throw new Response("Event not found", { status: 404 });
    }
    return data;
};

export const action = async ({ request, params }: { request: Request, params: { uuid: string } }) => {
  const { uuid } = params;
  const formData = await request.formData();

  try {
    await updateEvent(uuid, formData);
    return redirect(`/events/${uuid}`);
  } catch (error) {
    console.log(error, '@')
    throw new Response("Failed to update event", { status: 500 });
  }
};

export default function EditEvent() {
  const data: any = useLoaderData();
  const navigate = useNavigate();
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [thumbnailImage, setThumbnailImage] = useState<File | null>(null);
  const [iconImage, setIconImage] = useState<File | null>(null);

  useEffect(() => {
    console.log("Loaded data:", data.data); // Debugging line to check if data is loaded correctly
  }, [data]);

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <div className="p-6 max-w-5xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">
        Edit Event: {data.data.title}
      </h1>

      <Form method="put" encType="multipart/form-data">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-lg text-gray-700 mb-2">Title</label>
            <input
              type="text"
              name="title"
              defaultValue={data.data.title || ''}
              className="w-full px-4 py-2 rounded-lg border shadow-sm"
            />
          </div>

          <div>
            <label className="block text-lg text-gray-700 mb-2">Storyline</label>
            <textarea
              name="storyLine"
              defaultValue={data.data.storyLine || ''}
              className="w-full px-4 py-2 rounded-lg border shadow-sm"
            />
          </div>

          <div>
            <label className="block text-lg text-gray-700 mb-2">Director</label>
            <input
              type="text"
              name="director"
              defaultValue={data.data.director || ''}
              className="w-full px-4 py-2 rounded-lg border shadow-sm"
            />
          </div>

          <div>
            <label className="block text-lg text-gray-700 mb-2">Cast</label>
            <input
              type="text"
              name="cast"
              defaultValue={data.data.cast || ''}
              className="w-full px-4 py-2 rounded-lg border shadow-sm"
            />
          </div>

          <div>
            <label className="block text-lg text-gray-700 mb-2">Trivia</label>
            <textarea
              name="trivia"
              defaultValue={data.data.trivia || ''}
              className="w-full px-4 py-2 rounded-lg border shadow-sm"
            />
          </div>

          <div>
            <label className="block text-lg text-gray-700 mb-2">YouTube Video Id</label>
            <input
              type="text"
              name="videoId"
              defaultValue={data.data.videoId || ''}
              className="w-full px-4 py-2 rounded-lg border shadow-sm"
            />
          </div>

          <div>
            <label className="block text-lg text-gray-700 mb-2">Is Active</label>
            <select name="isActive" defaultValue={data.data.isActive ? 'true' : 'false'} className="w-full px-4 py-2 rounded-lg border shadow-sm">
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>

          <div>
            <label className="block text-lg text-gray-700 mb-2">Is Active on Web</label>
            <select name="isActiveWeb" defaultValue={data.data.isActiveWeb ? 'true' : 'false'} className="w-full px-4 py-2 rounded-lg border shadow-sm">
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>

          <div>
            <label className="block text-lg text-gray-700 mb-2">Like Count</label>
            <input
              type="number"
              name="likeCount"
              defaultValue={data.data.likeCount || ''}
              className="w-full px-4 py-2 rounded-lg border shadow-sm"
            />
          </div>

          <div>
            <label className="block text-lg text-gray-700 mb-2">Priority</label>
            <input
              type="number"
              name="priority"
              defaultValue={data.data.priority || ''}
              className="w-full px-4 py-2 rounded-lg border shadow-sm"
            />
          </div>

          {data.data?.eventStartDate && (
            <div>
              <label className="block text-lg text-gray-700 mb-2">Event Start Date</label>
              <input
                type="date"
                name="eventStartDate"
                defaultValue={data.data.eventStartDate ? new Date(data.data.eventStartDate).toISOString().split('T')[0] : ''}
                className="w-full px-4 py-2 rounded-lg border shadow-sm"
              />
            </div>
          )}

          {data.data?.eventEndDate && (
            <div>
              <label className="block text-lg text-gray-700 mb-2">Event End Date</label>
              <input
                type="date"
                name="eventEndDate"
                defaultValue={data.data.eventEndDate ? new Date(data.data.eventEndDate).toISOString().split('T')[0] : ''}
                className="w-full px-4 py-2 rounded-lg border shadow-sm"
              />
            </div>
          )}
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-lg text-gray-700 mb-2">Cover Image</label>
            <input
              type="file"
              name="coverImage"
              onChange={(e) => setCoverImage(e.target.files ? e.target.files[0] : null)}
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-lg text-gray-700 mb-2">Thumbnail Image</label>
            <input
              type="file"
              name="thumbnailImage"
              onChange={(e) => setThumbnailImage(e.target.files ? e.target.files[0] : null)}
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-lg text-gray-700 mb-2">Icon Image</label>
            <input
              type="file"
              name="iconImage"
              onChange={(e) => setIconImage(e.target.files ? e.target.files[0] : null)}
              className="w-full"
            />
          </div>
        </div>

        <div className="mt-6 flex justify-between">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-sm hover:bg-blue-700"
          >
            Update Event
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="px-4 py-2 bg-gray-600 text-white rounded-lg shadow-sm hover:bg-gray-700"
          >
            Cancel
          </button>
        </div>
      </Form>
    </div>
  );
}
