import webpack from "webpack";
import { ChildProcess, fork } from "child_process";

import { clientConfig } from "./client.config";
import { serverConfig } from "./server.config";
import paths, { resolve } from "./paths";


const status = {
	serverCompiled: false,
	clientCompiled: false
};

let compileID = 0;
let serverProcess: ChildProcess | null = null;

const killServer = () => new Promise<void>((res) =>
{
	if (!serverProcess)
		return res();

	serverProcess.on("exit", res);
	serverProcess.kill(0);
});

const startServer = () =>
{
	console.log("");
	serverProcess = fork(resolve("dist/main.bundle.js"), { stdio: "inherit", cwd: paths.resolve("dist") });
}

webpack(clientConfig("src/app/index.tsx", true)).watch({}, (err, stats) => 
{
	if (err)
		console.error(err);

	if (stats)
		console.log(stats.toString("minimal"));

	if (!status.clientCompiled)
	{
		status.clientCompiled = true;
		if (status.serverCompiled)
			startServer();
	}
});

webpack(serverConfig("src/server/index.tsx", true)).watch({}, async (err, stats) => 
{
	const id = ++compileID;

	if (err)
		console.error(err);

	if (stats)
		console.log(stats.toString("minimal"));

	if (!status.serverCompiled)
	{
		status.serverCompiled = true;
		if (status.clientCompiled)
			startServer();
	}
	else
	{
		await killServer();

		if (id === compileID)
			startServer();
	}
});