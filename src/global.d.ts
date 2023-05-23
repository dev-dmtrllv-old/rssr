type DevEnv = {
	isDev: true;
	isProd: false;
} | {
	isDev: false;
	isProd: true;
};

type RunEnv = {
	isServer: true;
	isClient: false;
} | {
	isServer: false;
	isClient: true;
};

declare const env: DevEnv & RunEnv;