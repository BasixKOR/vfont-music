import { nanoid } from "nanoid";

const tokens = new Set<string>();

export function generateToken() {
	const token = nanoid();
	tokens.add(token);
	return token;
}

export function validateToken(token: string): boolean {
	return tokens.delete(token);
}