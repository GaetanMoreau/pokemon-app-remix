import appStylesHref from "./assets/styles/master.css";
import type { LinksFunction, LoaderFunctionArgs } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData
} from "@remix-run/react";
import Header from "./components/header";
import bag from "./assets/data/bag.json";


export const links: LinksFunction = () => [
  { rel: "stylesheet", href: appStylesHref },
];

export async function loader({ }: LoaderFunctionArgs) {
  return bag;
}

export default function App() {
  const pokemonsInBag = useLoaderData();
  let count = Object.keys(pokemonsInBag).length;

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Header count={count} />
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
