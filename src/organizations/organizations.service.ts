// ============================= START: Import Statements =============================
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { UpdateOrganizationDto } from './dto/update-organization.dto';
// ============================= END: Import Statements =============================


// ============================= START: OrganizationsService Class =============================
@Injectable()
export class OrganizationsService {
    // ============================= START: Constructor =============================
    // Inject PrismaService for database operations
    constructor(private prisma: PrismaService) { }
    // ============================= END: Constructor =============================


    // ============================= START: Create Organization =============================
    /**
     * Create a new organization in the database
     * @param dto Data required to create an organization
     */
    create(dto: CreateOrganizationDto) {
        // Directly pass the DTO to Prisma's create method
        return this.prisma.organization.create({ data: dto });
    }
    // ============================= END: Create Organization =============================


    // ============================= START: Find All Organizations =============================
    /**
     * Retrieve all organizations from the database
     */
    findAll() {
        // Returns an array of all organizations
        return this.prisma.organization.findMany();
    }
    // ============================= END: Find All Organizations =============================


    // ============================= START: Find One Organization =============================
    /**
     * Retrieve a single organization by its ID
     * @param id Organization ID
     */
    findOne(id: number) {
        // Find a unique organization by primary key
        return this.prisma.organization.findUnique({ where: { id } });
    }
    // ============================= END: Find One Organization =============================


    // ============================= START: Update Organization =============================
    /**
     * Update an existing organization by ID
     * @param id Organization ID
     * @param dto Data to update
     */
    update(id: number, dto: UpdateOrganizationDto) {
        // Update organization with new data
        return this.prisma.organization.update({ where: { id }, data: dto });
    }
    // ============================= END: Update Organization =============================


    // ============================= START: Remove Organization =============================
    /**
     * Delete an organization by its ID
     * @param id Organization ID
     */
    remove(id: number) {
        // Delete organization from the database
        return this.prisma.organization.delete({ where: { id } });
    }
    // ============================= END: Remove Organization =============================
}
// ============================= END: OrganizationsService Class =============================
