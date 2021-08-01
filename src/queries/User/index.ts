import { Prisma } from "@prisma/client";
import prisma from "../../../prisma";

export const createUser = async (user: Prisma.UserCreateInput) => {
  await prisma.user.create({
    data: {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      spotifyUrl: user.spotifyUrl,
      playlists: user.playlists,
      spotifyUsername: user.spotifyUsername,
    },
  });
};
