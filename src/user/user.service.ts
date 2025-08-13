import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';

// ============================= START: UserService =============================

// Marks this class as injectable so it can be injected via NestJS dependency injection system
@Injectable()
export class UserService {
    // ============================= START: Constructor =============================
    // Inject PrismaService to perform database operations
    constructor(private prisma: PrismaService) { }
    // ============================= END: Constructor =============================


    // ============================= START: Create User =============================
    // Asynchronously create a new user with hashed password and optional role and organization associations
    async create(dto: CreateUserDto) {
        // Hash the plain text password securely using bcrypt with 10 salt rounds
        const hashedPassword = await bcrypt.hash(dto.password, 10);

        // Prepare the data object for Prisma's create operation
        const createData: any = {
            // Assign email from DTO to the create data object
            email: dto.email,
            // Assign name from DTO to the create data object
            name: dto.name,
            // Assign hashed password instead of plain password
            password: hashedPassword,
        };

        // Check if the roleId was provided in the DTO
        if (dto.roleId !== undefined) {
            // If yes, add roleId to the create data object
            createData.roleId = dto.roleId;
        }

        // Check if the organizationId was provided in the DTO
        if (dto.organizationId !== undefined) {
            // If yes, add organizationId to the create data object
            createData.organizationId = dto.organizationId;
        }

        // Call Prisma client to create the user record in the database,
        // including eager loading of related role and organization data
        const user = await this.prisma.user.create({
            data: createData,
            include: { role: true, organization: true },
        });

        // Destructure the user object to exclude the password field from the result
        const { password, ...result } = user;
        // Return the sanitized user object without the password
        return result;
    }
    // ============================= END: Create User =============================


    // ============================= START: Find All Users =============================
    // Asynchronously retrieve all users from the database
    async findAll() {
        // Use Prisma to find all users and include their associated roles eagerly
        return this.prisma.user.findMany({
            include: { role: true }, // Load the related role data for each user
        });
    }
    // ============================= END: Find All Users =============================


    // ============================= START: Find One User By ID =============================
    // Retrieve a single user by their unique ID
    async findOne(id: number) {
        // Use Prisma client to find unique user by id including their role relation
        return this.prisma.user.findUnique({
            where: { id }, // Filter by id
            include: { role: true }, // Include role relationship data
        });
    }
    // ============================= END: Find One User By ID =============================


    // ============================= START: Update User =============================
    // Update a user's data by their ID using data from the update DTO
    async update(id: number, dto: UpdateUserDto) {
        // Use Prisma client to update user record by id
        return this.prisma.user.update({
            where: { id }, // Specify the user by id
            data: dto,    // Apply the update data fields
        });
    }
    // ============================= END: Update User =============================


    // ============================= START: Remove User =============================
    // Delete a user record from the database by ID
    async remove(id: number) {
        // Use Prisma client to delete the user where id matches
        return this.prisma.user.delete({
            where: { id },
        });
    }
    // ============================= END: Remove User =============================


    // ============================= START: Find User By Email =============================
    // Find a user by their unique email address
    async findByEmail(email: string) {
        // Query Prisma client to find unique user by email, including related role data
        return this.prisma.user.findUnique({
            where: { email },    // Filter by email
            include: { role: true } // Include role relationship data
        });
    }
    // ============================= END: Find User By Email =============================


    // ============================= START: Assign Role to User =============================
    // Assign a role to a user by updating user's roleId field
    async assignRole(userId: number, roleId: number) {
        // Find the user by their ID to ensure existence
        const user = await this.prisma.user.findUnique({ where: { id: userId } });
        // Throw an error if user does not exist
        if (!user) {
            throw new Error('User not found');
        }

        // Find the role by its ID to ensure it exists
        const role = await this.prisma.role.findUnique({ where: { id: roleId } });
        // Throw an error if role does not exist
        if (!role) {
            throw new Error('Role not found');
        }

        // Update the user's roleId field to associate with the new role
        return this.prisma.user.update({
            where: { id: userId },  // Target user by id
            data: { roleId },       // Set new roleId
        });
    }
    // ============================= END: Assign Role to User =============================
}
// ============================= END: UserService =============================
