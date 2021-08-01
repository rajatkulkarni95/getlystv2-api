import prisma from "../../../prisma";
import { Playlist } from "../../types/playlist";

export const createPlaylist = async (
  playlistData: Playlist,
  userId: string
) => {
  await prisma.playlist.create({
    data: {
      name: playlistData.name,
      url: playlistData.url,
      userId: userId,
    },
  });
};

export const updatePlaylistName = async (playlistId: string, name: string) => {
  await prisma.playlist.update({
    where: { id: playlistId },
    data: { name: name },
  });
};
