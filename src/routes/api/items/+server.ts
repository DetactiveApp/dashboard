import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { DATABASE_URL } from "$env/static/private";
import { json, type RequestHandler } from "@sveltejs/kit";

import * as schema from "../../../../drizzle/schema";
import { asc, eq } from 'drizzle-orm';
import type { Item } from '../../../types';

const sql = neon(DATABASE_URL);
const db = drizzle(sql, { schema });

export const GET: RequestHandler = async ({ url }) => {
    const nameQuery = url.searchParams.get('nameQuery')
    if (nameQuery) {
        const items: Item[] = await db.query.itemTypes.findMany({ limit: 5, where: (itemTypes, { ilike }) => ilike(itemTypes.name, "%" + nameQuery as string + "%") })
        return json(items)
    }
    const items: Item[] = await db.query.itemTypes.findMany()
    return json(items)
}

export const POST: RequestHandler = async ({ request }) => {
    let itemType: Item = await request.json();

    if (itemType.id) {
        itemType = (await db.update(schema.itemTypes).set({ name: itemType.name!, spawnProbability: itemType.spawnProbability!, minExpiration: itemType.minExpiration, maxExpiration: itemType.maxExpiration }).where(eq(schema.itemTypes.id, itemType.id)).returning().execute())[0]
    } else {
        itemType = (await db.insert(schema.itemTypes).values({ name: itemType.name!, spawnProbability: itemType.spawnProbability!, minExpiration: itemType.minExpiration, maxExpiration: itemType.maxExpiration }).returning().execute())[0]
    }

    return json(itemType);
}

export const DELETE: RequestHandler = async ({ request }) => {
    const itemType: Item = await request.json();

    if (itemType.id) {
        db.delete(schema.itemTypes).where(eq(schema.itemTypes.id, itemType.id)).execute()
    }

    return json({});
}
