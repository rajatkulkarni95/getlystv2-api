import { FastifyPluginAsync } from "fastify";
import {
  spotifyAuthorizeUrl,
  spotifyScope,
  stateKey,
} from "../../../constants/spotify";
import { generateRandomString } from "../../../helpers/randomString";
import * as qs from "qs";
import { REDIRECT_URI, SPOTIFY_CLIENT_ID } from "../../../constants/env";

interface ILoginServiceQuery {
  service: "spotify" | "imusic";
}

const login: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.get<{ Querystring: ILoginServiceQuery }>(
    "/login",
    async function (request, reply) {
      // For future use if we add more providers like iMusic/Tidal/Soundcloud
      const { service } = request.query;
      // Generate a random state key
      const state = generateRandomString(16);
      // Set cookies
      reply.cookie(stateKey, state);
      let scope;

      if (service === "spotify") {
        scope = spotifyScope;
        reply.redirect(
          `${spotifyAuthorizeUrl}?${qs.stringify({
            response_type: "code",
            client_id: SPOTIFY_CLIENT_ID,
            scope: scope,
            redirect_uri: REDIRECT_URI,
            state: state,
          })}`
        );
      }
    }
  );
};

export default login;
