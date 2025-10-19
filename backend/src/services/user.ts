import axios from 'axios';
import { prismaClient } from '../clients/db';
import JWTService from './jwt';
import { GraphqlContext } from '../types/interfaces';

// Define the shape of the Google token payload
interface GoogleTokenResult {
    iss?: string;
    nbf?: string;
    aud?: string;
    sub?: string;
    email?: string;
    email_verified?: string;
    azp?: string;
    name?: string;
    picture?: string;
    given_name?: string;
    family_name?: string;
    iat?: string;
    exp?: string;
    jti?: string;
}

class UserService {
    public static async verifyGoogleAuthToken(token: string) {
        const googleOauthURL = new URL('https://oauth2.googleapis.com/tokeninfo');
        googleOauthURL.searchParams.set('id_token', token);

        const { data } = await axios.get<GoogleTokenResult>(googleOauthURL.toString());

        if (!data.email) {
            throw new Error("Google token is invalid or doesn't have an email");
        }

        let user = await prismaClient.user.findUnique({
            where: { email: data.email },
        });

        if (!user) {
            user = await prismaClient.user.create({
                data: {
                    email: data.email,
                    firstName: data.given_name || 'User',
                    lastName: data.family_name,
                    profileImageUrl: data.picture,
                },
            });
        }

        const userToken = JWTService.generateTokenForUser(user);

        return userToken;
    }

    public static async followUser(from: string, to: string) {
        return prismaClient.follows.create({
            data: {
                follower: { connect: { id: from } },
                following: { connect: { id: to } },
            },
        });
    }

    public static async unfollowUser(from: string, to: string) {
        return prismaClient.follows.delete({
            where: { followerId_followingId: { followerId: from, followingId: to } },
        });
    }
    public static async getUserById(id: string) {
    return await prismaClient.user.findUnique({ where: { id } });
  }
}

export default UserService;
