// ============================== START: Imports ==============================
// NestJS decorators & utilities for controller, request handling, and validation
import { Controller, Post, Body, Res, UnauthorizedException, Query, ValidationPipe, UsePipes } from '@nestjs/common';

// Response type from Express for working directly with HTTP responses (e.g., setting cookies)
import { Response } from 'express';

// Service containing authentication logic (register, login, validate user)
import { AuthService } from './auth.service';

// DTOs for validating incoming data for login and registration
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

// Swagger decorators for API documentation
import { ApiBody, ApiQuery, ApiTags } from '@nestjs/swagger';
// =============================== END: Imports ===============================



// ============================== START: AuthController Class ==============================
// Controller handling authentication-related endpoints
@ApiTags('Auth') // Groups this controller under "Auth" in Swagger UI
@Controller('auth') // Sets base route prefix to /auth
export class AuthController {

    // ------------------------- START: Constructor -------------------------
    // Injects AuthService to handle business logic
    constructor(private authService: AuthService) { }
    // -------------------------- END: Constructor --------------------------



    // ========================== START: Register Endpoint ==========================
    /**
     * Registers a new user.
     * Currently uses @Query() to receive data instead of @Body()
     */
    @Post('register')
    // @ApiBody({ type: RegisterDto }) // Swagger body example (currently commented)
    @UsePipes(new ValidationPipe({ transform: true })) // Automatically validates & transforms incoming data
    register(
        @Query() query: RegisterDto, // Registration data from query params
        @Res({ passthrough: true }) res: Response // Allows modifying response without ending request
    ) {
        return this.authService.register(query);
    }
    // =========================== END: Register Endpoint ===========================



    // ========================== START: Login Endpoint ==========================
    /**
     * Authenticates a user and returns a JWT token.
     * Stores the token in an HTTP-only cookie for secure authentication.
     */
    @Post('login')
    @UsePipes(new ValidationPipe({ transform: true }))
    async login(
        @Body() query: LoginDto, // Login data from query params
        @Res({ passthrough: true }) res: Response
    ) {
        // ---------------- START: Validate Inputs ----------------
        const { email, password } = query;

        if (!email || !password) {
            throw new UnauthorizedException('Email and password are required');
        }
        // ----------------- END: Validate Inputs -----------------


        // ---------------- START: Validate User Credentials ----------------
        const user = await this.authService.validateUser(email, password);
        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }
        // ----------------- END: Validate User Credentials -----------------


        // ---------------- START: Generate Access Token ----------------
        const { access_token } = await this.authService.login(user);
        // ----------------- END: Generate Access Token -----------------


        // ---------------- START: Determine SameSite Policy ----------------
        const sameSite = ((): boolean | 'lax' | 'strict' | 'none' => {
            const value = process.env.COOKIE_SAME_SITE?.toLowerCase();
            return value === 'lax' || value === 'strict' || value === 'none'
                ? value
                : 'lax';
        })();
        // ----------------- END: Determine SameSite Policy -----------------


        // ---------------- START: Set Authentication Cookie ----------------
        res.cookie(process.env.COOKIE_NAME || 'access_token', access_token, {
            httpOnly: process.env.COOKIE_HTTP_ONLY === 'true', // Prevents JS access to cookie
            secure: process.env.COOKIE_SECURE === 'true',      // Use HTTPS only if true
            sameSite,                                          // CSRF protection
            maxAge: 1000 * 60 * 60 * 24, // 1 day
        });
        // ----------------- END: Set Authentication Cookie -----------------


        // ---------------- START: Return Response ----------------
        return {
            message: 'Login successful',
            auth_token: access_token,
            user,
        };
        // ----------------- END: Return Response -----------------
    }
    // =========================== END: Login Endpoint ===========================



    // ========================== START: Logout Endpoint ==========================
    /**
     * Logs out the user by clearing the authentication cookie.
     */
    @Post('logout')
    logout(@Res({ passthrough: true }) res: Response) {
        res.clearCookie('access_token');
        return { message: 'Logout successful' };
    }
    // =========================== END: Logout Endpoint ===========================

}
// =============================== END: AuthController Class ===============================
