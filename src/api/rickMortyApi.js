import axios from "axios";

const BASE_URL = "https://rickandmortyapi.com/api/character";

export const fetchCharacters = async ({ page, name }) => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        page: page,
        name: name,
      },
    });
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return { results: [], info: { pages: 0 } };
    }
    throw error;
  }
};
