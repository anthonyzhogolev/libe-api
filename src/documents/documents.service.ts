import { Injectable } from '@nestjs/common';
import { InjectDrizzle } from '@nestjs/drizzle';
import { asc, cosineDistance, desc, sql } from 'drizzle-orm';
import type { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { documents, type Document, type NewDocument } from '../db/schema.js';

@Injectable()
export class DocumentsService {
  constructor(
    @InjectDrizzle()
    private readonly db: NodePgDatabase,
  ) {}

  findAll(): Promise<Document[]> {
    return this.db.select().from(documents).orderBy(asc(documents.id));
  }

  async create(data: NewDocument): Promise<Document> {
    const [created] = await this.db.insert(documents).values(data).returning();
    return created;
  }

  async search(query: number[], limit: number) {
    const similarity =
      sql<number>`1 - (${cosineDistance(documents.embedding, query)})`;

    return this.db
      .select({
        id: documents.id,
        title: documents.title,
        content: documents.content,
        similarity,
      })
      .from(documents)
      .orderBy((t) => desc(t.similarity))
      .limit(limit);
  }
}
