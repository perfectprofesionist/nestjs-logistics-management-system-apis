// ============================== START: Imports ==============================
// Injectable: Marks the service as available for dependency injection in NestJS
// UnauthorizedException: Exception thrown when authentication fails
import { Injectable, UnauthorizedException } from '@nestjs/common';

// JwtService: Provides methods for signing and verifying JWT tokens
import { JwtService } from '@nestjs/jwt';

// bcrypt: Library used for hashing and comparing passwords securely
import * as bcrypt from 'bcrypt';

// UserService: Custom service to interact with the users database table/collection
import { UserService } from '../user/user.service';
// =============================== END: Imports ===============================


// Service handling authentication logic: registering users, validating credentials,
// generating JWT tokens, and related operations.
@Injectable()
export class AuthService {
    // ============================== START: AuthService Constructor ==============================
    // The constructor is responsible for injecting the dependencies required by the AuthService.
    // In NestJS, dependencies are automatically provided by the Dependency Injection (DI) system.

    // `usersService` - Instance of UserService, used to fetch and manage user data from the database.
    // `jwtService`   - Instance of JwtService, used to sign and verify JWT tokens for authentication.
    constructor(
        private readonly usersService: UserService, // Injects UserService for user-related operations
        private readonly jwtService: JwtService,    // Injects JwtService for handling JWT creation & validation
    ) { }
    // ============================== END: AuthService Constructor ==============================


    // ===================== START: Validate user credentials =====================
    /**
     * This method verifies whether the provided email and password match an existing user.
     * 
     * Steps:
     *  1. Fetch the user from the database by email (role data is already included from service).
     *  2. Compare the provided password with the stored hashed password using bcrypt.
     *  3. If credentials are valid:
     *     - Exclude the password and role object from the returned user.
     *     - Flatten the role object into a simple string (role name).
     *  4. If credentials are invalid, return null.
     *
     * @param email - The user's email address.
     * @param password - The user's raw password (to be compared with hashed password in DB).
     * @returns The user object without password (and with role as string) if valid, otherwise null.
     */
    async validateUser(email: string, password: string): Promise<any> {
        // Fetch the user from the database using email
        const user = await this.usersService.findByEmail(email); // Role is already included in query

        // Check if user exists AND password matches hashed password in DB
        if (user && await bcrypt.compare(password, user.password)) {
            // Exclude password and role object from returned data
            const { password, role, ...rest } = user;

            // Return the remaining user data with a simple string role
            return {
                ...rest,
                role: role?.name || null, // Flatten role object to role name
            };
        }

        // If user not found or password doesn't match, return null
        return null;
    }
    // ===================== END: Validate user credentials =====================


    // -------------------- START: Generate JWT token --------------------
    async login(user: any) {
        // Prepare payload for the JWT, containing user's email, id (as 'sub'), and role
        const payload = {
            email: user.email,
            sub: user.id,
            role: user.role,
        };

        // Sign the payload to generate a JWT access token
        const token = this.jwtService.sign(payload);

        // Return the token along with the user data
        return {
            access_token: token,
            user,
        };
    }
    // -------------------- END: Generate JWT token --------------------

    // ===================== REGISTER A NEW USER ===================== //
    async register(data: {
        email: string;
        password: string;
        name: string;
        roleId?: number;          // Optional role ID for assigning a role to the user
        organizationId?: number;  // Optional organization ID for linking the user
    }) {
        // ---------- STEP 1: Hash the password before saving ----------
        // Using bcrypt to hash the password with a salt round of 10
        const hash = await bcrypt.hash(data.password, 10);
        // ---------- END STEP 1 ----------

        // ---------- STEP 2: Prepare the data object for user creation ----------
        // This object contains the user's essential data including the hashed password
        const createData: any = {
            email: data.email,
            password: hash,
            name: data.name,
        };
        console.log('createData', createData);
        // ---------- END STEP 2 ----------

        // ---------- STEP 3: Include optional roleId if provided ----------
        if (data.roleId !== undefined) createData.roleId = data.roleId;
        // ---------- END STEP 3 ----------

        // ---------- STEP 4: Include optional organizationId if provided ----------
        if (data.organizationId !== undefined) createData.organizationId = data.organizationId;
        // ---------- END STEP 4 ----------

        // ---------- STEP 5: Call the UserService to create the new user ----------
        return this.usersService.create(createData);
        // ---------- END STEP 5 ----------
    }
    // ===================== END REGISTER FUNCTION ===================== //


}
