import { Prisma } from "@prisma/client";
import prisma from "../../../prisma";

export const createUser = async (user: Prisma.UserCreateInput) => {
  const result = await prisma.user.create({
    data: {
      email: user.email,
      url: user.url,
      playlists: user.playlists,
      id: user.id,
      image: user.image,
    },
  });

  return result;
};

// Fetch user based on email (since its a unique key) and return all data excluding playlist details
export const fetchUser = async (id: string) => {
  const result = await prisma.user.findUnique({
    where: {
      uuid: id,
    },
    include: {
      playlists: true,
    },
  });

  return result;
};
