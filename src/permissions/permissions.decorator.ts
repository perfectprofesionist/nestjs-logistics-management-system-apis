// ============================= START: Permissions Decorator =============================
// Import SetMetadata function from NestJS common package
import { SetMetadata } from '@nestjs/common';

// Create a custom decorator 'Permissions' that accepts any number of permission strings
export const Permissions = (...permissions: string[]) =>
    // Attach metadata key 'permissions' with the provided permissions array to the route handler
    SetMetadata('permissions', permissions);
// ============================= END: Permissions Decorator =============================
