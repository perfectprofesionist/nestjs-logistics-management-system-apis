import { Module } from '@nestjs/common';
import { LogisticsProviderController } from './logistics_provider.controller';
import { LogisticsProviderService } from './logistics_provider.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [PrismaModule, AuthModule],
  controllers: [LogisticsProviderController],
  providers: [LogisticsProviderService]
})
export class LogisticsProviderModule { }
