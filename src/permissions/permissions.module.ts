// src/permissions/permissions.module.ts
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PermissionsService } from './permissions.service';
import { PermissionsController } from './permissions.controller';
import { PermissionsGuard } from 'src/auth/guards/permissions.guard';
import { Reflector } from '@nestjs/core';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthModule } from 'src/auth/auth.module';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    JwtModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [PermissionsController],
  providers: [PermissionsService, PrismaService, PermissionsGuard, Reflector],
  exports: [PermissionsService],
})
export class PermissionsModule { }
