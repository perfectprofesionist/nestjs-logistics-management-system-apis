import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateLogisticsProviderDto } from './dto/create-logistics-provider.dto';
import { UpdateLogisticsProviderDto } from './dto/update-logistics-provider.dto';

// ============================ START: Service Overview ============================
// This service class contains all the core business logic for handling
// logistics provider operations. It interacts with the database via PrismaService
// and serves as the main logic layer for the Logistics Provider Controller.
//
// Responsibilities:
//   - Create a new logistics provider
//   - Retrieve all providers
//   - Retrieve a specific provider by ID
//   - Update provider details
//   - Delete a provider
//
// Prisma ORM is used here for type-safe database operations.
// ============================= END: Service Overview =============================

@Injectable()
export class LogisticsProviderService {

  // ============================ START: Constructor ============================
  // Injects PrismaService to allow database operations for logistics provider records.
  // PrismaService acts as the ORM layer for querying, creating, updating, and deleting.
  constructor(private readonly prisma: PrismaService) { }
  // ============================= END: Constructor =============================

  // ============================ START: Create Method ============================
  // Purpose:
  //   - Creates a new logistics provider record in the database.
  //
  // Parameters:
  //   - dto: CreateLogisticsProviderDto containing the required data for creation.
  //
  // Process:
  //   1. Receives the validated DTO from the controller.
  //   2. Passes it to Prisma's `create` method with `data` set to DTO values.
  //   3. Returns the newly created logistics provider record.
  //
  // Database:
  //   - Inserts into `logisticsProvider` table.
  create(dto: CreateLogisticsProviderDto) {
    return this.prisma.logisticsProvider.create({ data: dto });
  }
  // ============================= END: Create Method =============================

  // ============================ START: Find All Method ============================
  // Purpose:
  //   - Retrieves all logistics provider records from the database.
  //
  // Process:
  //   1. Calls Prisma's `findMany` to get all records.
  //   2. Includes the related `organization` data for each provider.
  //
  // Database:
  //   - SELECT * FROM logisticsProvider (with organization join).
  findAll() {
    return this.prisma.logisticsProvider.findMany({ include: { organization: true } });
  }
  // ============================= END: Find All Method =============================

  // ============================ START: Find One Method ============================
  // Purpose:
  //   - Retrieves a single logistics provider by its unique ID.
  //
  // Parameters:
  //   - id: number - The unique identifier of the provider.
  //
  // Process:
  //   1. Calls Prisma's `findUnique` to get the record with the given ID.
  //   2. Includes the related `organization` data.
  //
  // Database:
  //   - SELECT * FROM logisticsProvider WHERE id = :id (with organization join).
  findOne(id: number) {
    return this.prisma.logisticsProvider.findUnique({ where: { id }, include: { organization: true } });
  }
  // ============================= END: Find One Method =============================

  // ============================ START: Update Method ============================
  // Purpose:
  //   - Updates the details of a specific logistics provider.
  //
  // Parameters:
  //   - id: number - The unique identifier of the provider to update.
  //   - dto: UpdateLogisticsProviderDto - Data fields to be updated.
  //
  // Process:
  //   1. Calls Prisma's `update` method.
  //   2. Matches the record by `id`.
  //   3. Applies the updated data from the DTO.
  //
  // Database:
  //   - UPDATE logisticsProvider SET ... WHERE id = :id
  update(id: number, dto: UpdateLogisticsProviderDto) {
    return this.prisma.logisticsProvider.update({ where: { id }, data: dto });
  }
  // ============================= END: Update Method =============================

  // ============================ START: Remove Method ============================
  // Purpose:
  //   - Deletes a logistics provider record by its unique ID.
  //
  // Parameters:
  //   - id: number - The ID of the provider to delete.
  //
  // Process:
  //   1. Calls Prisma's `delete` method.
  //   2. Matches the record by `id`.
  //
  // Database:
  //   - DELETE FROM logisticsProvider WHERE id = :id
  remove(id: number) {
    return this.prisma.logisticsProvider.delete({ where: { id } });
  }
  // ============================= END: Remove Method =============================
}
