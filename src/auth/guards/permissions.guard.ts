// ============================== START: Imports ==============================
// CanActivate: Interface that custom guards must implement
// ExecutionContext: Provides details about the current request pipeline
// Injectable: Marks the class as injectable in NestJS's dependency injection system
// ForbiddenException: Exception thrown when user does not have the required permissions
import { CanActivate, ExecutionContext, Injectable, ForbiddenException } from '@nestjs/common';

// Reflector: Allows accessing metadata set by decorators (e.g., custom @Permissions decorator)
import { Reflector } from '@nestjs/core';

// JwtService: Provides methods to work with JWTs (decode, verify, sign)
import { JwtService } from '@nestjs/jwt';
// =============================== END: Imports ===============================



// ============================== START: PermissionsGuard Class ==============================
// A guard that checks whether the currently authenticated user has all the
// required permissions before allowing access to a route.
@Injectable()
export class PermissionsGuard implements CanActivate {

    // ------------------------- START: Constructor -------------------------
    // Injects Reflector (to read metadata) and JwtService (optional for decoding tokens)
    constructor(
        private reflector: Reflector,
        private jwtService: JwtService
    ) { }
    // -------------------------- END: Constructor --------------------------



    // ========================== START: canActivate Method ==========================
    /**
     * Determines whether the current request can proceed based on permissions.
     * @param context - Provides details about the execution context (e.g., HTTP request)
     * @returns boolean - true if access is granted, throws ForbiddenException otherwise
     */
    canActivate(context: ExecutionContext): boolean {

        // ---------- START: Get Required Permissions ----------
        // Retrieves the permissions metadata set on the route handler (e.g., @Permissions decorator)
        const requiredPermissions = this.reflector.get<string[]>(
            'permissions',
            context.getHandler(),
        );
        console.log('Required Permissions:', requiredPermissions); // Debug log

        // If no permissions are required, allow the request
        if (!requiredPermissions || requiredPermissions.length === 0) {
            return true;
        }
        // ----------- END: Get Required Permissions -----------



        // ---------- START: Extract User from Request ----------
        const request = context.switchToHttp().getRequest();
        const user = request.user; // Set by a previous authentication guard (e.g., JwtAuthGuard)
        console.log('User from request:', user);                // Debug log full user object
        console.log('User Permissions:', user?.permissions);    // Debug log just permissions array

        if (!user || !Array.isArray(user.permissions)) {
            throw new ForbiddenException('User permissions not found.');
        }
        // ----------- END: Extract User from Request -----------



        // ---------- START: Check User Permissions ----------
        // Verify that the user has ALL the required permissions
        const hasPermission = requiredPermissions.every((permission) =>
            user.permissions.includes(permission),
        );

        if (!hasPermission) {
            throw new ForbiddenException('Insufficient permissions.');
        }
        // ----------- END: Check User Permissions -----------


        return true; // Access granted
    }
    // =========================== END: canActivate Method ===========================

}
// =============================== END: PermissionsGuard Class ===============================
