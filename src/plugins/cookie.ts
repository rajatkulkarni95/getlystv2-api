import fp from "fastify-plugin";
import cookie, { FastifyCookieOptions } from "fastify-cookie";
import { COOKIE_SECRET } from "../constants/env";

export default fp<FastifyCookieOptions>(async (fastify) => {
  fastify.register(cookie, { secret: COOKIE_SECRET });
});
