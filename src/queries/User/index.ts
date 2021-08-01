import { Prisma } from "@prisma/client";
import prisma from "../../../prisma";

export const createUser = async (user: Prisma.UserCreateInput) => {
  try {
    await prisma.user.create({
      data: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        spotifyUrl: user.spotifyUrl,
        playlists: user.playlists,
      },
    });
  } catch (e) {
    throw e;
  } finally {
    async () => await prisma.$disconnect;
  }
};
