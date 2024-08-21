
export async function fetchMovies({
    page,
    perPage,
}: {
    page: number;
    perPage: number;
}) {
    const apiUrl = new URL(`${process.env.API_BASE_URL}/${process.env.API_VERSION}/events/movies`);
    apiUrl.searchParams.append("page", page.toString());
    apiUrl.searchParams.append("perPage", perPage.toString());

    const response = await fetch(apiUrl.toString(), {
        headers: {
            accept: "application/json",
            Authorization: `Bearer ${process.env.API_AUTH_TOKEN}`,
        },
    });

    if (!response.ok) {
        throw new Error("Failed to fetch movies");
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
  