import { FastifyPluginAsync } from "fastify";
import { createUser } from "../../../queries/User";

interface ICreateUserBody {
  email: string;
  spotifyUrl: string;
  spotifyUsername: string;
}

const users: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.post<{ Body: ICreateUserBody }>(
    "/users",
    async function (request, reply) {
      const { email, spotifyUrl, spotifyUsername } = request.body;

      const user = { email, spotifyUrl, spotifyUsername };
      const result = await createUser(user);

      reply.code(201).send(result);
    }
  );
};

export default users;
