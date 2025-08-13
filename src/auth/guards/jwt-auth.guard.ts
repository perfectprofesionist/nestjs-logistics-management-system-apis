// ============================== START: Imports ==============================
// Injectable decorator allows this guard to be injected into other classes (e.g., controllers)
import { Injectable } from '@nestjs/common';

// AuthGuard from @nestjs/passport is used to implement authentication strategies
import { AuthGuard } from '@nestjs/passport';
// =============================== END: Imports ===============================



// ============================== START: JwtAuthGuard Class ==============================
// This guard uses the 'jwt' strategy to authenticate incoming requests.
// The 'jwt' strategy is typically defined in a separate file and configured in the Auth module.
@Injectable() // Marks the class as injectable by NestJS's dependency injection system
export class JwtAuthGuard extends AuthGuard('jwt') {
    // No additional logic is added here, it simply extends AuthGuard
    // and specifies that the 'jwt' strategy should be used.
}
// =============================== END: JwtAuthGuard Class ===============================
