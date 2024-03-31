import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { DATABASE_URL } from "$env/static/private";
import { json, type RequestHandler } from "@sveltejs/kit";

import * as schema from "../../../../drizzle/schema";
import { eq } from 'drizzle-orm';
import type { Item } from '../../../types';

const sql = neon(DATABASE_URL);
const db = drizzle(sql, { schema });

export const GET: RequestHandler = async () => {
    const items: Item[] = await db.query.itemTypes.findMany()
    return json(items)
}

export const POST: RequestHandler = async ({ request }) => {
    let itemType: Item = await request.json();

    if (itemType.id) {
        itemType = (await db.update(schema.itemTypes).set({ name: itemType.name!, spawnProbability: itemType.spawnProbability! }).where(eq(schema.itemTypes.id, itemType.id)).returning().execute())[0]
    } else {
        itemType = (await db.insert(schema.itemTypes).values({ name: itemType.name!, spawnProbability: itemType.spawnProbability! }).returning().execute())[0]
    }

    return json(itemType);
}

