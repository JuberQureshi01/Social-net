"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.redisClient = void 0;
const ioredis_1 = __importDefault(require("ioredis"));
// Make sure your Redis server connection string is in your .env file
// e.g., REDIS_URL="redis://default:password@localhost:6379"
const redisURL = process.env.REDIS_URL;
if (!redisURL) {
    console.error("REDIS_URL is not defined in the environment variables.");
    process.exit(1); // Exit if Redis URL is not set
}
exports.redisClient = new ioredis_1.default(redisURL);
