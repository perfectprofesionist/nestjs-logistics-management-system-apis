// ============================= START: PrismaService =============================
import { Injectable, OnModuleInit, INestApplication } from '@nestjs/common';
// Import PrismaClient from Prisma ORM client package
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
    // ============================= START: Lifecycle Hook =============================
    // Called once the module has been initialized by NestJS
    async onModuleInit() {
        // Establish connection to the database when module initializes
        await this.$connect();
    }
    // ============================= END: Lifecycle Hook =============================


    // ============================= START: Enable Shutdown Hooks =============================
    // Method to listen for Prisma client's 'beforeExit' event and gracefully shut down Nest app
    async enableShutdownHooks(app: INestApplication) {
        // Cast 'this' to any to avoid TypeScript errors on $on event binding
        (this as any).$on('beforeExit', async () => {
            // Close the NestJS application when Prisma client is about to exit
            await app.close();
        });
    }
    // ============================= END: Enable Shutdown Hooks =============================
}
// ============================= END: PrismaService =============================
