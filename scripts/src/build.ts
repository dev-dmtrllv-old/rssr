import webpack from "webpack";

import { clientConfig } from "./client.config";
import { serverConfig } from "./server.config";

webpack([clientConfig("src/app/index.tsx", false), serverConfig("src/server/index.tsx", false)], (err, stats) => 
{
	if (err)
		console.error(err);

	if (stats)
		console.log(stats.toString("minimal"));
});