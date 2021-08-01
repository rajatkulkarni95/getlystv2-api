import Fastify, { FastifyInstance, fastify } from "fastify";

const server: FastifyInstance = Fastify();

server.get("/", async (request, reply) => {
  return "Oh Hey there!\n";
});

server.listen(8080, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
