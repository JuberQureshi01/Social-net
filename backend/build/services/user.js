"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const db_1 = require("../clients/db");
const jwt_1 = __importDefault(require("./jwt"));
class UserService {
    static async verifyGoogleAuthToken(token) {
        const googleOauthURL = new URL('https://oauth2.googleapis.com/tokeninfo');
        googleOauthURL.searchParams.set('id_token', token);
        const { data } = await axios_1.default.get(googleOauthURL.toString());
        if (!data.email) {
            throw new Error("Google token is invalid or doesn't have an email");
        }
        let user = await db_1.prismaClient.user.findUnique({
            where: { email: data.email },
        });
        if (!user) {
            user = await db_1.prismaClient.user.create({
                data: {
                    email: data.email,
                    firstName: data.given_name || 'User',
                    lastName: data.family_name,
                    profileImageUrl: data.picture,
                },
            });
        }
        const userToken = jwt_1.default.generateTokenForUser(user);
        return userToken;
    }
    static async followUser(from, to) {
        return db_1.prismaClient.follows.create({
            data: {
                follower: { connect: { id: from } },
                following: { connect: { id: to } },
            },
        });
    }
    static async unfollowUser(from, to) {
        return db_1.prismaClient.follows.delete({
            where: { followerId_followingId: { followerId: from, followingId: to } },
        });
    }
    static async getUserById(id) {
        return await db_1.prismaClient.user.findUnique({ where: { id } });
    }
}
exports.default = UserService;
