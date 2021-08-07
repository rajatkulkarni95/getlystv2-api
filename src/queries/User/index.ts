import { Prisma } from "@prisma/client";
import prisma from "../../../prisma";

export const createUser = async (user: Prisma.UserCreateInput) => {
  const result = await prisma.user.create({
    data: {
      email: user.email,
      spotifyUrl: user.spotifyUrl,
      playlists: user.playlists,
      spotifyUsername: user.spotifyUsername,
    },
  });

  return result;
};

// Fetch user based on email (since its a unique key) and return all data excluding playlist details
export const fetchUser = async (email: string) => {
  const result = await prisma.user.findUnique({
    where: {
      email: email,
    },
    include: {
      playlists: true,
    },
  });

  return result;
};
