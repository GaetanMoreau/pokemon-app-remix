import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
    return [
        { title: "Remix Pokemon Catcher - FAQ" },
        { name: "description", content: "Welcome to your bag. Here you will find all the pokemon you've captured" },
    ];
};

export default function Component() {

    return (
        <>
        </>
    );
}

