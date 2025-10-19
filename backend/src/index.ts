import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import cors from "cors";
import { App } from "./app/init";
import { GraphqlContext } from "./types/interfaces";
import JWTService from "./services/jwt";

async function init() {
  const app = express();
  const PORT = 8000;

  app.use(cors());
  app.use(express.json());

  const server = new ApolloServer({
    typeDefs: App.typeDefs,
    resolvers: App.resolvers,
  });

  await server.start();

  app.use(
    "/graphql",
    expressMiddleware(server, {
      context: async ({ req }): Promise<GraphqlContext> => {
        const token = req.headers["authorization"]?.split("Bearer ")[1];
        if (token) {
          const decodedUser = JWTService.decodeToken(token);
          return { user: decodedUser || undefined };
        }
        return {};
      },
    })
  );

  app.get("/", (req, res) => {
    res.send("Server is up and running!");
  });

  app.listen(PORT, () => {
    console.log(
      `🚀 GraphQL endpoint ready at http://localhost:${PORT}/graphql`
    );
  });
}

init();
