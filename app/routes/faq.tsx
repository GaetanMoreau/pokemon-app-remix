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
            <section className="home__container">
                <h1>Des questions ? Nous n'avons pas les réponses. Salut !</h1>
            </section>
        </>
    );
}

