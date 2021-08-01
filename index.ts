import { Prisma } from "@prisma/client";
import prisma from "./prisma";
import { createUser } from "./src/queries/User";

async function main() {
  const newUser: Prisma.UserCreateInput = {
    firstName: "Ada",
    lastName: "Lovelace",
    email: "ada@lovelace.com",
    spotifyUrl: "open.spotify.com/ada",
  };
  createUser(newUser);

  const findAllUsers = await prisma.user.findMany();
  console.log(findAllUsers);
  //   const userId: string = findUser?.id!;

  //   await prisma.playlist.create({
  //     data: {
  //       name: "Jazz",
  //       url: "open.spotify.com/playlists/345",
  //       userId: userId,
  //     },
  //   });
}

main();
