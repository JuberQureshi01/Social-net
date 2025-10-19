import Redis from 'ioredis';

// Make sure your Redis server connection string is in your .env file
// e.g., REDIS_URL="redis://default:password@localhost:6379"
const redisURL = process.env.REDIS_URL;

if (!redisURL) {
    console.error("REDIS_URL is not defined in the environment variables.");
    process.exit(1); // Exit if Redis URL is not set
}

export const redisClient = new Redis(redisURL);
