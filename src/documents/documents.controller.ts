import { Body, Controller, Get, Post } from '@nestjs/common';
import { DocumentsService } from './documents.service.js';
import {
  createDocumentSchema,
  searchDocumentsSchema,
  type CreateDocumentDto,
  type SearchDocumentsDto,
} from './dto.js';

@Controller('documents')
export class DocumentsController {
  constructor(private readonly documentsService: DocumentsService) {}

  @Get()
  findAll() {
    return this.documentsService.findAll();
  }

  @Post()
  create(@Body({ schema: createDocumentSchema }) dto: CreateDocumentDto) {
    return this.documentsService.create(dto);
  }

  @Post('search')
  search(@Body({ schema: searchDocumentsSchema }) dto: SearchDocumentsDto) {
    return this.documentsService.search(dto.query, dto.limit);
  }
}
