import { FastifyPluginAsync } from "fastify";
import { createUser, fetchUser } from "../../../queries/User";

interface ICreateUserBody {
  email: string;
  url: string;
  username: string;
}

interface IFetchUser {
  email: string;
}

const users: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.get<{ Querystring: IFetchUser }>(
    "/users",
    async function (request, reply) {
      const { email } = request.query;
      const result = await fetchUser(email);

      reply.code(200).send(result);
    }
  );

  fastify.post<{ Body: ICreateUserBody }>(
    "/users",
    async function (request, reply) {
      const { email, url, username } = request.body;

      const user = { email, url, username };
      const result = await createUser(user);

      reply.code(201).send(result);
    }
  );
};

export default users;
