import { hydrateRoot } from "react-dom/client";

const rootElement = document.getElementById("root");

hydrateRoot(rootElement!, <h1>Hiii</h1>);