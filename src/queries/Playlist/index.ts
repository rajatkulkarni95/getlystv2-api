import { Prisma } from "@prisma/client";
import prisma from "../../../prisma";
import { PlaylistDetails } from "../../@types/playlist";

export const fetchPlaylistDetails = async (playlistId: string) => {
  const playlistDetails = await prisma.playlist.findUnique({
    where: {
      id: playlistId,
    },
    include: {
      details: true,
      createdBy: true,
    },
  });

  return playlistDetails;
};

export const createPlaylist = async (
  userId: string,
  playlistData: Prisma.PlaylistCreateInput
) => {
  await prisma.playlist.create({
    data: {
      name: playlistData.name,
      url: playlistData.url,
      userId: userId,
      details: playlistData.details,
    },
  });
};

export const createPlaylistDetails = async (
  playlistId: string,
  details: PlaylistDetails
) => {
  await prisma.playlistSettings.create({
    data: {
      playlistId: playlistId,
      limit: details.limit,
      genres: details.genres,
      artists: details.artists,
      minAcoustic: details.minAcoustic,
      maxAcoustic: details.maxAcoustic,
      minDanceability: details.minDanceability,
      maxDanceability: details.maxDanceability,
      minDuration: details.minDuration,
      maxDuration: details.maxDuration,
      minEnergy: details.minEnergy,
      maxEnergy: details.maxEnergy,
      minInstrumentalness: details.minInstrumentalness,
      maxInstrumentalness: details.maxInstrumentalness,
      minKey: details.minKey,
      maxKey: details.maxKey,
      minLiveness: details.minLiveness,
      maxLiveness: details.maxLiveness,
      minLoudness: details.minLoudness,
      maxLoudness: details.maxLoudness,
      minPopularity: details.minPopularity,
      maxPopularity: details.maxPopularity,
      minTempo: details.minTempo,
      maxTempo: details.maxTempo,
      minValence: details.minValence,
      maxValence: details.maxValence,
    },
  });
};

export const updatePlaylistName = async (playlistId: string, name: string) => {
  await prisma.playlist.update({
    where: { id: playlistId },
    data: { name: name },
  });
};
