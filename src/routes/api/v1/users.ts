import { FastifyPluginAsync } from "fastify";
import { createUser, fetchUser } from "../../../queries/User";

interface ICreateUserBody {
  email: string;
  url: string;
  id: string;
  avatar: string;
}

interface IFetchUser {
  id: string;
}

const users: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.get<{ Params: IFetchUser }>(
    "/users/:id",
    async function (request, reply) {
      const { id } = request.params;
      const result = await fetchUser(id);

      reply.code(200).send(result);
    }
  );

  fastify.post<{ Body: ICreateUserBody }>(
    "/users",
    async function (request, reply) {
      const { email, url, id, avatar } = request.body;

      const userCreated = await fetchUser(email);

      // return the user if already created
      if (userCreated?.id) {
        reply.code(200).send(userCreated);
      } else {
        const user = { email, url, id, image: avatar };
        const result = await createUser(user);

        reply.code(201).send(result);
      }
    }
  );
};

export default users;
