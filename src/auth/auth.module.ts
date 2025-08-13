// auth.module.ts
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { JwtStrategy } from './jwt.strategy';
import { PermissionsGuard } from './guards/permissions.guard';
import { RolesGuard } from './guards/roles.guard';

@Module({
  imports: [
    PassportModule,
    UserModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'defaultsecret',
      signOptions: { expiresIn: '1d' },
    }),
  ],
  providers: [AuthService, JwtStrategy, PermissionsGuard, RolesGuard],
  controllers: [AuthController],
  exports: [JwtModule, AuthService, PassportModule, PermissionsGuard, RolesGuard],
})
export class AuthModule { }
