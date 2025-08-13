// Import SetMetadata function from NestJS common package
import { SetMetadata } from '@nestjs/common';

// Define a constant key string to store roles metadata
export const ROLES_KEY = 'roles';

// Create a decorator factory function that accepts multiple roles as arguments
// This function uses SetMetadata to attach the roles array to the metadata of the route handler
export const HasRoles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);
