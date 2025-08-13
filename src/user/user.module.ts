// user.module.ts
import { forwardRef, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UsersController } from './user.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [PrismaModule, forwardRef(() => AuthModule)],
  providers: [UserService],
  controllers: [UsersController],
  exports: [UserService],
})
export class UserModule { }
