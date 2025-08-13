// ============================== START: Imports ==============================
// CanActivate: Interface that custom guards must implement
// ExecutionContext: Provides access to details about the current request pipeline
// ForbiddenException: Thrown when the user lacks necessary access rights
// Injectable: Marks the guard as injectable in NestJS's DI system
import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';

// Reflector: Used to access metadata defined by custom decorators
import { Reflector } from '@nestjs/core';

// ROLES_KEY: Custom metadata key used by @Roles decorator to store required roles
import { ROLES_KEY } from 'src/roles/roles.decorator';
// =============================== END: Imports ===============================



// ============================== START: RolesGuard Class ==============================
// A guard that checks whether the authenticated user has any of the required roles
@Injectable()
export class RolesGuard implements CanActivate {

    // ------------------------- START: Constructor -------------------------
    // Injects Reflector to read metadata about required roles from route handlers/classes
    constructor(private reflector: Reflector) { }
    // -------------------------- END: Constructor --------------------------



    // ========================== START: canActivate Method ==========================
    /**
     * Determines if the current request is allowed based on user role.
     * @param context - Provides details about the execution context
     * @returns boolean - true if access is granted, throws ForbiddenException otherwise
     */
    canActivate(context: ExecutionContext): boolean {

        // ---------- START: Get Required Roles ----------
        // Retrieve required roles metadata from either the method or the class
        const requiredRoles = this.reflector.getAllAndOverride<string[]>(
            ROLES_KEY,
            [context.getHandler(), context.getClass()],
        );

        // If no roles are required for this route, allow access
        if (!requiredRoles || requiredRoles.length === 0) {
            return true;
        }
        // ----------- END: Get Required Roles -----------



        // ---------- START: Extract User from Request ----------
        const request = context.switchToHttp().getRequest();
        const user = request.user; // This should be populated by a previous authentication step

        if (!user || !user.role) {
            throw new ForbiddenException('User role not found.');
        }
        // ----------- END: Extract User from Request -----------



        // ---------- START: Check User Role ----------
        // Allow access if the user's role matches one of the required roles
        const hasRole = requiredRoles.includes(user.role);

        if (!hasRole) {
            throw new ForbiddenException('Insufficient role.');
        }
        // ----------- END: Check User Role -----------


        return true; // Access granted
    }
    // =========================== END: canActivate Method ===========================

}
// =============================== END: RolesGuard Class ===============================
