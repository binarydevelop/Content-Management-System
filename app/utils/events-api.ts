
export async function fetchEvents({
  page,
  perPage,
  eventType
}: {
  page: number;
  perPage: number;
  eventType: string;
}) {
  const apiUrl = new URL(`${process.env.API_BASE_URL}/${process.env.API_VERSION}/events/listing`);
  apiUrl.searchParams.append("page", page.toString());
  apiUrl.searchParams.append("perPage", perPage.toString());
  apiUrl.searchParams.append("eventType", eventType);
  const response = await fetch(apiUrl.toString(), {
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.API_AUTH_TOKEN}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch ${eventType}`);
  }

  const data = await response.json();
  return {
    events: data.data,
    hasNextPage: data.hasNextPage,
    page,
    perPage,
  };
}

export async function fetchEventDetails(uuid: string) {
  const apiUrl = new URL(`${process.env.API_BASE_URL}/${process.env.API_VERSION}/events/details/${uuid}`);
  const response = await fetch(apiUrl.toString(), {
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.API_AUTH_TOKEN}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch movie details");
  }

  return response.json();
}

export async function deleteEvent(uuid: string) {

}

export const updateEvent = async (uuid: string, formData: FormData) => {
  try {
    const apiUrl = new URL(`${process.env.API_BASE_URL}/${process.env.API_VERSION}/events/update/${uuid}`);
    const response = await fetch(apiUrl.toString(), {
      method: 'PUT',
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.API_AUTH_TOKEN}`,
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

export async function createEvent(formData: FormData, eventType: string, config: { baseUrl: any, apiToken: any, apiVersion: any }) {
  const response = await fetch(`${config.baseUrl}/${config.apiVersion}/events/create?eventType=${eventType}`, {
    method: "POST",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${config.apiToken}`,
    },

    body: formData,
  });

  if (!response.ok) {
    console.error(`Failed to create event. Status: ${response.status}. Response: ${await response.text()}`);
    throw new Error(`Failed to create event: ${response.statusText}`);
  }

  return response.json();
}

export async function fetchAllEvents() {
  const apiUrl = new URL(`${process.env.API_BASE_URL}/${process.env.API_VERSION}/events/all`);
  const response = await fetch(apiUrl.toString(), {
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.API_AUTH_TOKEN}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch events");
  }

  return response.json();
}

export async function fetchEventUsers(eventId: string, config: { baseUrl: any, apiToken: any, apiVersion: any }) {

  const apiUrl = new URL(`${config.baseUrl}/${config.apiVersion}/events/registrations/${eventId}`);
  console.log(apiUrl, config)
  const response = await fetch(apiUrl.toString(), {
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${config.apiToken}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch event regiostrations.");
  }

  return response.json();
}
