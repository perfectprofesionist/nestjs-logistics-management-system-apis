// ===============================
// Import required dependencies
// ===============================
import { Injectable } from '@nestjs/common'; // Allows marking class as injectable for dependency injection
import { PassportStrategy } from '@nestjs/passport'; // Base class for passport strategy integration
import { ExtractJwt, Strategy } from 'passport-jwt'; // JWT extraction & validation strategy
import { ConfigService } from '@nestjs/config'; // Service to access environment variables

// ===============================
// JWT Strategy Class Declaration
// ===============================
@Injectable() // Marks this class as injectable in NestJS DI system
export class JwtStrategy extends PassportStrategy(Strategy) {

  // ===============================
  // Constructor: Configures JWT strategy
  // ===============================
  constructor(private configService: ConfigService) {
    super({
      // Extract JWT token from Authorization header in "Bearer <token>" format
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // Retrieve JWT secret key from environment variables (or config)
      secretOrKey: configService.get<string>('JWT_SECRET'), // Or use hardcoded string for testing
    });
  }
  // ======== End of Constructor ========


  // ===============================
  // Validate method: Runs after token is verified
  // ===============================
  async validate(payload: any) {
    // This returns the decoded payload data to be attached to the request object
    // 'sub' is the user ID, extracted from JWT payload
    return { userId: payload.sub, email: payload.email, role: payload.role };
  }
  // ======== End of validate method ========

}
// ======== End of JwtStrategy Class ========
