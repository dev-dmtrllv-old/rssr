import webpack from "webpack";
import { ChildProcess, fork } from "child_process";

import { clientConfig } from "./client.config";
import { serverConfig } from "./server.config";
import paths, { resolve } from "./paths";

webpack(clientConfig("src/app/index.tsx", true)).watch({}, (err, stats) => 
{
	if (err)
		console.error(err);

	if (stats)
		console.log(stats.toString("minimal"));
});

let compileID = 0;
let serverProcess: ChildProcess | null = null;

const killServer = () => new Promise<void>((res) =>
{
	if (!serverProcess)
		return res();

	serverProcess.on("exit", res);
	serverProcess.kill(0);
});

webpack(serverConfig("src/server/index.tsx", true)).watch({}, async (err, stats) => 
{
	const id = ++compileID;

	if (err)
		console.error(err);

	if (stats)
		console.log(stats.toString("minimal"));

	await killServer();

	if (id === compileID)
		serverProcess = fork(resolve("dist/main.bundle.js"), { stdio: "inherit", cwd: paths.resolve("dist") });
});