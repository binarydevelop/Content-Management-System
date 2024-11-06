export async function fetchMediaLibrary({
    page,
    perPage,
    mediaCategory,
    languageCode
  }: {
    page: number;
    perPage: number;
    mediaCategory: string;
    languageCode: any;
  }) {
    const apiUrl = new URL(`${process.env.API_BASE_URL}/${process.env.API_VERSION}/media-library`);
    apiUrl.searchParams.append("page", page.toString());
    apiUrl.searchParams.append("perPage", perPage.toString());
    apiUrl.searchParams.append("categoryCode", mediaCategory);
    apiUrl.searchParams.append("languageCode", languageCode);
    apiUrl.searchParams.append("order", 'desc');
    const response = await fetch(apiUrl.toString(), {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.API_AUTH_TOKEN}`,
      },
    });
  console.log(response)
    if (!response.ok) {
      throw new Error(`Failed to fetch ${mediaCategory}`);
    }
  
    const data = await response.json();
    return {
      mediaLibrary: data.data,
      hasNextPage: data.hasNextPage,
      page,
      perPage,
    };
  }