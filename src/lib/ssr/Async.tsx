import crc32 from "crc/crc32";
import React from "react";

export namespace Async
{
	export const create = <P extends {}, T>(resolver: Resolver<P, T>, Component: React.FC<P & State<T>>): FC<P> =>
	{
		const resolverHash = crc32(resolver.toString());
		const componentHash = crc32(Component.toString());

		const componentID = `${resolverHash}.${componentHash}`;

		const useID = (props: Omit<P & Props, keyof Props>) => React.useMemo(() => 
		{
			console.log("recalculate propsID", props);
			return `${componentID}.${crc32(JSON.stringify(props))}`;
		}, Object.values(props)); 

		return ({ prefetch, ...props }) =>
		{
			const ID = useID(props);



			return <h1>{ID}</h1>;
		};
	};

	type Resolver<P extends {}, T> = (props: P) => Promise<T>;

	type Props = {
		prefetch?: boolean;
	};

	type FC<P extends {}> = React.FC<P & Props>;

	type State<T> = {
		isLoading: true;
		error: undefined;
		data: undefined;
	} | {
		isLoading: false;
		error: Error;
		data: undefined;
	} | {
		isLoading: false;
		error: undefined;
		data: T;
	};
}