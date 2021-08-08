import { FastifyPluginAsync } from "fastify";
import {
  createPlaylist,
  fetchPlaylistDetails,
} from "../../../queries/Playlist";
import { Prisma } from "@prisma/client";

interface IFetchPlaylist {
  id: string;
}

interface ICreatePlaylistBody {
  userId: string;
  playlistData: Prisma.PlaylistCreateInput;
}

const playlists: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.get<{ Querystring: IFetchPlaylist }>(
    "/playlists/:id",
    async function (request, reply) {
      const { id } = request.query;
      const result = await fetchPlaylistDetails(id);

      reply.code(200).send(result);
    }
  );

  fastify.post<{ Body: ICreatePlaylistBody }>(
    "/playlists",
    async function (request, reply) {
      const { userId, playlistData } = request.body;

      await createPlaylist(userId, playlistData);

      reply.code(201).send({ message: "created playlist" });
    }
  );
};

export default playlists;
