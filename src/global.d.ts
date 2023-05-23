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

declare type ImportedModule<T> = Promise<T & {
	__IMPORT_PATH__: string;
	__IMPORT_ORIGIN__: string;
}>;