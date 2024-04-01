import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { DATABASE_URL } from "$env/static/private";
import { json, type RequestHandler } from "@sveltejs/kit";

import * as schema from "../../../../drizzle/schema";
import type { Map } from '../../../types/Map';

const sql = neon(DATABASE_URL);
const db = drizzle(sql, { schema });

export const GET: RequestHandler = async () => {
    let items = []
    let streamedItems = await db.query.items.findMany({ where: (items, { isNotNull }) => isNotNull(items.position) })

    for (let i in streamedItems) {
        const item = streamedItems[i];
        let itemType = await db.query.itemTypes.findFirst({ where: (itemTypes, { eq }) => eq(itemTypes.id, item.itemType as string) });

        if (itemType && item.expiration && item.position) {
            items.push({ id: item.id, name: itemType.name, position: item.position, expiration: item.expiration, spawnProbability: itemType.spawnProbability })
        }
    }

    const stats: Map = { items }
    return json(stats);
}

export const POST: RequestHandler = async ({ request }) => {
    const body = await request.json();

    return json({});
}

