import { json, redirect, LoaderFunction, ActionFunction } from "@remix-run/node";
import { Form, useLoaderData, useNavigate } from "@remix-run/react";
import { createEvent } from "~/utils/events-api";
import { useState } from "react";

export const loader: LoaderFunction = async () => {
    return json({
        apiBaseUrl: process.env.API_BASE_URL,
        apiVersion: process.env.API_VERSION,
        apiAuthToken: process.env.API_AUTH_TOKEN,
    });
};

export const action: ActionFunction = async ({ request }) => {
    const formData = await request.formData();
    const eventType = formData.get('eventType')
    const mappedEventType = mapEventType(eventType as string)
    try {
        await createEvent(formData, mappedEventType, {
            baseUrl: process.env.API_BASE_URL,
            apiToken: process.env.API_AUTH_TOKEN,
            apiVersion: process.env.API_VERSION,
        });

        return redirect("/events");
    } catch (error) {
        console.error("Failed to create event", error);
        return json({ error: "Failed to create event" }, { status: 500 });
    }
};

const mapEventType = (type: string) => {
    switch (type) {
        case "cinema hall":
            return "movie";
        case "pop-up-club":
            return "pop-up-club";
        case "workshop":
            return "online";
        case "games":
            return "games";
        default:
            return "unknown";
    }
};

export default function CreateEvent() {
    const navigate = useNavigate();
    const [eventType, setEventType] = useState("cinema hall");
    const [eventMediaType, setEventMediaType] = useState("movie");
    const [isActive, setIsActive] = useState(true);
    const [isActiveWeb, setIsActiveWeb] = useState(true);

    const handleEventTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setEventType(e.target.value);
    };

    const handleEventMediaTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setEventMediaType(e.target.value);
    };

    return (
        <div className="container mx-auto py-8">
            <h1 className="text-2xl mb-4 font-semibold">Create New Event</h1>
            <div className="bg-white shadow-2xl rounded-xl p-8">
                <Form method="post" encType="multipart/form-data" className="space-y-4">
                    <div>
                        <label htmlFor="eventType" className="block font-medium text-xl text-gray-700">
                            Event Type
                        </label>
                        <select
                            id="eventType"
                            name="eventType"
                            value={eventType}
                            onChange={handleEventTypeChange}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                        >
                            <option value="cinema hall">Cinema Hall</option>
                            <option value="workshop">Workshop</option>
                            {/* <option value="pop-up-club">Pop-up Club</option> */}
                            <option value="games">Games</option>
                        </select>
                    </div>

                    <div>
                        <label htmlFor="eventMediaType" className="block font-medium text-xl text-gray-700">
                            Event Media Type
                        </label>
                        <select
                            id="eventMediaType"
                            name="eventMediaType"
                            value={eventMediaType}
                            onChange={handleEventMediaTypeChange}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                        >
                            <option value="movie">Movie</option>
                            <option value="other">Other</option>
                            <option value="carnival">Carnival</option>
                        </select>
                    </div>

                    {eventType === "cinema hall" && (
                        <>
                            {/* Cinema Hall Fields */}
                            <div>
                                <label htmlFor="title" className="block font-medium text-xl text-gray-700">
                                    Title
                                </label>
                                <input
                                    type="text"
                                    id="title"
                                    name="title"
                                    required
                                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                                />
                            </div>
                            <div>
                                <label htmlFor="eventStartDate" className="block font-medium text-xl text-gray-700">
                                    Event Start Date and Time
                                </label>
                                <input
                                    type="datetime-local"
                                    id="eventStartDate"
                                    name="eventStartDate"
                                    required
                                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                                />
                            </div>
                            <div>
                                <label htmlFor="eventLink" className="block font-medium text-xl text-gray-700">
                                    Event Link
                                </label>
                                <input
                                    type="url"
                                    id="eventLink"
                                    name="eventLink"
                                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                                />
                            </div>
                            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div>
                                    <label className="block text-lg text-gray-700 mb-2">Cover Image</label>
                                    <input
                                        type="file"
                                        id="coverImage"
                                        name="coverImage"
                                        className="w-full"
                                    />
                                </div>

                                <div>
                                    <label className="block text-lg text-gray-700 mb-2">Thumbnail Image</label>
                                    <input
                                        type="file"
                                        id="thumbnailImage"
                                        name="thumbnailImage"
                                        className="w-full"
                                    />
                                </div>

                                <div>
                                    <label className="block text-lg text-gray-700 mb-2">Icon Image</label>
                                    <input
                                        type="file"
                                        id="iconImage"
                                        name="iconImage"
                                        className="w-full"
                                    />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="cast" className="block font-medium text-xl text-gray-700">
                                    Cast
                                </label>
                                <input
                                    type="text"
                                    id="cast"
                                    name="cast"
                                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                                />
                            </div>
                            <div>
                                <label htmlFor="director" className="block font-medium text-xl text-gray-700">
                                    Director
                                </label>
                                <input
                                    type="text"
                                    id="director"
                                    name="director"
                                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                                />
                            </div>
                            <div>
                                <label htmlFor="storyLine" className="block font-medium text-xl text-gray-700">
                                    Story Line
                                </label>
                                <textarea
                                    id="storyLine"
                                    name="storyLine"
                                    rows={4}
                                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                                />
                            </div>
                            <div>
                                <label htmlFor="priority" className="block font-medium text-xl text-gray-700">
                                    Priority
                                </label>
                                <input
                                    type="number"
                                    id="priority"
                                    name="priority"
                                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                                />
                            </div>
                            <div>
                                <label htmlFor="videoId" className="block font-medium text-xl text-gray-700">
                                    Video ID
                                </label>
                                <input
                                    type="text"
                                    id="videoId"
                                    name="videoId"
                                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                                />
                            </div>
                            <div>
                                <label htmlFor="isActive" className="block font-medium text-xl text-gray-700">
                                    Is Active
                                </label>
                                <input
                                    type="checkbox"
                                    id="isActive"
                                    name="isActive"
                                    checked={isActive}
                                    onChange={(e) => setIsActive(e.target.checked)}
                                    className="mt-1"
                                />
                            </div>
                            <div>
                                <label htmlFor="isActiveWeb" className="block font-medium text-xl text-gray-700">
                                    Is Active on Web
                                </label>
                                <input
                                    type="checkbox"
                                    id="isActiveWeb"
                                    name="isActiveWeb"
                                    checked={isActiveWeb}
                                    onChange={(e) => setIsActiveWeb(e.target.checked)}
                                    className="mt-1"
                                />
                            </div>
                            <div>
                                <label htmlFor="trivia" className="block font-medium text-xl text-gray-700">
                                    Trivia
                                </label>
                                <textarea
                                    id="trivia"
                                    name="trivia"
                                    rows={4}
                                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                                />
                            </div>
                        </>
                    )}

                    {eventType === "workshop" && (
                        <>
                            {/* Workshop Specific Fields */}
                            <div>
                                <label htmlFor="title" className="block font-medium text-xl text-gray-700">
                                    Title
                                </label>
                                <input
                                    type="text"
                                    id="title"
                                    name="title"
                                    required
                                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                                />
                            </div>
                            <div>
                                <label htmlFor="description" className="block font-medium text-xl text-gray-700">
                                    Description
                                </label>
                                <textarea
                                    id="description"
                                    name="description"
                                    rows={4}
                                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                                />
                            </div>
                            <div>
                                <label htmlFor="eventStartDate" className="block font-medium text-xl text-gray-700">
                                    Event Start Date
                                </label>
                                <input
                                    type="datetime-local"
                                    id="eventStartDate"
                                    name="eventStartDate"
                                    required
                                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                                />
                            </div>
                            <div>
                                <label htmlFor="eventStartTime" className="block font-medium text-xl text-gray-700">
                                    Event Start Time
                                </label>
                                <input
                                    type="text"
                                    id="eventStartTime"
                                    name="eventStartTime"
                                    required
                                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                                />
                            </div>
                            <div>
                                <label htmlFor="eventEndDate" className="block font-medium text-xl text-gray-700">
                                    Event End Date
                                </label>
                                <input
                                    type="datetime-local"
                                    id="eventEndDate"
                                    name="eventEndDate"
                                    required
                                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                                />
                            </div>
                            <div>
                                <label htmlFor="eventEndTime" className="block font-medium text-xl text-gray-700">
                                    Event End Time
                                </label>
                                <input
                                    type="text"
                                    id="eventEndTime"
                                    name="eventEndTime"
                                    required
                                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                                />
                            </div>
                            <div>
                                <label htmlFor="eventLocation" className="block font-medium text-xl text-gray-700">
                                    Event Location
                                </label>
                                <input
                                    type="text"
                                    id="eventLocation"
                                    name="eventLocation"
                                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                                />
                            </div>
                            <div>
                                <label htmlFor="eventLink" className="block font-medium text-xl text-gray-700">
                                    Event Link
                                </label>
                                <input
                                    type="url"
                                    id="eventLink"
                                    name="eventLink"
                                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                                />
                            </div>
                            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div>
                                    <label className="block text-lg text-gray-700 mb-2">Cover Image</label>
                                    <input
                                        type="file"
                                        id="coverImage"
                                        name="coverImage"
                                        className="w-full"
                                    />
                                </div>

                                <div>
                                    <label className="block text-lg text-gray-700 mb-2">Thumbnail Image</label>
                                    <input
                                        type="file"
                                        id="thumbnailImage"
                                        name="thumbnailImage"
                                        className="w-full"
                                    />
                                </div>

                                <div>
                                    <label className="block text-lg text-gray-700 mb-2">Icon Image</label>
                                    <input
                                        type="file"
                                        id="iconImage"
                                        name="iconImage"
                                        className="w-full"
                                    />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="priority" className="block font-medium text-xl text-gray-700">
                                    Priority
                                </label>
                                <input
                                    type="number"
                                    id="priority"
                                    name="priority"
                                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                                />
                            </div>
                            <div>
                                <label htmlFor="isActive" className="block font-medium text-xl text-gray-700">
                                    Is Active
                                </label>
                                <input
                                    type="checkbox"
                                    id="isActive"
                                    name="isActive"
                                    checked={isActive}
                                    onChange={(e) => setIsActive(e.target.checked)}
                                    className="mt-1"
                                />
                            </div>
                            <div>
                                <label htmlFor="isActiveWeb" className="block font-medium text-xl text-gray-700">
                                    Is Active on Web
                                </label>
                                <input
                                    type="checkbox"
                                    id="isActiveWeb"
                                    name="isActiveWeb"
                                    checked={isActiveWeb}
                                    onChange={(e) => setIsActiveWeb(e.target.checked)}
                                    className="mt-1"
                                />
                            </div>
                        </>
                    )}
                    {eventType === "pop-up-club" && (
                        <>
                            {/* Workshop Specific Fields */}
                            <div>
                                <label htmlFor="title" className="block font-medium text-xl text-gray-700">
                                    Title
                                </label>
                                <input
                                    type="text"
                                    id="title"
                                    name="title"
                                    required
                                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                                />
                            </div>
                            <div>
                                <label htmlFor="description" className="block font-medium text-xl text-gray-700">
                                    Description
                                </label>
                                <textarea
                                    id="description"
                                    name="description"
                                    rows={4}
                                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                                />
                            </div>
                            <div>
                                <label htmlFor="eventStartDate" className="block font-medium text-xl text-gray-700">
                                    Event Start Date
                                </label>
                                <input
                                    type="datetime-local"
                                    id="eventStartDate"
                                    name="eventStartDate"
                                    required
                                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                                />
                            </div>
                            <div>
                                <label htmlFor="price" className="block font-medium text-xl text-gray-700">
                                    Price
                                </label>
                                <input
                                    type="number"
                                    id="price"
                                    name="price"
                                    required
                                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                                />
                            </div>
                            <div>
                                <label htmlFor="eventStartTime" className="block font-medium text-xl text-gray-700">
                                    Event Start Time
                                </label>
                                <input
                                    type="text"
                                    id="eventStartTime"
                                    name="eventStartTime"
                                    required
                                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                                />
                            </div>
                            <div>
                                <label htmlFor="eventEndDate" className="block font-medium text-xl text-gray-700">
                                    Event End Date
                                </label>
                                <input
                                    type="datetime-local"
                                    id="eventEndDate"
                                    name="eventEndDate"
                                    required
                                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                                />
                            </div>
                            <div>
                                <label htmlFor="eventEndTime" className="block font-medium text-xl text-gray-700">
                                    Event End Time
                                </label>
                                <input
                                    type="text"
                                    id="eventEndTime"
                                    name="eventEndTime"
                                    required
                                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                                />
                            </div>
                            <div>
                                <label htmlFor="locationAddress" className="block font-medium text-xl text-gray-700">
                                    Location Address
                                </label>
                                <input
                                    type="text"
                                    id="locationAddress"
                                    name="locationAddress"
                                    required
                                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                                />
                            </div>
                            <div>
                                <label htmlFor="eventLocation" className="block font-medium text-xl text-gray-700">
                                    Event Location
                                </label>
                                <input
                                    type="text"
                                    id="eventLocation"
                                    name="eventLocation"
                                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                                />
                            </div>
                            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div>
                                    <label className="block text-lg text-gray-700 mb-2">Cover Image</label>
                                    <input
                                        type="file"
                                        id="coverImage"
                                        name="coverImage"
                                        className="w-full"
                                    />
                                </div>

                                <div>
                                    <label className="block text-lg text-gray-700 mb-2">Thumbnail Image</label>
                                    <input
                                        type="file"
                                        id="thumbnailImage"
                                        name="thumbnailImage"
                                        className="w-full"
                                    />
                                </div>

                                <div>
                                    <label className="block text-lg text-gray-700 mb-2">Icon Image</label>
                                    <input
                                        type="file"
                                        id="iconImage"
                                        name="iconImage"
                                        className="w-full"
                                    />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="priority" className="block font-medium text-xl text-gray-700">
                                    Priority
                                </label>
                                <input
                                    type="number"
                                    id="priority"
                                    name="priority"
                                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                                />
                            </div>
                            <div>
                                <label htmlFor="isActive" className="block font-medium text-xl text-gray-700">
                                    Is Active
                                </label>
                                <input
                                    type="checkbox"
                                    id="isActive"
                                    name="isActive"
                                    checked={isActive}
                                    onChange={(e) => setIsActive(e.target.checked)}
                                    className="mt-1"
                                />
                            </div>
                            <div>
                                <label htmlFor="isActiveWeb" className="block font-medium text-xl text-gray-700">
                                    Is Active on Web
                                </label>
                                <input
                                    type="checkbox"
                                    id="isActiveWeb"
                                    name="isActiveWeb"
                                    checked={isActiveWeb}
                                    onChange={(e) => setIsActiveWeb(e.target.checked)}
                                    className="mt-1"
                                />
                            </div>

                        </>
                    )}
                    {eventType === "games" && (
                        <>
                            {/* Workshop Specific Fields */}
                            <div>
                                <label htmlFor="title" className="block font-medium text-xl text-gray-700">
                                    Title
                                </label>
                                <input
                                    type="text"
                                    id="title"
                                    name="title"
                                    required
                                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                                />
                            </div>
                            <div>
                                <label htmlFor="description" className="block font-medium text-xl text-gray-700">
                                    Description
                                </label>
                                <textarea
                                    id="description"
                                    name="description"
                                    rows={4}
                                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                                />
                            </div>
                            <div>
                                <label htmlFor="eventStartDate" className="block font-medium text-xl text-gray-700">
                                    Event Start Date
                                </label>
                                <input
                                    type="datetime-local"
                                    id="eventStartDate"
                                    name="eventStartDate"
                                    required
                                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                                />
                            </div>
                            <div>
                                <label htmlFor="eventLink" className="block font-medium text-xl text-gray-700">
                                    Event Link
                                </label>
                                <input
                                    type="text"
                                    id="eventLink"
                                    name="eventLink"
                                    required
                                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                                />
                            </div>
                            <div>
                                <label htmlFor="eventStartTime" className="block font-medium text-xl text-gray-700">
                                    Event Start Time
                                </label>
                                <input
                                    type="text"
                                    id="eventStartTime"
                                    name="eventStartTime"
                                    required
                                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                                />
                            </div>
                            <div>
                                <label htmlFor="eventEndDate" className="block font-medium text-xl text-gray-700">
                                    Event End Date
                                </label>
                                <input
                                    type="datetime-local"
                                    id="eventEndDate"
                                    name="eventEndDate"
                                    required
                                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                                />
                            </div>
                            <div>
                                <label htmlFor="eventEndTime" className="block font-medium text-xl text-gray-700">
                                    Event End Time
                                </label>
                                <input
                                    type="text"
                                    id="eventEndTime"
                                    name="eventEndTime"
                                    required
                                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                                />
                            </div>
                            <div>
                                <label htmlFor="eventLocation" className="block font-medium text-xl text-gray-700">
                                    Event Location
                                </label>
                                <input
                                    type="text"
                                    id="eventLocation"
                                    name="eventLocation"
                                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                                />
                            </div>
                            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div>
                                    <label className="block text-lg text-gray-700 mb-2">Cover Image</label>
                                    <input
                                        type="file"
                                        id="coverImage"
                                        name="coverImage"
                                        className="w-full"
                                    />
                                </div>

                                <div>
                                    <label className="block text-lg text-gray-700 mb-2">Thumbnail Image</label>
                                    <input
                                        type="file"
                                        id="thumbnailImage"
                                        name="thumbnailImage"
                                        className="w-full"
                                    />
                                </div>

                                <div>
                                    <label className="block text-lg text-gray-700 mb-2">Icon Image</label>
                                    <input
                                        type="file"
                                        id="iconImage"
                                        name="iconImage"
                                        className="w-full"
                                    />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="priority" className="block font-medium text-xl text-gray-700">
                                    Priority
                                </label>
                                <input
                                    type="number"
                                    id="priority"
                                    name="priority"
                                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                                />
                            </div>
                            <div>
                                <label htmlFor="isActive" className="block font-medium text-xl text-gray-700">
                                    Is Active
                                </label>
                                <input
                                    type="checkbox"
                                    id="isActive"
                                    name="isActive"
                                    checked={isActive}
                                    onChange={(e) => setIsActive(e.target.checked)}
                                    className="mt-1"
                                />
                            </div>
                            <div>
                                <label htmlFor="isActiveWeb" className="block font-medium text-xl text-gray-700">
                                    Is Active on Web
                                </label>
                                <input
                                    type="checkbox"
                                    id="isActiveWeb"
                                    name="isActiveWeb"
                                    checked={isActiveWeb}
                                    onChange={(e) => setIsActiveWeb(e.target.checked)}
                                    className="mt-1"
                                />
                            </div>

                        </>
                    )}

                    <div className="mt-6">
                        <button
                            type="submit"
                            className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
                        >
                            Create Event
                        </button>
                        <button
                            type="button"
                            className="inline-flex items-center justify-center px-4 py-2 ml-4 border border-transparent text-base font-medium rounded-md shadow-sm text-gray-700 bg-white border-gray-300 hover:bg-gray-50"
                            onClick={() => navigate("/events")}
                        >
                            Cancel
                        </button>
                    </div>
                </Form>
            </div>
        </div>
    );
}
