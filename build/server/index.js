import { jsx, jsxs } from "react/jsx-runtime";
import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable, redirect } from "@remix-run/node";
import { RemixServer, Link, Meta, Links, Outlet, ScrollRestoration, Scripts, LiveReload, useLoaderData, useNavigate, Form } from "@remix-run/react";
import { isbot } from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import { CalendarIcon, VideoCameraIcon, UserIcon } from "@heroicons/react/16/solid";
import { HomeIcon, FilmIcon, WrenchScrewdriverIcon, SparklesIcon, PuzzlePieceIcon, RectangleGroupIcon } from "@heroicons/react/24/solid";
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
      /* @__PURE__ */ jsx("li", { className: "mb-4", children: /* @__PURE__ */ jsxs(Link, { to: "/categories", className: "flex items-center py-2 px-4 rounded hover:bg-gray-700", children: [
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
async function fetchMovies({
  page,
  perPage
}) {
  const apiUrl = new URL(`${process.env.API_BASE_URL}/${process.env.API_VERSION}/events/movies`);
  apiUrl.searchParams.append("page", page.toString());
  apiUrl.searchParams.append("perPage", perPage.toString());
  const response = await fetch(apiUrl.toString(), {
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.API_AUTH_TOKEN}`
    }
  });
  if (!response.ok) {
    throw new Error("Failed to fetch movies");
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
const loader$2 = async ({ params }) => {
  const { uuid } = params;
  const data = await fetchEventDetails(uuid);
  if (!data || !data.data) {
    throw new Response("Event not found", { status: 404 });
  }
  return data;
};
const action = async ({ request, params }) => {
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
              name: "files",
              defaultValue: data.data.coverImageUrl,
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
              name: "files",
              defaultValue: data.data.thumbnailImageUrl,
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
              name: "files",
              defaultValue: data.data.iconImageUrl,
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
const route1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  action,
  default: EditEvent,
  loader: loader$2
}, Symbol.toStringTag, { value: "Module" }));
const loader$1 = async ({ request }) => {
  const url = new URL(request.url);
  const page = parseInt(url.searchParams.get("page") || "1", 10);
  const perPage = parseInt(url.searchParams.get("perPage") || "25", 10);
  return fetchMovies({ page, perPage });
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
const route2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Cinema,
  loader: loader$1
}, Symbol.toStringTag, { value: "Module" }));
const Events = () => {
  return /* @__PURE__ */ jsxs("div", { className: "max-w-5xl mx-auto px-4 py-8", children: [
    /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold mb-6", children: "Event Categories" }),
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
          to: "/events/workshops",
          className: "relative group flex flex-col items-center",
          children: [
            /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center h-48 w-full rounded-xl shadow-2xl bg-blend-hard-light transform transition-transform duration-300 ease-in-out group-hover:scale-105 group-hover:shadow-lg", children: /* @__PURE__ */ jsx(WrenchScrewdriverIcon, { className: "w-16 h-16 text-gray-700" }) }),
            /* @__PURE__ */ jsx("div", { className: "mt-2 text-center text-lg font-semibold", children: "Workshops" })
          ]
        }
      ),
      /* @__PURE__ */ jsxs(
        Link,
        {
          to: "/events/pop-up-club",
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
          to: "/events/games",
          className: "relative group flex flex-col items-center",
          children: [
            /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center h-48 w-full rounded-xl shadow-2xl bg-blend-hard-light transform transition-transform duration-300 ease-in-out group-hover:scale-105 group-hover:shadow-lg", children: /* @__PURE__ */ jsx(PuzzlePieceIcon, { className: "w-16 h-16 text-gray-700" }) }),
            /* @__PURE__ */ jsx("div", { className: "mt-2 text-center text-lg font-semibold", children: "Games" })
          ]
        }
      ),
      /* @__PURE__ */ jsxs(
        Link,
        {
          to: "/events/registrations",
          className: "relative group flex flex-col items-center",
          children: [
            /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center h-48 w-full rounded-xl shadow-2xl bg-gray-200 transform transition-transform duration-300 ease-in-out group-hover:scale-105 group-hover:shadow-lg", children: /* @__PURE__ */ jsx(RectangleGroupIcon, { className: "w-16 h-16 text-gray-700" }) }),
            /* @__PURE__ */ jsx("div", { className: "mt-2 text-center text-lg font-semibold", children: "Event Registrations" })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsx(Outlet, {})
  ] });
};
const route3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Events
}, Symbol.toStringTag, { value: "Module" }));
const loader = async ({ params }) => {
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
    ] }) }),
    /* @__PURE__ */ jsxs("div", { className: "mt-8 p-4 rounded-lg shadow-2xl", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-2xl font-semibold text-gray-900 mb-4", children: "Additional Details" }),
      /* @__PURE__ */ jsxs("p", { className: "text-lg text-gray-700 mb-2", children: [
        /* @__PURE__ */ jsx("strong", { className: "text-gray-900", children: "YouTube Video Id:" }),
        " ",
        data.data.videoId
      ] }),
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
      /* @__PURE__ */ jsxs("p", { className: "text-lg text-gray-700 mb-2", children: [
        /* @__PURE__ */ jsx("strong", { className: "text-gray-900", children: "Priority:" }),
        " ",
        data.data.priority
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
      data.data.iconImageUrl && /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center", children: [
        /* @__PURE__ */ jsx("p", { className: "text-lg text-gray-600 mt-2 break-words", children: /* @__PURE__ */ jsx("strong", { className: "text-gray-900", children: "Icon Image:" }) }),
        /* @__PURE__ */ jsx(
          "img",
          {
            src: data.data.iconImageUrl,
            alt: "Icon",
            className: "w-16 h-16 object-cover rounded shadow-2xl"
          }
        ),
        /* @__PURE__ */ jsxs("p", { className: "text-sm text-gray-600 mt-2 break-words", children: [
          /* @__PURE__ */ jsx("strong", { className: "text-gray-900", children: "Icon Image URL:" }),
          " ",
          data.data.iconImageUrl
        ] })
      ] })
    ] })
  ] });
}
const route4 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: MovieDetails,
  loader
}, Symbol.toStringTag, { value: "Module" }));
function EventsIndex() {
  return /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(Outlet, {}) });
}
const route5 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
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
    /* @__PURE__ */ jsxs("a", { href: "/path-to-detail-page-3", className: "group", children: [
      /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center h-48 w-full rounded-lg shadow-lg overflow-hidden", children: /* @__PURE__ */ jsx(
        "img",
        {
          className: "h-auto max-w-full rounded-lg object-cover transform transition-transform duration-500 ease-in-out group-hover:scale-110 group-hover:opacity-90",
          src: "/images/user.png",
          alt: "Gallery Image 3"
        }
      ) }),
      /* @__PURE__ */ jsx("div", { className: "mt-2 text-center text-lg font-semibold group-hover:text-blue-600 transition-colors duration-300", children: "User" })
    ] })
  ] });
};
function Index() {
  return /* @__PURE__ */ jsx("div", { className: "flex flex-col items-center justify-center min-h-screen p-6", children: /* @__PURE__ */ jsx(Gallery, {}) });
}
const route6 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Index
}, Symbol.toStringTag, { value: "Module" }));
const serverManifest = { "entry": { "module": "/assets/entry.client-C4qtgu4R.js", "imports": ["/assets/jsx-runtime-56DGgGmo.js", "/assets/index-BoEtlhzw.js", "/assets/components-C-v4od-A.js"], "css": [] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/root-DaPrzehr.js", "imports": ["/assets/jsx-runtime-56DGgGmo.js", "/assets/index-BoEtlhzw.js", "/assets/components-C-v4od-A.js"], "css": ["/assets/root-Djp1O7ll.css"] }, "routes/events.edit.$uuid": { "id": "routes/events.edit.$uuid", "parentId": "routes/events", "path": "edit/:uuid", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/events.edit._uuid-vqg8W8Lv.js", "imports": ["/assets/jsx-runtime-56DGgGmo.js", "/assets/index-BoEtlhzw.js", "/assets/components-C-v4od-A.js"], "css": [] }, "routes/events.cinema": { "id": "routes/events.cinema", "parentId": "routes/events", "path": "cinema", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/events.cinema-Ft90mb46.js", "imports": ["/assets/jsx-runtime-56DGgGmo.js", "/assets/index-BoEtlhzw.js", "/assets/components-C-v4od-A.js"], "css": [] }, "routes/events._index": { "id": "routes/events._index", "parentId": "routes/events", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/events._index-BJIZjb44.js", "imports": ["/assets/jsx-runtime-56DGgGmo.js", "/assets/index-BoEtlhzw.js", "/assets/components-C-v4od-A.js"], "css": [] }, "routes/events.$uuid": { "id": "routes/events.$uuid", "parentId": "routes/events", "path": ":uuid", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/events._uuid-Dqx6tzgD.js", "imports": ["/assets/jsx-runtime-56DGgGmo.js", "/assets/index-BoEtlhzw.js", "/assets/components-C-v4od-A.js"], "css": [] }, "routes/events": { "id": "routes/events", "parentId": "root", "path": "events", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/events-hIHVxr1u.js", "imports": ["/assets/jsx-runtime-56DGgGmo.js", "/assets/index-BoEtlhzw.js"], "css": [] }, "routes/_index": { "id": "routes/_index", "parentId": "root", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/_index-D0GBS94A.js", "imports": ["/assets/jsx-runtime-56DGgGmo.js"], "css": [] } }, "url": "/assets/manifest-3f10424c.js", "version": "3f10424c" };
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
  "routes/events.edit.$uuid": {
    id: "routes/events.edit.$uuid",
    parentId: "routes/events",
    path: "edit/:uuid",
    index: void 0,
    caseSensitive: void 0,
    module: route1
  },
  "routes/events.cinema": {
    id: "routes/events.cinema",
    parentId: "routes/events",
    path: "cinema",
    index: void 0,
    caseSensitive: void 0,
    module: route2
  },
  "routes/events._index": {
    id: "routes/events._index",
    parentId: "routes/events",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: route3
  },
  "routes/events.$uuid": {
    id: "routes/events.$uuid",
    parentId: "routes/events",
    path: ":uuid",
    index: void 0,
    caseSensitive: void 0,
    module: route4
  },
  "routes/events": {
    id: "routes/events",
    parentId: "root",
    path: "events",
    index: void 0,
    caseSensitive: void 0,
    module: route5
  },
  "routes/_index": {
    id: "routes/_index",
    parentId: "root",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: route6
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
