import React from "react";
import { hydrateRoot, createRoot } from "react-dom/client";

export namespace App
{
	export const Context = React.createContext<ContextType | null>(null);

	export const useContext = () =>
	{
		const ctx = React.useContext(Context);

		if (!ctx)
			throw new Error(`No app context provided!`);

		return ctx;
	};

	export const create = (AppComponent: React.FC<Props>): FC =>
	{
		if (env.isClient)
		{
			let rootElement = document.getElementById("root");

			if (!rootElement)
			{
				rootElement = document.createElement("div");
				rootElement.id = "root";
				document.body.appendChild(rootElement);
			}

			if (rootElement.children.length === 0)
			{
				const root = createRoot(rootElement);
				root.render(<AppComponent />);
			}
			else
			{
				hydrateRoot(rootElement!, <AppComponent />);
			}
		}

		return AppComponent;
	};

	export interface FC extends React.FC<Props>
	{

	};

	export type Props = {

	};

	export const enum ContextTypes
	{
		PREFETCHING,
		HYDRATING,
		RENDERING
	};

	type PrefetchContext = {
		type: ContextTypes.PREFETCHING
		asyncStack: any[];
	};

	export type ContextType = PrefetchContext;
}