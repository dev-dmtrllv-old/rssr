
import path from "path";

const root = path.resolve(__dirname, "../..");

export const resolve = (...parts: string[]) => path.resolve(root, ...parts);

export default {
	root,
	resolve
};