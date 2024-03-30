import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { DATABASE_URL } from "$env/static/private";
import { json, type RequestHandler } from "@sveltejs/kit";

import * as schema from "../../../../drizzle/schema";
import { count, isNull } from 'drizzle-orm';
import type { Stats } from '../../../types/Stats';

const sql = neon(DATABASE_URL);
const db = drizzle(sql, { schema });

export const GET: RequestHandler = async () => {
    const totalUsers = (await db.select({ count: count() }).from(schema.users).execute())[0].count
    const spawnedItems = (await db.select({ count: count() }).from(schema.items).where(isNull(schema.items.authority)).execute())[0].count

    const stats: Stats = { totalUsers, spawnedItems }
    return json(stats);
}

export const POST: RequestHandler = async ({ request }) => {
    const body = await request.json();

    return json({});
}

