import { nanoid } from "nanoid";
import jwt from 'jsonwebtoken';


export function generateToken() {
	const token = nanoid();
	return jwt.sign(token, process.env.JWT_SECRET!);
}

export function validateToken(token: string): boolean {
	try {
		jwt.verify(token, process.env.JWT_SECRET!)
		return true;
	} catch {
		return false;
	}
}