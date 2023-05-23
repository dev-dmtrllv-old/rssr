import { App } from "@ssr/App";
import { Request, Response } from "express";
import ReactDOM from "react-dom/server";

export const renderApp = (AppComponent: App.FC) => (_: Request, res: Response) =>
{
	const html = ReactDOM.renderToString(<AppComponent />);
	console.log(html);
	res.send(html);
}