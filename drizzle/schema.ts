import { pgTable, unique, pgEnum, uuid, varchar, timestamp, text, jsonb, real, integer } from "drizzle-orm/pg-core"

export const authority = pgEnum("authority", ['detactive'])


export const users = pgTable("users", {
	id: uuid("id").defaultRandom().primaryKey().notNull(),
	username: varchar("username", { length: 32 }).notNull(),
	email: varchar("email", { length: 320 }).notNull(),
	createdAt: timestamp("createdAt", { mode: 'date' }).defaultNow().notNull(),
	secret: text("secret").notNull(),
	authority: authority("authority").notNull(),
	position: jsonb("position"),
},
	(table) => {
		return {
			usersUsernameUnique: unique("users_username_unique").on(table.username),
		}
	});

export const items = pgTable("items", {
	id: uuid("id").defaultRandom().primaryKey().notNull(),
	itemType: uuid("itemType"),
	authority: uuid("authority"),
	expiration: timestamp("expiration", { mode: 'date' }),
	position: jsonb("position"),
});

export const itemTypes = pgTable("itemTypes", {
	id: uuid("id").defaultRandom().primaryKey().notNull(),
	name: varchar("name", { length: 32 }).notNull(),
	spawnProbability: real("spawnProbability").notNull(),
	minExpiration: integer("minExpiration").default(240).notNull(),
	maxExpiration: integer("maxExpiration").default(1440).notNull(),
},
	(table) => {
		return {
			itemTypesNameUnique: unique("itemTypes_name_unique").on(table.name),
		}
	});