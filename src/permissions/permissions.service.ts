// ============================= START: PermissionsService =============================
import { Injectable } from '@nestjs/common';
// Import Prisma client types for typing database inputs
import { Prisma } from '@prisma/client';
// Import PrismaService to interact with the database
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PermissionsService {
    // ============================= START: Constructor =============================
    // Inject PrismaService to interact with the database
    constructor(private prisma: PrismaService) { }
    // ============================= END: Constructor =============================


    /**
     * ============================= START: Create Permission =============================
     * Create a new permission record in the database
     * @param data Data required to create a permission (matches Prisma.PermissionCreateInput)
     */
    create(data: Prisma.PermissionCreateInput) {
        // Call Prisma client's create method on the 'permission' model
        return this.prisma.permission.create({ data });
    }
    // ============================= END: Create Permission =============================


    /**
     * ============================= START: Find All Permissions =============================
     * Retrieve all permission records from the database
     */
    findAll() {
        // Use Prisma client's findMany method to get all permissions
        return this.prisma.permission.findMany();
    }
    // ============================= END: Find All Permissions =============================


    /**
     * ============================= START: Find One Permission =============================
     * Retrieve a single permission by its ID
     * @param id Permission ID
     */
    findOne(id: number) {
        // Use Prisma client's findUnique method with 'where' filter by id
        return this.prisma.permission.findUnique({ where: { id } });
    }
    // ============================= END: Find One Permission =============================


    /**
     * ============================= START: Update Permission =============================
     * Update an existing permission record by ID
     * @param id Permission ID
     * @param data Data to update the permission (Prisma.PermissionUpdateInput)
     */
    update(id: number, data: Prisma.PermissionUpdateInput) {
        // Call Prisma client's update method with 'where' filter and update data
        return this.prisma.permission.update({ where: { id }, data });
    }
    // ============================= END: Update Permission =============================


    /**
     * ============================= START: Remove Permission =============================
     * Delete a permission record by its ID
     * @param id Permission ID
     */
    remove(id: number) {
        // Use Prisma client's delete method with 'where' filter by id
        return this.prisma.permission.delete({ where: { id } });
    }
    // ============================= END: Remove Permission =============================
}
// ============================= END: PermissionsService =============================
