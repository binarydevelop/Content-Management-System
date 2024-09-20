import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable, redirect, json } from "@remix-run/node";
import { RemixServer, Link, Meta, Links, Outlet, ScrollRestoration, Scripts, LiveReload, useLoaderData, useNavigate, Form } from "@remix-run/react";
import { isbot } from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import { CalendarIcon, VideoCameraIcon, UserIcon } from "@heroicons/react/16/solid";
import { HomeIcon, PlusCircleIcon, FilmIcon, WrenchScrewdriverIcon, SparklesIcon, PuzzlePieceIcon, RectangleGroupIcon, CalendarDaysIcon } from "@heroicons/react/24/solid";
import { useState, useEffect } from "react";
const ABORT_DELAY = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, remixContext, loadContext) {
  return isbot(request.headers.get("user-agent") || "") ? handleBotRequest(
    request,
    responseStatusCode,
    responseHeaders,
    remixContext
  ) : handleBrowserRequest(
    request,
    responseStatusCode,
    responseHeaders,
    remixContext
  );
}
function handleBotRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(
        RemixServer,
        {
          context: remixContext,
          url: request.url,
          abortDelay: ABORT_DELAY
        }
      ),
      {
        onAllReady() {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
          pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}
function handleBrowserRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(
        RemixServer,
        {
          context: remixContext,
          url: request.url,
          abortDelay: ABORT_DELAY
        }
      ),
      {
        onShellReady() {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
          pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}
const entryServer = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: handleRequest
}, Symbol.toStringTag, { value: "Module" }));
const Sidebar = () => {
  return /* @__PURE__ */ jsxs("div", { className: "fixed top-0 left-0 h-full w-64 bg-gray-800 text-white p-6", children: [
    /* @__PURE__ */ jsx("div", { className: "p-4 flex items-center justify-center", children: /* @__PURE__ */ jsx(
      "img",
      {
        src: "/images/logo.png",
        alt: "Logo",
        className: "w-32 h-auto"
      }
    ) }),
    /* @__PURE__ */ jsx("hr", { className: "my-4 border-gray-700" }),
    /* @__PURE__ */ jsx("nav", { className: "mt-10", children: /* @__PURE__ */ jsxs("ul", { children: [
      /* @__PURE__ */ jsx("li", { className: "mb-4", children: /* @__PURE__ */ jsxs(Link, { to: "/events", className: "flex items-center py-2 px-4 rounded hover:bg-gray-700", children: [
        /* @__PURE__ */ jsx(CalendarIcon, { className: "w-6 h-6 mr-3" }),
        "Events"
      ] }) }),
      /* @__PURE__ */ jsx("li", { className: "mb-4", children: /* @__PURE__ */ jsxs(Link, { to: "/posts", className: "flex items-center py-2 px-4 rounded hover:bg-gray-700", children: [
        /* @__PURE__ */ jsx(VideoCameraIcon, { className: "w-6 h-6 mr-3" }),
        "Media Library"
      ] }) }),
      /* @__PURE__ */ jsx("li", { className: "mb-4", children: /* @__PURE__ */ jsxs(Link, { to: "/users", className: "flex items-center py-2 px-4 rounded hover:bg-gray-700", children: [
        /* @__PURE__ */ jsx(UserIcon, { className: "w-6 h-6 mr-3" }),
        "Users"
      ] }) }),
      /* @__PURE__ */ jsx("hr", { className: "my-4 border-gray-700" }),
      /* @__PURE__ */ jsx("li", { className: "mb-4", children: /* @__PURE__ */ jsxs(Link, { to: "/", className: "flex items-center py-2 px-4 rounded hover:bg-gray-700", children: [
        /* @__PURE__ */ jsx(HomeIcon, { className: "w-6 h-6 mr-3" }),
        "Home"
      ] }) })
    ] }) })
  ] });
};
function Layout({ children }) {
  return /* @__PURE__ */ jsxs("html", { lang: "en", children: [
    /* @__PURE__ */ jsxs("head", { children: [
      /* @__PURE__ */ jsx("meta", { charSet: "utf-8" }),
      /* @__PURE__ */ jsx("meta", { name: "viewport", content: "width=device-width, initial-scale=1" }),
      /* @__PURE__ */ jsx(Meta, {}),
      /* @__PURE__ */ jsx(Links, {})
    ] }),
    /* @__PURE__ */ jsxs("body", { children: [
      children,
      /* @__PURE__ */ jsx(ScrollRestoration, {}),
      /* @__PURE__ */ jsx(Scripts, {})
    ] })
  ] });
}
function App() {
  return /* @__PURE__ */ jsxs("html", { lang: "en", children: [
    /* @__PURE__ */ jsxs("head", { children: [
      /* @__PURE__ */ jsx(Meta, {}),
      /* @__PURE__ */ jsx(Links, {})
    ] }),
    /* @__PURE__ */ jsxs("body", { children: [
      /* @__PURE__ */ jsxs("div", { className: "flex", children: [
        /* @__PURE__ */ jsx(Sidebar, {}),
        /* @__PURE__ */ jsx("main", { className: "flex-1 p-6", children: /* @__PURE__ */ jsx(Outlet, {}) })
      ] }),
      /* @__PURE__ */ jsx(ScrollRestoration, {}),
      /* @__PURE__ */ jsx(Scripts, {}),
      /* @__PURE__ */ jsx(LiveReload, {})
    ] })
  ] });
}
const route0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Layout,
  default: App
}, Symbol.toStringTag, { value: "Module" }));
async function fetchEvents({
  page,
  perPage,
  eventType
}) {
  const apiUrl = new URL(`${process.env.API_BASE_URL}/${process.env.API_VERSION}/events/listing`);
  apiUrl.searchParams.append("page", page.toString());
  apiUrl.searchParams.append("perPage", perPage.toString());
  apiUrl.searchParams.append("eventType", eventType);
  const response = await fetch(apiUrl.toString(), {
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.API_AUTH_TOKEN}`
    }
  });
  if (!response.ok) {
    throw new Error(`Failed to fetch ${eventType}`);
  }
  const data = await response.json();
  return {
    events: data.data,
    hasNextPage: data.hasNextPage,
    page,
    perPage
  };
}
async function fetchEventDetails(uuid) {
  const apiUrl = new URL(`${process.env.API_BASE_URL}/${process.env.API_VERSION}/events/details/${uuid}`);
  const response = await fetch(apiUrl.toString(), {
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.API_AUTH_TOKEN}`
    }
  });
  if (!response.ok) {
    throw new Error("Failed to fetch movie details");
  }
  return response.json();
}
const updateEvent = async (uuid, formData) => {
  try {
    const apiUrl = new URL(`${process.env.API_BASE_URL}/${process.env.API_VERSION}/events/update/${uuid}`);
    const response = await fetch(apiUrl.toString(), {
      method: "PUT",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.API_AUTH_TOKEN}`
      },
      body: formData
    });
    if (!response.ok) {
      throw new Error(`Status: ${response.status}, Message: ${response.statusText}`);
    }
    return response.json();
  } catch (error) {
    console.error("Error updating event:", error);
    throw error;
  }
};
async function createEvent(formData, eventType, config) {
  const response = await fetch(`${config.baseUrl}/${config.apiVersion}/events/create?eventType=${eventType}`, {
    method: "POST",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${config.apiToken}`
    },
    body: formData
  });
  if (!response.ok) {
    console.error(`Failed to create event. Status: ${response.status}. Response: ${await response.text()}`);
    throw new Error(`Failed to create event: ${response.statusText}`);
  }
  return response.json();
}
async function fetchAllEvents() {
  const apiUrl = new URL(`${process.env.API_BASE_URL}/${process.env.API_VERSION}/events/all`);
  const response = await fetch(apiUrl.toString(), {
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.API_AUTH_TOKEN}`
    }
  });
  if (!response.ok) {
    throw new Error("Failed to fetch events");
  }
  return response.json();
}
async function fetchEventUsers(eventId, config) {
  const apiUrl = new URL(`${config.baseUrl}/${config.apiVersion}/events/registrations/${eventId}`);
  console.log(apiUrl, config);
  const response = await fetch(apiUrl.toString(), {
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${config.apiToken}`
    }
  });
  if (!response.ok) {
    throw new Error("Failed to fetch event regiostrations.");
  }
  return response.json();
}
const loader$8 = async () => {
  const data = await fetchAllEvents();
  data.config = {
    apiBaseUrl: process.env.API_BASE_URL,
    apiVersion: process.env.API_VERSION,
    apiAuthToken: process.env.API_AUTH_TOKEN
  };
  return data;
};
function EventsListing() {
  const data = useLoaderData();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedEventUsers, setSelectedEventUsers] = useState(null);
  const handleEventClick = async (eventId) => {
    const userData = await fetchEventUsers(eventId, {
      baseUrl: data.config.apiBaseUrl,
      apiToken: data.config.apiAuthToken,
      apiVersion: data.config.apiVersion
    });
    setSelectedEventUsers(userData.data);
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
    setSelectedEventUsers(null);
  };
  return /* @__PURE__ */ jsxs("div", { className: "p-6 max-w-5xl mx-auto", children: [
    /* @__PURE__ */ jsx("h1", { className: "text-4xl font-bold text-gray-900 mb-6 text-center", children: "All Events" }),
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6", children: data.data.map((event) => /* @__PURE__ */ jsxs(
      "div",
      {
        className: "p-4 bg-white shadow-2xl rounded-lg cursor-pointer",
        onClick: () => handleEventClick(event.uuid),
        children: [
          /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-gray-900 mb-2", children: event.title }),
          /* @__PURE__ */ jsx(
            "img",
            {
              src: event.coverImageUrl ?? "/images/event-fallback.jpg",
              alt: event.title,
              className: "mb-4 w-full h-32 object-cover rounded-lg shadow-md"
            }
          ),
          /* @__PURE__ */ jsx("p", { className: "text-lg text-gray-700", children: event.extendedTitle })
        ]
      },
      event.uuid
    )) }),
    modalOpen && /* @__PURE__ */ jsx("div", { className: "fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center", children: /* @__PURE__ */ jsxs("div", { className: "bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-gray-900 mb-4", children: "Registered Users" }),
      /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "min-w-full bg-white border border-gray-200", children: [
        /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { children: [
          /* @__PURE__ */ jsx("th", { className: "px-4 py-2 border-b", children: "#" }),
          /* @__PURE__ */ jsx("th", { className: "px-4 py-2 border-b", children: "Name" }),
          /* @__PURE__ */ jsx("th", { className: "px-4 py-2 border-b", children: "Phone Number" })
        ] }) }),
        /* @__PURE__ */ jsx("tbody", { children: selectedEventUsers == null ? void 0 : selectedEventUsers.map((user, index) => /* @__PURE__ */ jsxs("tr", { className: "hover:bg-gray-100", children: [
          /* @__PURE__ */ jsx("td", { className: "px-4 py-2 border-b text-center", children: index + 1 }),
          /* @__PURE__ */ jsx("td", { className: "px-4 py-2 border-b text-center", children: user.user.name }),
          /* @__PURE__ */ jsx("td", { className: "px-4 py-2 border-b text-center", children: user.user.phone })
        ] }, user.id)) })
      ] }) }),
      /* @__PURE__ */ jsxs("p", { className: "text-lg text-gray-900 my-4", children: [
        "Total Users: ",
        selectedEventUsers == null ? void 0 : selectedEventUsers.length
      ] }),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: closeModal,
          className: "bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded",
          children: "Close"
        }
      )
    ] }) })
  ] });
}
const route1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: EventsListing,
  loader: loader$8
}, Symbol.toStringTag, { value: "Module" }));
const loader$7 = async ({ request }) => {
  const url = new URL(request.url);
  const page = parseInt(url.searchParams.get("page") || "1", 10);
  const perPage = parseInt(url.searchParams.get("perPage") || "25", 10);
  return fetchEvents({ page, perPage, eventType: "pop-up-club" });
};
function PopUpClub() {
  const data = useLoaderData();
  return /* @__PURE__ */ jsxs("div", { className: "p-4", children: [
    /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold mb-4 text-center", children: "Pop Up Club" }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center", children: [
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl w-full", children: data.events.map((event) => /* @__PURE__ */ jsxs(
        Link,
        {
          to: `/events/${event.uuid}`,
          className: "flex flex-col items-center p-4 border rounded shadow-2xl max-w-xs w-full transition-transform transform hover:scale-105 hover:shadow-xl",
          children: [
            /* @__PURE__ */ jsx(
              "img",
              {
                src: event.thumbnailUrl,
                alt: event.title,
                className: "mb-2 w-full h-auto rounded"
              }
            ),
            /* @__PURE__ */ jsx("h2", { className: "text-xl font-bold mb-2 text-center", children: event.title })
          ]
        },
        event.uuid
      )) }),
      /* @__PURE__ */ jsxs("div", { className: "flex justify-center mt-4 space-x-4", children: [
        data.page > 1 && /* @__PURE__ */ jsx("a", { href: `?page=${data.page - 1}&perPage=${data.perPage}`, className: "btn", children: "Previous" }),
        data.hasNextPage && /* @__PURE__ */ jsx("a", { href: `?page=${data.page + 1}&perPage=${data.perPage}`, className: "btn", children: "Next" })
      ] })
    ] })
  ] });
}
const route2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: PopUpClub,
  loader: loader$7
}, Symbol.toStringTag, { value: "Module" }));
const loader$6 = async ({ params }) => {
  const { uuid } = params;
  const data = await fetchEventDetails(uuid);
  if (!data || !data.data) {
    throw new Response("Event not found", { status: 404 });
  }
  return data;
};
const action$1 = async ({ request, params }) => {
  const { uuid } = params;
  const formData = await request.formData();
  try {
    await updateEvent(uuid, formData);
    return redirect(`/events/${uuid}`);
  } catch (error) {
    console.log(error, "@");
    throw new Response("Failed to update event", { status: 500 });
  }
};
function EditEvent() {
  var _a, _b;
  const data = useLoaderData();
  const navigate = useNavigate();
  const [coverImage, setCoverImage] = useState(null);
  const [thumbnailImage, setThumbnailImage] = useState(null);
  const [iconImage, setIconImage] = useState(null);
  useEffect(() => {
    console.log("Loaded data:", data.data);
  }, [data]);
  const handleCancel = () => {
    navigate(-1);
  };
  return /* @__PURE__ */ jsxs("div", { className: "p-6 max-w-5xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden", children: [
    /* @__PURE__ */ jsxs("h1", { className: "text-3xl font-bold text-gray-900 mb-6 text-center", children: [
      "Edit Event: ",
      data.data.title
    ] }),
    /* @__PURE__ */ jsxs(Form, { method: "put", encType: "multipart/form-data", children: [
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block text-lg text-gray-700 mb-2", children: "Title" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              name: "title",
              defaultValue: data.data.title || "",
              className: "w-full px-4 py-2 rounded-lg border shadow-sm"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block text-lg text-gray-700 mb-2", children: "Storyline" }),
          /* @__PURE__ */ jsx(
            "textarea",
            {
              name: "storyLine",
              defaultValue: data.data.storyLine || "",
              className: "w-full px-4 py-2 rounded-lg border shadow-sm"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block text-lg text-gray-700 mb-2", children: "Director" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              name: "director",
              defaultValue: data.data.director || "",
              className: "w-full px-4 py-2 rounded-lg border shadow-sm"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block text-lg text-gray-700 mb-2", children: "Cast" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              name: "cast",
              defaultValue: data.data.cast || "",
              className: "w-full px-4 py-2 rounded-lg border shadow-sm"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block text-lg text-gray-700 mb-2", children: "Trivia" }),
          /* @__PURE__ */ jsx(
            "textarea",
            {
              name: "trivia",
              defaultValue: data.data.trivia || "",
              className: "w-full px-4 py-2 rounded-lg border shadow-sm"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block text-lg text-gray-700 mb-2", children: "YouTube Video Id" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              name: "videoId",
              defaultValue: data.data.videoId || "",
              className: "w-full px-4 py-2 rounded-lg border shadow-sm"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block text-lg text-gray-700 mb-2", children: "Is Active" }),
          /* @__PURE__ */ jsxs("select", { name: "isActive", defaultValue: data.data.isActive ? "true" : "false", className: "w-full px-4 py-2 rounded-lg border shadow-sm", children: [
            /* @__PURE__ */ jsx("option", { value: "true", children: "Yes" }),
            /* @__PURE__ */ jsx("option", { value: "false", children: "No" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block text-lg text-gray-700 mb-2", children: "Is Active on Web" }),
          /* @__PURE__ */ jsxs("select", { name: "isActiveWeb", defaultValue: data.data.isActiveWeb ? "true" : "false", className: "w-full px-4 py-2 rounded-lg border shadow-sm", children: [
            /* @__PURE__ */ jsx("option", { value: "true", children: "Yes" }),
            /* @__PURE__ */ jsx("option", { value: "false", children: "No" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block text-lg text-gray-700 mb-2", children: "Like Count" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "number",
              name: "likeCount",
              defaultValue: data.data.likeCount || "",
              className: "w-full px-4 py-2 rounded-lg border shadow-sm"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block text-lg text-gray-700 mb-2", children: "Priority" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "number",
              name: "priority",
              defaultValue: data.data.priority || "",
              className: "w-full px-4 py-2 rounded-lg border shadow-sm"
            }
          )
        ] }),
        ((_a = data.data) == null ? void 0 : _a.eventStartDate) && /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block text-lg text-gray-700 mb-2", children: "Event Start Date" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "date",
              name: "eventStartDate",
              defaultValue: data.data.eventStartDate ? new Date(data.data.eventStartDate).toISOString().split("T")[0] : "",
              className: "w-full px-4 py-2 rounded-lg border shadow-sm"
            }
          )
        ] }),
        ((_b = data.data) == null ? void 0 : _b.eventEndDate) && /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block text-lg text-gray-700 mb-2", children: "Event End Date" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "date",
              name: "eventEndDate",
              defaultValue: data.data.eventEndDate ? new Date(data.data.eventEndDate).toISOString().split("T")[0] : "",
              className: "w-full px-4 py-2 rounded-lg border shadow-sm"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mt-6 grid grid-cols-1 md:grid-cols-3 gap-6", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block text-lg text-gray-700 mb-2", children: "Cover Image" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "file",
              name: "coverImage",
              onChange: (e) => setCoverImage(e.target.files ? e.target.files[0] : null),
              className: "w-full"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block text-lg text-gray-700 mb-2", children: "Thumbnail Image" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "file",
              name: "thumbnailImage",
              onChange: (e) => setThumbnailImage(e.target.files ? e.target.files[0] : null),
              className: "w-full"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block text-lg text-gray-700 mb-2", children: "Icon Image" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "file",
              name: "iconImage",
              onChange: (e) => setIconImage(e.target.files ? e.target.files[0] : null),
              className: "w-full"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mt-6 flex justify-between", children: [
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "submit",
            className: "px-4 py-2 bg-blue-600 text-white rounded-lg shadow-sm hover:bg-blue-700",
            children: "Update Event"
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            onClick: handleCancel,
            className: "px-4 py-2 bg-gray-600 text-white rounded-lg shadow-sm hover:bg-gray-700",
            children: "Cancel"
          }
        )
      ] })
    ] })
  ] });
}
const route3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  action: action$1,
  default: EditEvent,
  loader: loader$6
}, Symbol.toStringTag, { value: "Module" }));
const loader$5 = async ({ request }) => {
  const url = new URL(request.url);
  const page = parseInt(url.searchParams.get("page") || "1", 10);
  const perPage = parseInt(url.searchParams.get("perPage") || "100", 10);
  const data = await fetchEvents({ page, perPage, eventType: "all" });
  console.log(data);
  return data;
};
function VerticalCalendar() {
  const data = useLoaderData();
  return /* @__PURE__ */ jsx("div", { className: "flex justify-center items-center", children: /* @__PURE__ */ jsxs("div", { className: "w-full max-w-6xl p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700", children: [
    /* @__PURE__ */ jsx("div", { className: "flex items-center justify-between mb-4", children: /* @__PURE__ */ jsx("h5", { className: "text-xl font-bold leading-none text-gray-900 dark:text-white text-center", children: "All Events" }) }),
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4", children: data == null ? void 0 : data.events.map((event) => /* @__PURE__ */ jsx(
      Link,
      {
        to: `/events/${event.uuid}`,
        className: "block p-4 bg-white border border-gray-200 rounded-lg shadow-lg hover:bg-gray-50 transition dark:bg-gray-700 dark:border-gray-600 dark:hover:bg-gray-600",
        children: /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-4", children: [
          /* @__PURE__ */ jsx(
            "img",
            {
              className: "w-16 h-16 rounded-full object-cover",
              src: event.coverImageUrl ?? "/images/event-fallback.jpg",
              alt: event.title
            }
          ),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-2 w-full", children: [
            /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold text-gray-900 dark:text-white", children: event.title }),
            /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-500 dark:text-gray-400", children: event.eventMediaType === "movie" && `🎬 Movie` }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600 dark:text-gray-300", children: event.extendedTitle }),
            /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center mt-2", children: [
              /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-500 dark:text-gray-400", children: new Date(event.eventStartDate).toDateString() }),
              /* @__PURE__ */ jsxs("span", { className: "text-sm text-gray-500 dark:text-gray-400", children: [
                event.eventStartTime,
                event.eventEndTime ? ` - ${event.eventEndTime}` : ""
              ] })
            ] })
          ] })
        ] })
      },
      event.uuid
    )) })
  ] }) });
}
const route4 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: VerticalCalendar,
  loader: loader$5
}, Symbol.toStringTag, { value: "Module" }));
const loader$4 = async ({ request }) => {
  const url = new URL(request.url);
  const page = parseInt(url.searchParams.get("page") || "1", 10);
  const perPage = parseInt(url.searchParams.get("perPage") || "25", 10);
  return fetchEvents({ page, perPage, eventType: "online" });
};
function Workshop() {
  const data = useLoaderData();
  return /* @__PURE__ */ jsxs("div", { className: "p-4", children: [
    /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold mb-4 text-center", children: "Thoughtful Thursdays" }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center", children: [
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl w-full", children: data.events.map((event) => /* @__PURE__ */ jsxs(
        Link,
        {
          to: `/events/${event.uuid}`,
          className: "flex flex-col items-center p-4 border rounded shadow-2xl max-w-xs w-full transition-transform transform hover:scale-105 hover:shadow-xl",
          children: [
            /* @__PURE__ */ jsx(
              "img",
              {
                src: event.thumbnailUrl,
                alt: event.title,
                className: "mb-2 w-full h-auto rounded"
              }
            ),
            /* @__PURE__ */ jsx("h2", { className: "text-xl font-bold mb-2 text-center", children: event.title })
          ]
        },
        event.uuid
      )) }),
      /* @__PURE__ */ jsxs("div", { className: "flex justify-center mt-4 space-x-4", children: [
        data.page > 1 && /* @__PURE__ */ jsx("a", { href: `?page=${data.page - 1}&perPage=${data.perPage}`, className: "btn", children: "Previous" }),
        data.hasNextPage && /* @__PURE__ */ jsx("a", { href: `?page=${data.page + 1}&perPage=${data.perPage}`, className: "btn", children: "Next" })
      ] })
    ] })
  ] });
}
const route5 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Workshop,
  loader: loader$4
}, Symbol.toStringTag, { value: "Module" }));
const loader$3 = async ({ request }) => {
  const url = new URL(request.url);
  const page = parseInt(url.searchParams.get("page") || "1", 10);
  const perPage = parseInt(url.searchParams.get("perPage") || "25", 10);
  return fetchEvents({ page, perPage, eventType: "movie" });
};
function Cinema() {
  const data = useLoaderData();
  return /* @__PURE__ */ jsxs("div", { className: "p-4", children: [
    /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold mb-4 text-center", children: "Cinema Hall Movies" }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center", children: [
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl w-full", children: data.events.map((event) => /* @__PURE__ */ jsxs(
        Link,
        {
          to: `/events/${event.uuid}`,
          className: "flex flex-col items-center p-4 border rounded shadow-2xl max-w-xs w-full transition-transform transform hover:scale-105 hover:shadow-xl",
          children: [
            /* @__PURE__ */ jsx(
              "img",
              {
                src: event.thumbnailUrl,
                alt: event.title,
                className: "mb-2 w-full h-auto rounded"
              }
            ),
            /* @__PURE__ */ jsx("h2", { className: "text-xl font-bold mb-2 text-center", children: event.title })
          ]
        },
        event.uuid
      )) }),
      /* @__PURE__ */ jsxs("div", { className: "flex justify-center mt-4 space-x-4", children: [
        data.page > 1 && /* @__PURE__ */ jsx("a", { href: `?page=${data.page - 1}&perPage=${data.perPage}`, className: "btn", children: "Previous" }),
        data.hasNextPage && /* @__PURE__ */ jsx("a", { href: `?page=${data.page + 1}&perPage=${data.perPage}`, className: "btn", children: "Next" })
      ] })
    ] })
  ] });
}
const route6 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Cinema,
  loader: loader$3
}, Symbol.toStringTag, { value: "Module" }));
const loader$2 = async () => {
  return json({
    apiBaseUrl: process.env.API_BASE_URL,
    apiVersion: process.env.API_VERSION,
    apiAuthToken: process.env.API_AUTH_TOKEN
  });
};
const action = async ({ request }) => {
  const formData = await request.formData();
  const eventType = formData.get("eventType");
  const mappedEventType = mapEventType(eventType);
  try {
    await createEvent(formData, mappedEventType, {
      baseUrl: process.env.API_BASE_URL,
      apiToken: process.env.API_AUTH_TOKEN,
      apiVersion: process.env.API_VERSION
    });
    return redirect("/events");
  } catch (error) {
    console.error("Failed to create event", error);
    return json({ error: "Failed to create event" }, { status: 500 });
  }
};
const mapEventType = (type) => {
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
function CreateEvent() {
  const navigate = useNavigate();
  const [eventType, setEventType] = useState("cinema hall");
  const [eventMediaType, setEventMediaType] = useState("movie");
  const [isActive, setIsActive] = useState(true);
  const [isActiveWeb, setIsActiveWeb] = useState(true);
  const handleEventTypeChange = (e) => {
    setEventType(e.target.value);
  };
  const handleEventMediaTypeChange = (e) => {
    setEventMediaType(e.target.value);
  };
  return /* @__PURE__ */ jsxs("div", { className: "container mx-auto py-8", children: [
    /* @__PURE__ */ jsx("h1", { className: "text-2xl mb-4 font-semibold", children: "Create New Event" }),
    /* @__PURE__ */ jsx("div", { className: "bg-white shadow-2xl rounded-xl p-8", children: /* @__PURE__ */ jsxs(Form, { method: "post", encType: "multipart/form-data", className: "space-y-4", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { htmlFor: "eventType", className: "block font-medium text-xl text-gray-700", children: "Event Type" }),
        /* @__PURE__ */ jsx(
          "select",
          {
            id: "eventType",
            name: "eventType",
            value: eventType,
            onChange: handleEventTypeChange,
            className: "mt-1 block w-full p-2 border border-gray-300 rounded-md",
            children: /* @__PURE__ */ jsx("option", { value: "cinema hall", children: "Cinema Hall" })
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { htmlFor: "eventMediaType", className: "block font-medium text-xl text-gray-700", children: "Event Media Type" }),
        /* @__PURE__ */ jsxs(
          "select",
          {
            id: "eventMediaType",
            name: "eventMediaType",
            value: eventMediaType,
            onChange: handleEventMediaTypeChange,
            className: "mt-1 block w-full p-2 border border-gray-300 rounded-md",
            children: [
              /* @__PURE__ */ jsx("option", { value: "movie", children: "Movie" }),
              /* @__PURE__ */ jsx("option", { value: "other", children: "Other" }),
              /* @__PURE__ */ jsx("option", { value: "carnival", children: "Carnival" })
            ]
          }
        )
      ] }),
      eventType === "cinema hall" && /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { htmlFor: "title", className: "block font-medium text-xl text-gray-700", children: "Title" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              id: "title",
              name: "title",
              required: true,
              className: "mt-1 block w-full p-2 border border-gray-300 rounded-md"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { htmlFor: "eventStartDate", className: "block font-medium text-xl text-gray-700", children: "Event Start Date and Time" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "datetime-local",
              id: "eventStartDate",
              name: "eventStartDate",
              required: true,
              className: "mt-1 block w-full p-2 border border-gray-300 rounded-md"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { htmlFor: "eventLink", className: "block font-medium text-xl text-gray-700", children: "Event Link" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "url",
              id: "eventLink",
              name: "eventLink",
              className: "mt-1 block w-full p-2 border border-gray-300 rounded-md"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mt-6 grid grid-cols-1 md:grid-cols-3 gap-6", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-lg text-gray-700 mb-2", children: "Cover Image" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "file",
                id: "coverImage",
                name: "coverImage",
                className: "w-full"
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-lg text-gray-700 mb-2", children: "Thumbnail Image" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "file",
                id: "thumbnailImage",
                name: "thumbnailImage",
                className: "w-full"
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-lg text-gray-700 mb-2", children: "Icon Image" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "file",
                id: "iconImage",
                name: "iconImage",
                className: "w-full"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { htmlFor: "cast", className: "block font-medium text-xl text-gray-700", children: "Cast" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              id: "cast",
              name: "cast",
              className: "mt-1 block w-full p-2 border border-gray-300 rounded-md"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { htmlFor: "director", className: "block font-medium text-xl text-gray-700", children: "Director" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              id: "director",
              name: "director",
              className: "mt-1 block w-full p-2 border border-gray-300 rounded-md"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { htmlFor: "storyLine", className: "block font-medium text-xl text-gray-700", children: "Story Line" }),
          /* @__PURE__ */ jsx(
            "textarea",
            {
              id: "storyLine",
              name: "storyLine",
              rows: 4,
              className: "mt-1 block w-full p-2 border border-gray-300 rounded-md"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { htmlFor: "priority", className: "block font-medium text-xl text-gray-700", children: "Priority" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "number",
              id: "priority",
              name: "priority",
              className: "mt-1 block w-full p-2 border border-gray-300 rounded-md"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { htmlFor: "videoId", className: "block font-medium text-xl text-gray-700", children: "Video ID" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              id: "videoId",
              name: "videoId",
              className: "mt-1 block w-full p-2 border border-gray-300 rounded-md"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { htmlFor: "isActive", className: "block font-medium text-xl text-gray-700", children: "Is Active" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "checkbox",
              id: "isActive",
              name: "isActive",
              checked: isActive,
              onChange: (e) => setIsActive(e.target.checked),
              className: "mt-1"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { htmlFor: "isActiveWeb", className: "block font-medium text-xl text-gray-700", children: "Is Active on Web" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "checkbox",
              id: "isActiveWeb",
              name: "isActiveWeb",
              checked: isActiveWeb,
              onChange: (e) => setIsActiveWeb(e.target.checked),
              className: "mt-1"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { htmlFor: "trivia", className: "block font-medium text-xl text-gray-700", children: "Trivia" }),
          /* @__PURE__ */ jsx(
            "textarea",
            {
              id: "trivia",
              name: "trivia",
              rows: 4,
              className: "mt-1 block w-full p-2 border border-gray-300 rounded-md"
            }
          )
        ] })
      ] }),
      eventType === "workshop" && /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { htmlFor: "title", className: "block font-medium text-xl text-gray-700", children: "Title" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              id: "title",
              name: "title",
              required: true,
              className: "mt-1 block w-full p-2 border border-gray-300 rounded-md"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { htmlFor: "description", className: "block font-medium text-xl text-gray-700", children: "Description" }),
          /* @__PURE__ */ jsx(
            "textarea",
            {
              id: "description",
              name: "description",
              rows: 4,
              className: "mt-1 block w-full p-2 border border-gray-300 rounded-md"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { htmlFor: "eventStartDate", className: "block font-medium text-xl text-gray-700", children: "Event Start Date" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "datetime-local",
              id: "eventStartDate",
              name: "eventStartDate",
              required: true,
              className: "mt-1 block w-full p-2 border border-gray-300 rounded-md"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { htmlFor: "eventStartTime", className: "block font-medium text-xl text-gray-700", children: "Event Start Time" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              id: "eventStartTime",
              name: "eventStartTime",
              required: true,
              className: "mt-1 block w-full p-2 border border-gray-300 rounded-md"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { htmlFor: "eventEndDate", className: "block font-medium text-xl text-gray-700", children: "Event End Date" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "datetime-local",
              id: "eventEndDate",
              name: "eventEndDate",
              required: true,
              className: "mt-1 block w-full p-2 border border-gray-300 rounded-md"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { htmlFor: "eventEndTime", className: "block font-medium text-xl text-gray-700", children: "Event End Time" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              id: "eventEndTime",
              name: "eventEndTime",
              required: true,
              className: "mt-1 block w-full p-2 border border-gray-300 rounded-md"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { htmlFor: "eventLocation", className: "block font-medium text-xl text-gray-700", children: "Event Location" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              id: "eventLocation",
              name: "eventLocation",
              className: "mt-1 block w-full p-2 border border-gray-300 rounded-md"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { htmlFor: "eventLink", className: "block font-medium text-xl text-gray-700", children: "Event Link" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "url",
              id: "eventLink",
              name: "eventLink",
              className: "mt-1 block w-full p-2 border border-gray-300 rounded-md"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mt-6 grid grid-cols-1 md:grid-cols-3 gap-6", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-lg text-gray-700 mb-2", children: "Cover Image" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "file",
                id: "coverImage",
                name: "coverImage",
                className: "w-full"
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-lg text-gray-700 mb-2", children: "Thumbnail Image" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "file",
                id: "thumbnailImage",
                name: "thumbnailImage",
                className: "w-full"
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-lg text-gray-700 mb-2", children: "Icon Image" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "file",
                id: "iconImage",
                name: "iconImage",
                className: "w-full"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { htmlFor: "priority", className: "block font-medium text-xl text-gray-700", children: "Priority" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "number",
              id: "priority",
              name: "priority",
              className: "mt-1 block w-full p-2 border border-gray-300 rounded-md"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { htmlFor: "isActive", className: "block font-medium text-xl text-gray-700", children: "Is Active" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "checkbox",
              id: "isActive",
              name: "isActive",
              checked: isActive,
              onChange: (e) => setIsActive(e.target.checked),
              className: "mt-1"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { htmlFor: "isActiveWeb", className: "block font-medium text-xl text-gray-700", children: "Is Active on Web" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "checkbox",
              id: "isActiveWeb",
              name: "isActiveWeb",
              checked: isActiveWeb,
              onChange: (e) => setIsActiveWeb(e.target.checked),
              className: "mt-1"
            }
          )
        ] })
      ] }),
      eventType === "pop-up-club" && /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { htmlFor: "title", className: "block font-medium text-xl text-gray-700", children: "Title" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              id: "title",
              name: "title",
              required: true,
              className: "mt-1 block w-full p-2 border border-gray-300 rounded-md"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { htmlFor: "description", className: "block font-medium text-xl text-gray-700", children: "Description" }),
          /* @__PURE__ */ jsx(
            "textarea",
            {
              id: "description",
              name: "description",
              rows: 4,
              className: "mt-1 block w-full p-2 border border-gray-300 rounded-md"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { htmlFor: "eventStartDate", className: "block font-medium text-xl text-gray-700", children: "Event Start Date" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "datetime-local",
              id: "eventStartDate",
              name: "eventStartDate",
              required: true,
              className: "mt-1 block w-full p-2 border border-gray-300 rounded-md"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { htmlFor: "price", className: "block font-medium text-xl text-gray-700", children: "Price" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "number",
              id: "price",
              name: "price",
              required: true,
              className: "mt-1 block w-full p-2 border border-gray-300 rounded-md"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { htmlFor: "eventStartTime", className: "block font-medium text-xl text-gray-700", children: "Event Start Time" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              id: "eventStartTime",
              name: "eventStartTime",
              required: true,
              className: "mt-1 block w-full p-2 border border-gray-300 rounded-md"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { htmlFor: "eventEndDate", className: "block font-medium text-xl text-gray-700", children: "Event End Date" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "datetime-local",
              id: "eventEndDate",
              name: "eventEndDate",
              required: true,
              className: "mt-1 block w-full p-2 border border-gray-300 rounded-md"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { htmlFor: "eventEndTime", className: "block font-medium text-xl text-gray-700", children: "Event End Time" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              id: "eventEndTime",
              name: "eventEndTime",
              required: true,
              className: "mt-1 block w-full p-2 border border-gray-300 rounded-md"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { htmlFor: "locationAddress", className: "block font-medium text-xl text-gray-700", children: "Location Address" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              id: "locationAddress",
              name: "locationAddress",
              required: true,
              className: "mt-1 block w-full p-2 border border-gray-300 rounded-md"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { htmlFor: "eventLocation", className: "block font-medium text-xl text-gray-700", children: "Event Location" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              id: "eventLocation",
              name: "eventLocation",
              className: "mt-1 block w-full p-2 border border-gray-300 rounded-md"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mt-6 grid grid-cols-1 md:grid-cols-3 gap-6", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-lg text-gray-700 mb-2", children: "Cover Image" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "file",
                id: "coverImage",
                name: "coverImage",
                className: "w-full"
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-lg text-gray-700 mb-2", children: "Thumbnail Image" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "file",
                id: "thumbnailImage",
                name: "thumbnailImage",
                className: "w-full"
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-lg text-gray-700 mb-2", children: "Icon Image" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "file",
                id: "iconImage",
                name: "iconImage",
                className: "w-full"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { htmlFor: "priority", className: "block font-medium text-xl text-gray-700", children: "Priority" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "number",
              id: "priority",
              name: "priority",
              className: "mt-1 block w-full p-2 border border-gray-300 rounded-md"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { htmlFor: "isActive", className: "block font-medium text-xl text-gray-700", children: "Is Active" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "checkbox",
              id: "isActive",
              name: "isActive",
              checked: isActive,
              onChange: (e) => setIsActive(e.target.checked),
              className: "mt-1"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { htmlFor: "isActiveWeb", className: "block font-medium text-xl text-gray-700", children: "Is Active on Web" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "checkbox",
              id: "isActiveWeb",
              name: "isActiveWeb",
              checked: isActiveWeb,
              onChange: (e) => setIsActiveWeb(e.target.checked),
              className: "mt-1"
            }
          )
        ] })
      ] }),
      eventType === "games" && /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { htmlFor: "title", className: "block font-medium text-xl text-gray-700", children: "Title" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              id: "title",
              name: "title",
              required: true,
              className: "mt-1 block w-full p-2 border border-gray-300 rounded-md"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { htmlFor: "description", className: "block font-medium text-xl text-gray-700", children: "Description" }),
          /* @__PURE__ */ jsx(
            "textarea",
            {
              id: "description",
              name: "description",
              rows: 4,
              className: "mt-1 block w-full p-2 border border-gray-300 rounded-md"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { htmlFor: "eventStartDate", className: "block font-medium text-xl text-gray-700", children: "Event Start Date" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "datetime-local",
              id: "eventStartDate",
              name: "eventStartDate",
              required: true,
              className: "mt-1 block w-full p-2 border border-gray-300 rounded-md"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { htmlFor: "eventLink", className: "block font-medium text-xl text-gray-700", children: "Event Link" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              id: "eventLink",
              name: "eventLink",
              required: true,
              className: "mt-1 block w-full p-2 border border-gray-300 rounded-md"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { htmlFor: "eventStartTime", className: "block font-medium text-xl text-gray-700", children: "Event Start Time" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              id: "eventStartTime",
              name: "eventStartTime",
              required: true,
              className: "mt-1 block w-full p-2 border border-gray-300 rounded-md"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { htmlFor: "eventEndDate", className: "block font-medium text-xl text-gray-700", children: "Event End Date" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "datetime-local",
              id: "eventEndDate",
              name: "eventEndDate",
              required: true,
              className: "mt-1 block w-full p-2 border border-gray-300 rounded-md"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { htmlFor: "eventEndTime", className: "block font-medium text-xl text-gray-700", children: "Event End Time" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              id: "eventEndTime",
              name: "eventEndTime",
              required: true,
              className: "mt-1 block w-full p-2 border border-gray-300 rounded-md"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { htmlFor: "eventLocation", className: "block font-medium text-xl text-gray-700", children: "Event Location" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              id: "eventLocation",
              name: "eventLocation",
              className: "mt-1 block w-full p-2 border border-gray-300 rounded-md"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mt-6 grid grid-cols-1 md:grid-cols-3 gap-6", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-lg text-gray-700 mb-2", children: "Cover Image" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "file",
                id: "coverImage",
                name: "coverImage",
                className: "w-full"
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-lg text-gray-700 mb-2", children: "Thumbnail Image" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "file",
                id: "thumbnailImage",
                name: "thumbnailImage",
                className: "w-full"
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-lg text-gray-700 mb-2", children: "Icon Image" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "file",
                id: "iconImage",
                name: "iconImage",
                className: "w-full"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { htmlFor: "priority", className: "block font-medium text-xl text-gray-700", children: "Priority" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "number",
              id: "priority",
              name: "priority",
              className: "mt-1 block w-full p-2 border border-gray-300 rounded-md"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { htmlFor: "isActive", className: "block font-medium text-xl text-gray-700", children: "Is Active" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "checkbox",
              id: "isActive",
              name: "isActive",
              checked: isActive,
              onChange: (e) => setIsActive(e.target.checked),
              className: "mt-1"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { htmlFor: "isActiveWeb", className: "block font-medium text-xl text-gray-700", children: "Is Active on Web" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "checkbox",
              id: "isActiveWeb",
              name: "isActiveWeb",
              checked: isActiveWeb,
              onChange: (e) => setIsActiveWeb(e.target.checked),
              className: "mt-1"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mt-6", children: [
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "submit",
            className: "inline-flex items-center justify-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700",
            children: "Create Event"
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            className: "inline-flex items-center justify-center px-4 py-2 ml-4 border border-transparent text-base font-medium rounded-md shadow-sm text-gray-700 bg-white border-gray-300 hover:bg-gray-50",
            onClick: () => navigate("/events"),
            children: "Cancel"
          }
        )
      ] })
    ] }) })
  ] });
}
const route7 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  action,
  default: CreateEvent,
  loader: loader$2
}, Symbol.toStringTag, { value: "Module" }));
const Events$1 = () => {
  return /* @__PURE__ */ jsxs("div", { className: "max-w-5xl mx-auto px-4 py-8", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center mb-6", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold", children: "Event Categories" }),
      /* @__PURE__ */ jsxs(
        Link,
        {
          to: "/events/create",
          className: "flex items-center justify-center text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 w-full sm:w-auto",
          children: [
            /* @__PURE__ */ jsx(PlusCircleIcon, { className: "w-5 h-5 mr-2" }),
            /* @__PURE__ */ jsx("span", { className: "whitespace-nowrap", children: "Create New Event" })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 md:grid-cols-3 gap-4", children: [
      /* @__PURE__ */ jsxs(
        Link,
        {
          to: "/events/cinema",
          className: "relative group flex flex-col items-center",
          children: [
            /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center h-48 w-full rounded-xl shadow-2xl bg-blend-hard-light transform transition-transform duration-300 ease-in-out group-hover:scale-105 group-hover:shadow-lg", children: /* @__PURE__ */ jsx(FilmIcon, { className: "w-16 h-16 text-gray-700" }) }),
            /* @__PURE__ */ jsx("div", { className: "mt-2 text-center text-lg font-semibold", children: "Cinema Hall" })
          ]
        }
      ),
      /* @__PURE__ */ jsxs(
        Link,
        {
          to: "/events",
          className: "relative group flex flex-col items-center",
          children: [
            /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center h-48 w-full rounded-xl shadow-2xl bg-blend-hard-light transform transition-transform duration-300 ease-in-out group-hover:scale-105 group-hover:shadow-lg", children: /* @__PURE__ */ jsx(WrenchScrewdriverIcon, { className: "w-16 h-16 text-gray-700" }) }),
            /* @__PURE__ */ jsx("div", { className: "mt-2 text-center text-lg font-semibold", children: "Thoughtful Thursdays" })
          ]
        }
      ),
      /* @__PURE__ */ jsxs(
        Link,
        {
          to: "/events",
          className: "relative group flex flex-col items-center",
          children: [
            /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center h-48 w-full rounded-xl shadow-2xl bg-blend-hard-light transform transition-transform duration-300 ease-in-out group-hover:scale-105 group-hover:shadow-lg", children: /* @__PURE__ */ jsx(SparklesIcon, { className: "w-16 h-16 text-gray-700" }) }),
            /* @__PURE__ */ jsx("div", { className: "mt-2 text-center text-lg font-semibold", children: "Pop-up Club" })
          ]
        }
      ),
      /* @__PURE__ */ jsxs(
        Link,
        {
          to: "/events",
          className: "relative group flex flex-col items-center",
          children: [
            /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center h-48 w-full rounded-xl shadow-2xl bg-blend-hard-light transform transition-transform duration-300 ease-in-out group-hover:scale-105 group-hover:shadow-lg", children: /* @__PURE__ */ jsx(PuzzlePieceIcon, { className: "w-16 h-16 text-gray-700" }) }),
            /* @__PURE__ */ jsx("div", { className: "mt-2 text-center text-lg font-semibold", children: "Fun Friday" })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsx("hr", { className: "my-8 border-gray-300" }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-3 mx-auto gap-4", children: [
      /* @__PURE__ */ jsxs(
        Link,
        {
          to: "/events",
          className: "relative group flex flex-col items-center",
          children: [
            /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center h-48 w-full rounded-xl shadow-2xl  transform transition-transform duration-300 ease-in-out group-hover:scale-105 group-hover:shadow-2xl", children: /* @__PURE__ */ jsx(RectangleGroupIcon, { className: "w-16 h-16 text-gray-700" }) }),
            /* @__PURE__ */ jsx("div", { className: "mt-2 text-center text-lg font-semibold", children: "Event Registrations" })
          ]
        }
      ),
      /* @__PURE__ */ jsxs(
        Link,
        {
          to: "/events",
          className: "relative group flex flex-col items-center",
          children: [
            /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center h-48 w-full rounded-xl shadow-2xl  transform transition-transform duration-300 ease-in-out group-hover:scale-105 group-hover:shadow-2xl", children: /* @__PURE__ */ jsx(CalendarDaysIcon, { className: "w-16 h-16 text-gray-700" }) }),
            /* @__PURE__ */ jsx("div", { className: "mt-2 text-center text-lg font-semibold", children: "Event Calendar" })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsx(Outlet, {})
  ] });
};
const route8 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Events$1
}, Symbol.toStringTag, { value: "Module" }));
const loader$1 = async ({ params }) => {
  const { uuid } = params;
  const data = await fetchEventDetails(uuid);
  return data;
};
function MovieDetails() {
  const data = useLoaderData();
  const navigate = useNavigate();
  const handleEdit = () => {
    navigate(`/events/edit/${data.data.uuid}`);
  };
  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this event?")) {
      console.log("Event deleted");
      navigate(`/events/cinema`);
    }
  };
  return /* @__PURE__ */ jsxs("div", { className: "p-6 max-w-5xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex justify-end mb-4", children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: handleEdit,
          className: "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2",
          children: "Edit"
        }
      ),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: handleDelete,
          className: "bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded",
          children: "Delete"
        }
      )
    ] }),
    /* @__PURE__ */ jsx("h1", { className: "text-4xl font-bold text-gray-900 mb-6 text-center", children: data.data.title ?? data.data.extendedTitle }),
    /* @__PURE__ */ jsx(
      "img",
      {
        src: data.data.coverImageUrl ?? "/images/movie-fallback.jpg",
        alt: data.data.title,
        className: "mb-6 w-full h-auto object-cover rounded-lg shadow-md"
      }
    ),
    data.data.eventMediaType === "movie" && /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsxs("p", { className: "text-lg text-gray-700 mb-6", children: [
        /* @__PURE__ */ jsx("strong", { className: "text-gray-900", children: "Storyline:" }),
        " ",
        data.data.storyLine
      ] }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6 mb-6", children: /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsxs("p", { className: "text-lg text-gray-700 mb-2", children: [
          /* @__PURE__ */ jsx("strong", { className: "text-gray-900", children: "Director:" }),
          " ",
          data.data.director
        ] }),
        /* @__PURE__ */ jsxs("p", { className: "text-lg text-gray-700 mb-2", children: [
          /* @__PURE__ */ jsx("strong", { className: "text-gray-900", children: "Cast:" }),
          " ",
          data.data.cast
        ] }),
        /* @__PURE__ */ jsxs("p", { className: "text-lg text-gray-700 mb-2", children: [
          /* @__PURE__ */ jsx("strong", { className: "text-gray-900", children: "Trivia:" }),
          " ",
          data.data.trivia
        ] })
      ] }) })
    ] }),
    data.data.eventMediaType === "other" && /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsxs("p", { className: "text-lg text-gray-700 mb-6", children: [
        /* @__PURE__ */ jsx("strong", { className: "text-gray-900", children: "Description:" }),
        " ",
        data.data.description
      ] }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6 mb-6", children: /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsxs("p", { className: "text-lg text-gray-700 mb-2", children: [
          /* @__PURE__ */ jsx("strong", { className: "text-gray-900", children: "Event Location:" }),
          " ",
          data.data.eventLocation
        ] }),
        /* @__PURE__ */ jsxs("p", { className: "text-lg text-gray-700 mb-2", children: [
          /* @__PURE__ */ jsx("strong", { className: "text-gray-900", children: "Event Link:" }),
          " ",
          /* @__PURE__ */ jsx(
            "a",
            {
              href: data.data.eventLink,
              target: "_blank",
              rel: "noopener noreferrer",
              className: "text-blue-500 underline",
              children: data.data.eventLink
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("p", { className: "text-lg text-gray-700 mb-2", children: [
          /* @__PURE__ */ jsx("strong", { className: "text-gray-900", children: "Event Start Date:" }),
          " ",
          new Date(data.data.eventStartDate).toLocaleDateString(),
          " ",
          data.data.eventStartTime
        ] }),
        /* @__PURE__ */ jsxs("p", { className: "text-lg text-gray-700 mb-2", children: [
          /* @__PURE__ */ jsx("strong", { className: "text-gray-900", children: "Event End Date:" }),
          " ",
          new Date(data.data.eventEndDate).toLocaleDateString(),
          " ",
          data.data.eventEndTime
        ] }),
        /* @__PURE__ */ jsxs("p", { className: "text-lg text-gray-700 mb-2", children: [
          /* @__PURE__ */ jsx("strong", { className: "text-gray-900", children: "Location Address:" }),
          " ",
          data.data.locationAddress ?? "N/A"
        ] }),
        /* @__PURE__ */ jsxs("p", { className: "text-lg text-gray-700 mb-2", children: [
          /* @__PURE__ */ jsx("strong", { className: "text-gray-900", children: "Additional Notes:" }),
          " ",
          data.data.additionalNotes ?? "N/A"
        ] })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "mt-8 p-4 rounded-lg shadow-2xl", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-2xl font-semibold text-gray-900 mb-4", children: "Additional Details" }),
      /* @__PURE__ */ jsxs("p", { className: "text-lg text-gray-700 mb-2", children: [
        /* @__PURE__ */ jsx("strong", { className: "text-gray-900", children: "Event Media Type:" }),
        " ",
        data.data.eventMediaType
      ] }),
      data.data.eventMediaType === "movie" && /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("p", { className: "text-lg text-gray-700 mb-2", children: [
        /* @__PURE__ */ jsx("strong", { className: "text-gray-900", children: "YouTube Video Id:" }),
        " ",
        data.data.videoId
      ] }) }),
      /* @__PURE__ */ jsxs("p", { className: "text-lg text-gray-700 mb-2", children: [
        /* @__PURE__ */ jsx("strong", { className: "text-gray-900", children: "Is Active:" }),
        " ",
        data.data.isActive ? "Yes" : "No"
      ] }),
      /* @__PURE__ */ jsxs("p", { className: "text-lg text-gray-700 mb-2", children: [
        /* @__PURE__ */ jsx("strong", { className: "text-gray-900", children: "Is Active on Web:" }),
        " ",
        data.data.isActiveWeb ? "Yes" : "No"
      ] }),
      /* @__PURE__ */ jsxs("p", { className: "text-lg text-gray-700 mb-2", children: [
        /* @__PURE__ */ jsx("strong", { className: "text-gray-900", children: "Like Count:" }),
        " ",
        data.data.likeCount
      ] }),
      (data.data.eventMediaType === "movie" || data.data.eventMediaType === "other") && /* @__PURE__ */ jsxs("p", { className: "text-lg text-gray-700 mb-2", children: [
        /* @__PURE__ */ jsx("strong", { className: "text-gray-900", children: "Priority:" }),
        " ",
        data.data.priority ?? "N/A"
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex justify-right space-x-6 mt-6", children: [
      data.data.thumbnailUrl && /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center", children: [
        /* @__PURE__ */ jsx("p", { className: "text-lg text-gray-600 mt-2 break-words", children: /* @__PURE__ */ jsx("strong", { className: "text-gray-900", children: "Thumbnail Image:" }) }),
        /* @__PURE__ */ jsx(
          "img",
          {
            src: data.data.thumbnailUrl,
            alt: "Thumbnail",
            className: "w-32 h-auto object-cover rounded shadow-2xl"
          }
        )
      ] }),
      data.data.coverImageUrl && /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center", children: [
        /* @__PURE__ */ jsx("p", { className: "text-lg text-gray-600 mt-2 break-words", children: /* @__PURE__ */ jsx("strong", { className: "text-gray-900", children: "Cover Image:" }) }),
        /* @__PURE__ */ jsx(
          "img",
          {
            src: data.data.coverImageUrl,
            alt: "Cover",
            className: "w-32 h-auto object-cover rounded shadow-2xl"
          }
        )
      ] }),
      data.data.iconUrl && /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center", children: [
        /* @__PURE__ */ jsx("p", { className: "text-lg text-gray-600 mt-2 break-words", children: /* @__PURE__ */ jsx("strong", { className: "text-gray-900", children: "Icon Image:" }) }),
        /* @__PURE__ */ jsx(
          "img",
          {
            src: data.data.iconUrl,
            alt: "Icon",
            className: "w-16 h-16 object-cover rounded shadow-2xl"
          }
        )
      ] })
    ] })
  ] });
}
const route9 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: MovieDetails,
  loader: loader$1
}, Symbol.toStringTag, { value: "Module" }));
const loader = async ({ request }) => {
  const url = new URL(request.url);
  const page = parseInt(url.searchParams.get("page") || "1", 10);
  const perPage = parseInt(url.searchParams.get("perPage") || "25", 10);
  return fetchEvents({ page, perPage, eventType: "games" });
};
function Fun Friday() {
  const data = useLoaderData();
  return /* @__PURE__ */ jsxs("div", { className: "p-4", children: [
    /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold mb-4 text-center", children: "Fun Friday" }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center", children: [
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl w-full", children: data.events.map((event) => /* @__PURE__ */ jsxs(
        Link,
        {
          to: `/events/${event.uuid}`,
          className: "flex flex-col items-center p-4 border rounded shadow-2xl max-w-xs w-full transition-transform transform hover:scale-105 hover:shadow-xl",
          children: [
            /* @__PURE__ */ jsx(
              "img",
              {
                src: event.thumbnailUrl,
                alt: event.title,
                className: "mb-2 w-full h-auto rounded"
              }
            ),
            /* @__PURE__ */ jsx("h2", { className: "text-xl font-bold mb-2 text-center", children: event.title })
          ]
        },
        event.uuid
      )) }),
      /* @__PURE__ */ jsxs("div", { className: "flex justify-center mt-4 space-x-4", children: [
        data.page > 1 && /* @__PURE__ */ jsx("a", { href: `?page=${data.page - 1}&perPage=${data.perPage}`, className: "btn", children: "Previous" }),
        data.hasNextPage && /* @__PURE__ */ jsx("a", { href: `?page=${data.page + 1}&perPage=${data.perPage}`, className: "btn", children: "Next" })
      ] })
    ] })
  ] });
}
const route10 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Fun Friday,
  loader
}, Symbol.toStringTag, { value: "Module" }));
const Events = () => {
  return /* @__PURE__ */ jsxs("div", { className: "max-w-5xl mx-auto px-4 py-8", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center mb-6", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold", children: "Event Categories" }),
      /* @__PURE__ */ jsxs(
        Link,
        {
          to: "/events/create",
          className: "flex items-center justify-center text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 w-full sm:w-auto",
          children: [
            /* @__PURE__ */ jsx(PlusCircleIcon, { className: "w-5 h-5 mr-2" }),
            /* @__PURE__ */ jsx("span", { className: "whitespace-nowrap", children: "Create New Event" })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 md:grid-cols-3 gap-4", children: [
      /* @__PURE__ */ jsxs(
        Link,
        {
          to: "/events/cinema",
          className: "relative group flex flex-col items-center",
          children: [
            /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center h-48 w-full rounded-xl shadow-2xl bg-blend-hard-light transform transition-transform duration-300 ease-in-out group-hover:scale-105 group-hover:shadow-lg", children: /* @__PURE__ */ jsx(FilmIcon, { className: "w-16 h-16 text-gray-700" }) }),
            /* @__PURE__ */ jsx("div", { className: "mt-2 text-center text-lg font-semibold", children: "Cinema Hall" })
          ]
        }
      ),
      /* @__PURE__ */ jsxs(
        Link,
        {
          to: "/events",
          className: "relative group flex flex-col items-center",
          children: [
            /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center h-48 w-full rounded-xl shadow-2xl bg-blend-hard-light transform transition-transform duration-300 ease-in-out group-hover:scale-105 group-hover:shadow-lg", children: /* @__PURE__ */ jsx(WrenchScrewdriverIcon, { className: "w-16 h-16 text-gray-700" }) }),
            /* @__PURE__ */ jsx("div", { className: "mt-2 text-center text-lg font-semibold", children: "Thoughtful Thursdays" })
          ]
        }
      ),
      /* @__PURE__ */ jsxs(
        Link,
        {
          to: "/events",
          className: "relative group flex flex-col items-center",
          children: [
            /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center h-48 w-full rounded-xl shadow-2xl bg-blend-hard-light transform transition-transform duration-300 ease-in-out group-hover:scale-105 group-hover:shadow-lg", children: /* @__PURE__ */ jsx(SparklesIcon, { className: "w-16 h-16 text-gray-700" }) }),
            /* @__PURE__ */ jsx("div", { className: "mt-2 text-center text-lg font-semibold", children: "Pop-up Club" })
          ]
        }
      ),
      /* @__PURE__ */ jsxs(
        Link,
        {
          to: "/events",
          className: "relative group flex flex-col items-center",
          children: [
            /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center h-48 w-full rounded-xl shadow-2xl bg-blend-hard-light transform transition-transform duration-300 ease-in-out group-hover:scale-105 group-hover:shadow-lg", children: /* @__PURE__ */ jsx(PuzzlePieceIcon, { className: "w-16 h-16 text-gray-700" }) }),
            /* @__PURE__ */ jsx("div", { className: "mt-2 text-center text-lg font-semibold", children: "Fun Friday" })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsx("hr", { className: "my-8 border-gray-300" }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-3 mx-auto gap-4", children: [
      /* @__PURE__ */ jsxs(
        Link,
        {
          to: "/events",
          className: "relative group flex flex-col items-center",
          children: [
            /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center h-48 w-full rounded-xl shadow-2xl  transform transition-transform duration-300 ease-in-out group-hover:scale-105 group-hover:shadow-2xl", children: /* @__PURE__ */ jsx(RectangleGroupIcon, { className: "w-16 h-16 text-gray-700" }) }),
            /* @__PURE__ */ jsx("div", { className: "mt-2 text-center text-lg font-semibold", children: "Event Registrations" })
          ]
        }
      ),
      /* @__PURE__ */ jsxs(
        Link,
        {
          to: "/events",
          className: "relative group flex flex-col items-center",
          children: [
            /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center h-48 w-full rounded-xl shadow-2xl  transform transition-transform duration-300 ease-in-out group-hover:scale-105 group-hover:shadow-2xl", children: /* @__PURE__ */ jsx(CalendarDaysIcon, { className: "w-16 h-16 text-gray-700" }) }),
            /* @__PURE__ */ jsx("div", { className: "mt-2 text-center text-lg font-semibold", children: "Event Calendar" })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsx(Outlet, {})
  ] });
};
const route11 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Events
}, Symbol.toStringTag, { value: "Module" }));
function EventsIndex() {
  return /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(Outlet, {}) });
}
const route12 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: EventsIndex
}, Symbol.toStringTag, { value: "Module" }));
const Gallery = () => {
  return /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 md:grid-cols-3 gap-4 max-w-5xl mx-auto", children: [
    /* @__PURE__ */ jsxs("a", { href: "/events", className: "group", children: [
      /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center h-48 w-full rounded-lg shadow-lg overflow-hidden", children: /* @__PURE__ */ jsx(
        "img",
        {
          className: "h-auto max-w-full rounded-lg object-cover transform transition-transform duration-500 ease-in-out group-hover:scale-110 group-hover:opacity-90",
          src: "/images/event.png",
          alt: "Gallery Image 1"
        }
      ) }),
      /* @__PURE__ */ jsx("div", { className: "mt-2 text-center text-lg font-semibold group-hover:text-blue-600 transition-colors duration-300", children: "Events" })
    ] }),
    /* @__PURE__ */ jsxs("a", { href: "/path-to-detail-page-2", className: "group", children: [
      /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center h-48 w-full rounded-lg shadow-lg overflow-hidden", children: /* @__PURE__ */ jsx(
        "img",
        {
          className: "h-auto max-w-full rounded-lg object-cover transform transition-transform duration-500 ease-in-out group-hover:scale-110 group-hover:opacity-90",
          src: "/images/media.png",
          alt: "Gallery Image 2"
        }
      ) }),
      /* @__PURE__ */ jsx("div", { className: "mt-2 text-center text-lg font-semibold group-hover:text-blue-600 transition-colors duration-300", children: "Media Library" })
    ] }),
    /* @__PURE__ */ jsxs("a", { href: "/users", className: "group", children: [
      /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center h-48 w-full rounded-lg shadow-lg overflow-hidden", children: /* @__PURE__ */ jsx(
        "img",
        {
          className: "h-auto max-w-full rounded-lg object-cover transform transition-transform duration-500 ease-in-out group-hover:scale-110 group-hover:opacity-90",
          src: "/images/user.png",
          alt: "Users"
        }
      ) }),
      /* @__PURE__ */ jsx("div", { className: "mt-2 text-center text-lg font-semibold group-hover:text-blue-600 transition-colors duration-300", children: "User" })
    ] })
  ] });
};
function Index() {
  return /* @__PURE__ */ jsx("div", { className: "flex flex-col items-center justify-center min-h-screen p-6", children: /* @__PURE__ */ jsx(Gallery, {}) });
}
const route13 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Index
}, Symbol.toStringTag, { value: "Module" }));
const serverManifest = { "entry": { "module": "/assets/entry.client-C4qtgu4R.js", "imports": ["/assets/jsx-runtime-56DGgGmo.js", "/assets/index-BoEtlhzw.js", "/assets/components-C-v4od-A.js"], "css": [] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/root-Bvx-xVQD.js", "imports": ["/assets/jsx-runtime-56DGgGmo.js", "/assets/index-BoEtlhzw.js", "/assets/components-C-v4od-A.js"], "css": ["/assets/root-DTr-KUKH.css"] }, "routes/events.registrations": { "id": "routes/events.registrations", "parentId": "routes/events", "path": "registrations", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/events.registrations-CLvf73sx.js", "imports": ["/assets/jsx-runtime-56DGgGmo.js", "/assets/index-BoEtlhzw.js", "/assets/components-C-v4od-A.js"], "css": [] }, "routes/events.pop-up-club": { "id": "routes/events.pop-up-club", "parentId": "routes/events", "path": "pop-up-club", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/events.pop-up-club-BxuszVvW.js", "imports": ["/assets/jsx-runtime-56DGgGmo.js", "/assets/index-BoEtlhzw.js", "/assets/components-C-v4od-A.js"], "css": [] }, "routes/events.edit.$uuid": { "id": "routes/events.edit.$uuid", "parentId": "routes/events", "path": "edit/:uuid", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/events.edit._uuid-DxBkj-HI.js", "imports": ["/assets/jsx-runtime-56DGgGmo.js", "/assets/index-BoEtlhzw.js", "/assets/components-C-v4od-A.js"], "css": [] }, "routes/events.calendar": { "id": "routes/events.calendar", "parentId": "routes/events", "path": "calendar", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/events.calendar-S-v1CCAz.js", "imports": ["/assets/jsx-runtime-56DGgGmo.js", "/assets/index-BoEtlhzw.js", "/assets/components-C-v4od-A.js"], "css": [] }, "routes/events.workshop": { "id": "routes/events.workshop", "parentId": "routes/events", "path": "workshop", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/events.workshop-BmaoQ4Ni.js", "imports": ["/assets/jsx-runtime-56DGgGmo.js", "/assets/index-BoEtlhzw.js", "/assets/components-C-v4od-A.js"], "css": [] }, "routes/events.cinema": { "id": "routes/events.cinema", "parentId": "routes/events", "path": "cinema", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/events.cinema-Ft90mb46.js", "imports": ["/assets/jsx-runtime-56DGgGmo.js", "/assets/index-BoEtlhzw.js", "/assets/components-C-v4od-A.js"], "css": [] }, "routes/events.create": { "id": "routes/events.create", "parentId": "routes/events", "path": "create", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/events.create-CbeDtMPO.js", "imports": ["/assets/jsx-runtime-56DGgGmo.js", "/assets/index-BoEtlhzw.js", "/assets/components-C-v4od-A.js"], "css": [] }, "routes/events._index": { "id": "routes/events._index", "parentId": "routes/events", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/events._index-CQMNkIWW.js", "imports": ["/assets/jsx-runtime-56DGgGmo.js", "/assets/index-BoEtlhzw.js", "/assets/components-C-v4od-A.js", "/assets/WrenchScrewdriverIcon-paFSEx3C.js"], "css": [] }, "routes/events.$uuid": { "id": "routes/events.$uuid", "parentId": "routes/events", "path": ":uuid", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/events._uuid-BvMxwUPV.js", "imports": ["/assets/jsx-runtime-56DGgGmo.js", "/assets/index-BoEtlhzw.js", "/assets/components-C-v4od-A.js"], "css": [] }, "routes/events.games": { "id": "routes/events.games", "parentId": "routes/events", "path": "games", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/events.games-BAtwwOOZ.js", "imports": ["/assets/jsx-runtime-56DGgGmo.js", "/assets/index-BoEtlhzw.js", "/assets/components-C-v4od-A.js"], "css": [] }, "routes/users._index": { "id": "routes/users._index", "parentId": "root", "path": "users", "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/users._index-CQMNkIWW.js", "imports": ["/assets/jsx-runtime-56DGgGmo.js", "/assets/index-BoEtlhzw.js", "/assets/components-C-v4od-A.js", "/assets/WrenchScrewdriverIcon-paFSEx3C.js"], "css": [] }, "routes/events": { "id": "routes/events", "parentId": "root", "path": "events", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/events-hIHVxr1u.js", "imports": ["/assets/jsx-runtime-56DGgGmo.js", "/assets/index-BoEtlhzw.js"], "css": [] }, "routes/_index": { "id": "routes/_index", "parentId": "root", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/_index-D1nUIAFB.js", "imports": ["/assets/jsx-runtime-56DGgGmo.js"], "css": [] } }, "url": "/assets/manifest-60a8a489.js", "version": "60a8a489" };
const mode = "production";
const assetsBuildDirectory = "build\\client";
const basename = "/";
const future = { "v3_fetcherPersist": true, "v3_relativeSplatPath": true, "v3_throwAbortReason": true, "unstable_singleFetch": false, "unstable_lazyRouteDiscovery": false };
const isSpaMode = false;
const publicPath = "/";
const entry = { module: entryServer };
const routes = {
  "root": {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: route0
  },
  "routes/events.registrations": {
    id: "routes/events.registrations",
    parentId: "routes/events",
    path: "registrations",
    index: void 0,
    caseSensitive: void 0,
    module: route1
  },
  "routes/events.pop-up-club": {
    id: "routes/events.pop-up-club",
    parentId: "routes/events",
    path: "pop-up-club",
    index: void 0,
    caseSensitive: void 0,
    module: route2
  },
  "routes/events.edit.$uuid": {
    id: "routes/events.edit.$uuid",
    parentId: "routes/events",
    path: "edit/:uuid",
    index: void 0,
    caseSensitive: void 0,
    module: route3
  },
  "routes/events.calendar": {
    id: "routes/events.calendar",
    parentId: "routes/events",
    path: "calendar",
    index: void 0,
    caseSensitive: void 0,
    module: route4
  },
  "routes/events.workshop": {
    id: "routes/events.workshop",
    parentId: "routes/events",
    path: "workshop",
    index: void 0,
    caseSensitive: void 0,
    module: route5
  },
  "routes/events.cinema": {
    id: "routes/events.cinema",
    parentId: "routes/events",
    path: "cinema",
    index: void 0,
    caseSensitive: void 0,
    module: route6
  },
  "routes/events.create": {
    id: "routes/events.create",
    parentId: "routes/events",
    path: "create",
    index: void 0,
    caseSensitive: void 0,
    module: route7
  },
  "routes/events._index": {
    id: "routes/events._index",
    parentId: "routes/events",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: route8
  },
  "routes/events.$uuid": {
    id: "routes/events.$uuid",
    parentId: "routes/events",
    path: ":uuid",
    index: void 0,
    caseSensitive: void 0,
    module: route9
  },
  "routes/events.games": {
    id: "routes/events.games",
    parentId: "routes/events",
    path: "games",
    index: void 0,
    caseSensitive: void 0,
    module: route10
  },
  "routes/users._index": {
    id: "routes/users._index",
    parentId: "root",
    path: "users",
    index: true,
    caseSensitive: void 0,
    module: route11
  },
  "routes/events": {
    id: "routes/events",
    parentId: "root",
    path: "events",
    index: void 0,
    caseSensitive: void 0,
    module: route12
  },
  "routes/_index": {
    id: "routes/_index",
    parentId: "root",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: route13
  }
};
export {
  serverManifest as assets,
  assetsBuildDirectory,
  basename,
  entry,
  future,
  isSpaMode,
  mode,
  publicPath,
  routes
};
