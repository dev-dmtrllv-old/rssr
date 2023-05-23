import { renderApp } from "@ssr/server";
import express from "express";

import App from "@app";

const HOST = env.isDev ? "localhost" : "localhost";
const PORT = env.isDev ? 3001 : 8080;

const app = express();

app.get("*", renderApp(App));

app.listen(PORT, HOST, () => console.log(`Server is listening on http://${HOST}:${PORT}`));