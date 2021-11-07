import { FastifyPluginAsync } from "fastify";
import * as qs from "qs";
import axios from "axios";
import {
  FRONTEND_URI,
  REDIRECT_URI,
  SPOTIFY_CLIENT_ID,
  SPOTIFY_CLIENT_SECRET,
} from "../../../../constants/env";
import { Buffer } from "buffer";
import { spotifyAPIUrl, stateKey } from "../../../../constants/spotify";
import { fetchSpotifyProfile } from "../../../../utils/spotifyProfile";

interface ICallbackQuery {
  code: string | null;
  state: string | null;
}

const callback: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.get<{ Querystring: ICallbackQuery }>(
    "/callback",
    async function (request, reply) {
      const { code, state } = request.query;
      const storedState = request.cookies[stateKey];
      if (state === null || state !== storedState) {
        reply.redirect(`/#${qs.stringify({ error: "state_mismatch" })}`);
      } else {
        reply.clearCookie(stateKey);
      }

      const buff = Buffer.from(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`);

      const config = {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Basic ${buff.toString("base64")}`,
        },
      };

      const body = qs.stringify({
        grant_type: "authorization_code",
        code: code,
        redirect_uri: REDIRECT_URI,
      });

      try {
        const { data } = await axios.post(spotifyAPIUrl, body, config);
        const { access_token, refresh_token } = data;
        // fetch spotify profile to be sent to the client
        const spotifyProfile = await fetchSpotifyProfile(access_token);

        reply.cookie("spotifyProfile", JSON.stringify(spotifyProfile));

        reply.redirect(
          `${FRONTEND_URI}#${qs.stringify({
            access_token,
            refresh_token,
          })}`
        );
      } catch (error) {
        reply.redirect(`/#${qs.stringify({ error: "invalid_token" })}`);
      }
    }
  );
};

export default callback;
