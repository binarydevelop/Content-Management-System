export async function fetchUsers({
    page,
    perPage,
    eventType
  }: {
    page: number;
    perPage: number;
    eventType: string;
  }) {
    const apiUrl = new URL(`${process.env.API_BASE_URL}/${process.env.API_VERSION}/users`);
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