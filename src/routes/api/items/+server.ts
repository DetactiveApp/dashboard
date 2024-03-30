import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { DATABASE_URL } from "$env/static/private";
import { json, type RequestHandler } from "@sveltejs/kit";

import * as schema from "../../../../drizzle/schema";

const sql = neon(DATABASE_URL);
const db = drizzle(sql, { schema });

export const GET: RequestHandler = async () => {
    return json({})
}

export const POST: RequestHandler = async ({ request }) => {
    const item = await request.json();

    if (item.id) {

    } else {
        await db.insert(schema.itemTypes).values({ name: item.name, spawnProbability: item.spawnProbability }).execute()
    }

    return json({});
}

