"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const server_1 = require("@apollo/server");
const express4_1 = require("@apollo/server/express4");
const cors_1 = __importDefault(require("cors"));
const init_1 = require("./app/init");
const jwt_1 = __importDefault(require("./services/jwt"));
async function init() {
    const app = (0, express_1.default)();
    const PORT = 8000;
    app.use((0, cors_1.default)());
    app.use(express_1.default.json());
    const server = new server_1.ApolloServer({
        typeDefs: init_1.App.typeDefs,
        resolvers: init_1.App.resolvers,
    });
    await server.start();
    app.use("/graphql", (0, express4_1.expressMiddleware)(server, {
        context: async ({ req }) => {
            const token = req.headers["authorization"]?.split("Bearer ")[1];
            if (token) {
                const decodedUser = jwt_1.default.decodeToken(token);
                return { user: decodedUser || undefined };
            }
            return {};
        },
    }));
    app.get("/", (req, res) => {
        res.send("Server is up and running!");
    });
    app.listen(PORT, () => {
        console.log(`🚀 GraphQL endpoint ready at http://localhost:${PORT}/graphql`);
    });
}
init();
