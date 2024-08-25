import { useLoaderData } from "@remix-run/react";
import { fetchAllEvents, fetchEvents } from "~/utils/api";
import { Link } from "@remix-run/react";

export const loader = async ({ request }: { request: Request }) => {
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get("page") || "1", 10);
    const perPage = parseInt(url.searchParams.get("perPage") || "100", 10);
    const data = await fetchEvents({ page, perPage, eventType: 'all' });
    console.log(data);
    return data;
};

export default function VerticalCalendar() {
    const data: any = useLoaderData();

    return (
        <div className="flex justify-center items-center">
            <div className="w-full max-w-6xl p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                <div className="flex items-center justify-between mb-4">
                    <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white text-center">All Events</h5>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {data?.events.map((event: any) => (
                        <Link
                            to={`/events/${event.uuid}`}
                            key={event.uuid}
                            className="block p-4 bg-white border border-gray-200 rounded-lg shadow-lg hover:bg-gray-50 transition dark:bg-gray-700 dark:border-gray-600 dark:hover:bg-gray-600"
                        >
                            <div className="flex items-start gap-4">
                                <img
                                    className="w-16 h-16 rounded-full object-cover"
                                    src={event.coverImageUrl ?? "/images/event-fallback.jpg"}
                                    alt={event.title}
                                />
                                <div className="flex flex-col gap-2 w-full">
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                        {event.title}
                                    </h3>
                                    <span className="text-sm text-gray-500 dark:text-gray-400">
                                        {event.eventMediaType === 'movie' && `🎬 Movie`}
                                    </span>
                                    <p className="text-sm text-gray-600 dark:text-gray-300">
                                        {event.extendedTitle}
                                    </p>
                                    <div className="flex justify-between items-center mt-2">
                                        <span className="text-sm text-gray-500 dark:text-gray-400">
                                            {new Date(event.eventStartDate).toDateString()}
                                        </span>
                                        <span className="text-sm text-gray-500 dark:text-gray-400">
                                            {event.eventStartTime}
                                            {event.eventEndTime ? ` - ${event.eventEndTime}` : ''}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
