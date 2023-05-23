import express from "express";

const HOST = env.isDev ? "localhost" : "localhost";
const PORT = env.isDev ? 3001 : 8080;

const app = express();

app.get("*", (_, res) => 
{
	res.send(`Hello ${env.isDev ? "dev" : "prod"}!`);
});

app.listen(PORT, HOST, () => console.log(`Server is listening on http://${HOST}:${PORT}`));