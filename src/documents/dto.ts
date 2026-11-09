import { z } from 'zod';
import { EMBEDDING_DIMS } from '../db/schemas/documents/documents.schema.js';

export const createDocumentSchema = z.object({
  title: z.string().min(1).max(500),
  content: z.string().max(10000).default(''),
  embedding: z.array(z.number()).length(EMBEDDING_DIMS),
});

export type CreateDocumentDto = z.infer<typeof createDocumentSchema>;

export const searchDocumentsSchema = z.object({
  query: z.array(z.number()).length(EMBEDDING_DIMS),
  limit: z.number().int().min(1).max(100).default(5),
});

export type SearchDocumentsDto = z.infer<typeof searchDocumentsSchema>;
