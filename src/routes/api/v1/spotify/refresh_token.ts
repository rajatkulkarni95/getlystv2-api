import { FastifyPluginAsync } from "fastify";
import { Buffer } from "buffer";
import * as qs from "qs";
import {
  SPOTIFY_CLIENT_ID,
  SPOTIFY_CLIENT_SECRET,
} from "../../../../constants/env";
import axios from "axios";
import { spotifyAPIUrl } from "../../../../constants/spotify";

interface IRefreshTokenQuery {
  refresh_token: string;
}

const refresh_token: FastifyPluginAsync = async (
  fastify,
  opts
): Promise<void> => {
  fastify.get<{ Querystring: IRefreshTokenQuery }>(
    "/refresh_token/:refresh_token",
    async function (request, reply) {
      const { refresh_token } = request.query;
      const buff = Buffer.from(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`);

      const config = {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Basic ${buff.toString("base64")}`,
        },
      };

      const body = qs.stringify({
        grant_type: "refresh_token",
        refresh_token,
      });

      axios
        .post(spotifyAPIUrl, body, config)
        .then(({ data: { access_token } }) => {
          reply.send({ access_token });
        });
    }
  );
};

export default refresh_token;
