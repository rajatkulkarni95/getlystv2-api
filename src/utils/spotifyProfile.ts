import axios from "axios";

export const fetchSpotifyProfile = async (token: string) => {
  const result = await axios.get("https://api.spotify.com/v1/me", {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  return result.data;
};
