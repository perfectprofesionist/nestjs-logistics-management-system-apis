// roles.service.ts
import { PrismaService } from 'src/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

// ============================= START: RolesService =============================
@Injectable()
export class RolesService {
    // ============================= START: Constructor =============================
    // Inject PrismaService to interact with the database via Prisma ORM
    constructor(private readonly prisma: PrismaService) { }
    // ============================= END: Constructor =============================


    // ============================= START: Create Role Method =============================
    /**
     * Create a new role with optional permissions
     * @param dto Data transfer object containing role name and optional permissions array
     */
    async create(dto: CreateRoleDto) {
        // Destructure name and permissions from DTO
        const { name, permissions } = dto;

        try {
            // Create a role record in the database
            return await this.prisma.role.create({
                data: {
                    name, // Set role name
                    permissions: permissions
                        ? {
                            // If permissions provided, connect role to these permission IDs
                            connect: permissions.map((id) => ({ id })),
                        }
                        : undefined, // If no permissions, leave undefined
                },
            });
        } catch (error) {
            // Log error to console for debugging
            console.error('Role creation failed:', error);
            // Re-throw the error for upper layers to handle (optionally can throw BadRequestException)
            throw error;
        }
    }
    // ============================= END: Create Role Method =============================


    // ============================= START: Find All Roles Method =============================
    /**
     * Retrieve all roles with their associated permissions
     */
    async findAll() {
        // Query all roles including their permissions relation
        return this.prisma.role.findMany({
            include: { permissions: true },
        });
    }
    // ============================= END: Find All Roles Method =============================


    // ============================= START: Find One Role by ID Method =============================
    /**
     * Retrieve a role by ID with permissions, remove internal 'id' fields
     * @param id Role ID to fetch
     */
    async findOne(id: number) {
        // Fetch the role by ID including permissions
        const role = await this.prisma.role.findUnique({
            where: { id },
            include: { permissions: true },
        });

        // If role not found, return null
        if (!role) return null;

        // Destructure to remove role's 'id' field and keep rest
        const { id: _, ...roleWithoutId } = role;

        // Map permissions to remove their 'id' fields as well
        const permissions = role.permissions?.map(({ id, ...perm }) => perm) ?? [];

        // Return role without 'id' and permissions without their 'id's
        return { ...roleWithoutId, permissions };
    }
    // ============================= END: Find One Role by ID Method =============================


    // ============================= START: Update Role Method =============================
    /**
     * Update role details and its permissions associations
     * @param id Role ID to update
     * @param dto Data transfer object containing new name and permissions array
     */
    async update(id: number, dto: UpdateRoleDto) {
        // Destructure name and permissions from DTO
        const { name, permissions } = dto;

        // Update role record by ID
        return this.prisma.role.update({
            where: { id },
            data: {
                name, // Update role name
                permissions: permissions
                    ? {
                        set: [], // Clear all existing permission relations first
                        connect: permissions.map((id) => ({ id })), // Connect new permissions
                    }
                    : undefined, // If no permissions provided, do not update
            },
        });
    }
    // ============================= END: Update Role Method =============================


    // ============================= START: Remove Role Method =============================
    /**
     * Delete role by ID
     * @param id Role ID to delete
     */
    async remove(id: number) {
        // Delete role record from database
        return this.prisma.role.delete({
            where: { id },
        });
    }
    // ============================= END: Remove Role Method =============================
}
// ============================= END: RolesService =============================
