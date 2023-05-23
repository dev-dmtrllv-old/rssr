import { App, Async } from "@ssr";

const wait = (ms: number) => new Promise<number>((res) => setTimeout(() => res(ms), ms));

const AsyncTest = Async.create(({ ms }: { ms: number }) => wait(ms), ({ ms, data, error, isLoading }) => 
{
	if(isLoading)
		return <h1>Loading ({ms} ms)...</h1>;
	
	if(error)
		return <h1>Error: {error.message}!</h1>;
	
	return <h1>Waited for {data} ms!</h1>;
});

export default App.create(() => 
{
	return <AsyncTest ms={123} />;	
});