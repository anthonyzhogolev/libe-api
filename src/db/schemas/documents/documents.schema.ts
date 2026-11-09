import { integer, pgTable, text, timestamp, vector } from 'drizzle-orm/pg-core';

export const EMBEDDING_DIMS = 3;

export const documents = pgTable('documents', {
  id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
  title: text('title').notNull(),
  content: text('content').notNull().default(''),
  embedding: vector('embedding', { dimensions: EMBEDDING_DIMS }).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export type Document = typeof documents.$inferSelect;
export type NewDocument = typeof documents.$inferInsert;
