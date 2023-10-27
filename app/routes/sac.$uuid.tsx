import type { ActionFunctionArgs } from "@remix-run/node";
import { bagPokemon } from "../types/pokemon";

import { json } from "@remix-run/node";
import fs from "fs/promises";

export async function action({ request, params }: ActionFunctionArgs) {
    const uuid = params.uuid;
    if (!uuid) {
        return json({ message: 'UUID not provided.' }, { status: 400 });
    }

    const bagFilePath = './app/assets/data/bag.json';

    try {
        const bagData = await fs.readFile(bagFilePath, 'utf8');
        const bag = JSON.parse(bagData);
        const numUuid = Number(uuid);
        const filteredBag = bag.filter((item: bagPokemon) => item.uuid !== numUuid);

        await fs.writeFile(bagFilePath, JSON.stringify(filteredBag, null, 2), 'utf8');

        return json({ message: 'Pokémon libéré avec succès.' }, { status: 200 });

    } catch (error) {
        console.error('Une erreur s\'est produite :', error);
        return json({ message: 'Erreur lors de la manipulation du fichier JSON' }, { status: 500 });
    }
}