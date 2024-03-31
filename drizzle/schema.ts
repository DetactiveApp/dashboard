import { pgTable, foreignKey, pgEnum, uuid, timestamp, jsonb, unique, varchar, text, real } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"

export const authority = pgEnum("authority", ['detactive'])


export const items = pgTable("items", {
	id: uuid("id").defaultRandom().primaryKey().notNull(),
	itemType: uuid("itemType").references(() => itemTypes.id),
	authority: uuid("authority").references(() => users.id, { onDelete: "cascade" }),
	expiration: timestamp("expiration", { mode: 'string' }),
	position: jsonb("position"),
});

export const users = pgTable("users", {
	id: uuid("id").defaultRandom().primaryKey().notNull(),
	username: varchar("username", { length: 32 }).notNull(),
	email: varchar("email", { length: 320 }).notNull(),
	createdAt: timestamp("createdAt", { mode: 'string' }).defaultNow().notNull(),
	secret: text("secret").notNull(),
	authority: authority("authority").notNull(),
	position: jsonb("position"),
},
	(table) => {
		return {
			usersUsernameUnique: unique("users_username_unique").on(table.username),
		}
	});

export const itemTypes = pgTable("itemTypes", {
	id: uuid("id").defaultRandom().primaryKey().notNull(),
	name: varchar("name", { length: 32 }).notNull(),
	spawnProbability: real("spawnProbability").default(1.0).notNull(),
},
	(table) => {
		return {
			itemTypesNameUnique: unique("itemTypes_name_unique").on(table.name),
		}
	});