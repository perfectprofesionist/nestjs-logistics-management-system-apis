import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { RolesModule } from './roles/roles.module';
import { PermissionsModule } from './permissions/permissions.module';
import { OrganizationsModule } from './organizations/organizations.module';
import { WarehousesModule } from './warehouses/warehouses.module';
import { LogisticsProviderModule } from './logistics_provider/logistics_provider.module';
import { OrdersModule } from './orders/orders.module';
import { StoresModule } from './stores/stores.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    AuthModule,
    UserModule,
    RolesModule,
    PermissionsModule,
    OrganizationsModule,
    WarehousesModule,
    LogisticsProviderModule,
    OrdersModule,
    StoresModule,
  ],
})
export class AppModule { }
