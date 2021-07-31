import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  //   await prisma.user.create({
  //     data: {
  //       firstName: "Rajat",
  //       lastName: "Kulkarni",
  //       email: "rajat@gmail.com",
  //       spotifyUrl: "open.spotify.com/rajat",
  //       playlists: {
  //         create: [
  //           {
  //             name: "Rock and Roll",
  //             url: "open.spotify.com/playlist/12",
  //           },
  //         ],
  //       },
  //     },
  //   });

  const findUser = await prisma.user.findUnique({
    where: { email: "rajat@gmail.com" },
  });

  const userId: string = findUser?.id!;

  await prisma.playlist.create({
    data: {
      name: "Jazz",
      url: "open.spotify.com/playlists/345",
      userId: userId,
    },
  });
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => await prisma.$disconnect());
