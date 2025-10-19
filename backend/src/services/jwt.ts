import jwt from 'jsonwebtoken';
import { User } from '@prisma/client';

const JWT_SECRET = process.env.JWT_SECRET;

class JWTService {
    public static generateTokenForUser(user: User) {
        if (!JWT_SECRET) {
            throw new Error("JWT_SECRET is not defined in environment variables.");
        }
        const payload = {
            id: user.id,
            email: user.email,
        };
        const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1d' });
        return token;
    }

    public static decodeToken(token: string) {
        if (!JWT_SECRET) {
            throw new Error("JWT_SECRET is not defined in environment variables.");
        }
        try {
            return jwt.verify(token, JWT_SECRET) as { id: string; email: string };
        } catch (error) {
            return null;
        }
    }
}

export default JWTService;
