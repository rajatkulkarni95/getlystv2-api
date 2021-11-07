import { FastifyPluginAsync } from "fastify";
import { fetchUser } from "../../../queries/User";

// interface ICreateUserBody {
//   email: string;
//   url: string;
//   id: string;
// }

interface IFetchUser {
  email: string;
}

const users: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.get<{ Querystring: IFetchUser }>(
    "/users/:email",
    async function (request, reply) {
      const { email } = request.query;
      const result = await fetchUser(email);

      reply.code(200).send(result);
    }
  );

  // fastify.post<{ Body: ICreateUserBody }>(
  //   "/users",
  //   async function (request, reply) {
  //     const { email, url, id } = request.body;

  //     const userCreated = await fetchUser(email);

  //     // return the user if already created
  //     if (userCreated?.id) {
  //       reply.code(200).send(userCreated);
  //     } else {
  //       const user = { email, url, id };
  //       const result = await createUser(user);

  //       reply.code(201).send(result);
  //     }
  //   }
  // );
};

export default users;
