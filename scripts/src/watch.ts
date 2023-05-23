import webpack from "webpack";
import { ChildProcess, fork } from "child_process";

import { clientConfig } from "./client.config";
import { serverConfig } from "./server.config";
import paths, { resolve } from "./paths";

let compileID = 0;
let serverProcess: ChildProcess | null = null;

const killServer = () => new Promise<void>((res) =>
{
	if (!serverProcess)
		return res();
	
	serverProcess.on("exit", () => res());
	serverProcess.kill();
});

const startServer = () =>
{
	console.log("\nStarting server...");
	serverProcess = fork(resolve("dist/main.bundle.js"), { stdio: "inherit", cwd: paths.resolve("dist") });
}

webpack([clientConfig("src/app/index.tsx", true), serverConfig("src/server/index.tsx", true)]).watch({}, (err, stats) => 
{
	if (err)
		console.error(err);

	if (stats)
		console.log(stats.toString("minimal"));

	const id = ++compileID;

	killServer().then(() => 
	{
		if (id === compileID)
			startServer();
	});
});