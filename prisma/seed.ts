// =======================
// SEEDER START
// =======================

// Import necessary enums and classes from Prisma Client
import { OrderStatus, OrgType, PrismaClient } from '@prisma/client';
// Import bcrypt for password hashing
import * as bcrypt from 'bcrypt';

// Create a new PrismaClient instance for database operations
const prisma = new PrismaClient();

// Define a mapping of roles to their associated permissions
const rolesWithPermissions: Record<string, string[]> = {
    // Customer Admin role and its permissions
    "Customer Admin": [
        "add_product", "edit_product", "remove_product",
        "add_store", "edit_store", "remove_store",
        "add_store_staff", "edit_store_staff", "remove_store_staff",
        "associate_product_with_store", "associate_staff_with_store",
        "manage_orders", "track_orders"
    ],
    // Warehouse Admin role and its permissions
    "Warehouse Admin": [
        "add_box_size", "edit_box_size", "remove_box_size",
        "manage_inventory", "oversee_operations",
        "coordinate_with_logistics", "manage_warehouse_staff",
        "manage_warehouse_orders", "track_warehouse_orders",
        "get_logistics_quotes"
    ],
    // Logistics Admin role and its permissions
    "Logistics Admin": [
        "add_vehicle", "edit_vehicle", "remove_vehicle",
        "assign_vehicle", "track_vehicle_maintenance",
        "oversee_vehicle_inspections", "manage_vehicle_documents",
        "manage_logistics_staff", "manage_logistics_orders",
        "track_logistics_orders", "provide_logistics_quotes",
        "manage_customer_support", "manage_package_handling",
        "manage_delivery", "manage_pickup", "manage_tracking"
    ],
    // Super Admin role and its permissions
    "Super Admin": [
        "manage_organizations", "add_organization", "edit_organization",
        "remove_organization", "manage_users", "manage_roles",
        "configure_system_settings", "oversee_security",
        "view_reports", "export_reports", "manage_integrations",
        "audit_logs"
    ],
    // Sub Admin role and its permissions
    "Sub Admin": [
        "assist_super_admin", "manage_assigned_modules",
        "view_assigned_reports", "handle_escalated_support"
    ],
    // Staff role and its permissions
    "Staff": [
        "perform_operational_tasks", "assist_order_processing",
        "assist_order_tracking", "communicate_with_customers",
        "update_order_status", "update_inventory_status"
    ],
    // Technical Support role and its permissions
    "Technical Support": [
        "provide_technical_assistance", "troubleshoot_issues",
        "escalate_issues", "document_solutions"
    ],
    // Warehouse Manager role and its permissions
    "Warehouse Manager": [
        "oversee_warehouse_operations", "manage_inventory_levels",
        "coordinate_with_teams", "generate_performance_reports"
    ],
    // Warehouse Coordinator role and its permissions
    "Warehouse Coordinator": [
        "schedule_warehouse_activities", "assign_tasks",
        "monitor_order_fulfillment", "ensure_compliance"
    ],
    // Warehouse Customer Support role and its permissions
    "Warehouse Customer Support": [
        "handle_customer_inquiries", "provide_order_updates",
        "resolve_customer_issues", "coordinate_with_teams"
    ],
    // Warehouse Package Handler role and its permissions
    "Warehouse Package Handler": [
        "receive_products", "pack_products", "label_products",
        "load_shipments", "unload_shipments", "update_package_status",
        "ensure_safe_handling"
    ],
    // Customer Store Admin role and its permissions
    "Customer Store Admin": [
        "manage_store_settings", "manage_store_staff",
        "oversee_product_listings", "manage_store_inventory",
        "process_store_orders", "track_store_orders",
        "handle_store_customer_support"
    ],
    // Customer Store Employee role and its permissions
    "Customer Store Employee": [
        "assist_store_operations", "process_orders", "process_returns",
        "update_product_info", "update_inventory_info",
        "provide_customer_service"
    ],
    // Customer Store Manager role and its permissions
    "Customer Store Manager": [
        "supervise_store_employees", "supervise_store_operations",
        "manage_store_inventory", "manage_product_displays",
        "handle_escalated_issues", "generate_store_reports"
    ],
    // Logistics Manager role and its permissions
    "Logistics Manager": [
        "oversee_logistics_operations", "oversee_logistics_staff",
        "plan_delivery_routes", "optimize_delivery_routes",
        "monitor_performance", "resolve_logistics_issues"
    ],
    // Logistics Driver role and its permissions
    "Logistics Driver": [
        "view_assigned_tasks", "update_delivery_status",
        "update_pickup_status", "communicate_with_coordinators",
        "report_vehicle_issues"
    ],
    // Logistics Coordinator role and its permissions
    "Logistics Coordinator": [
        "assign_deliveries", "schedule_deliveries",
        "communicate_with_drivers", "communicate_with_customers",
        "monitor_operations", "handle_exceptions"
    ],
    // Logistics Customer Support role and its permissions
    "Logistics Customer Support": [
        "assist_logistics_customers", "provide_tracking_updates",
        "resolve_customer_complaints", "coordinate_with_teams"
    ],
    // Logistics Package Handler role and its permissions
    "Logistics Package Handler": [
        "load_vehicles", "unload_vehicles", "scan_packages",
        "update_package_status", "handle_packages", "assist_drivers"
    ]
};

// Define the main async function for seeding the database
async function main() {
    // Get all unique permissions from the rolesWithPermissions object
    const allPermissions = Array.from(new Set(Object.values(rolesWithPermissions).flat()));

    // Create all permissions in the database, skipping duplicates
    await prisma.permission.createMany({
        data: allPermissions.map((name) => ({ name })),
        skipDuplicates: true,
    });

    // For each role, upsert the role and connect its permissions
    for (const [roleName, permissionNames] of Object.entries(rolesWithPermissions)) {
        await prisma.role.upsert({
            where: { name: roleName },
            update: {},
            create: {
                name: roleName,
                permissions: {
                    connect: permissionNames.map((name) => ({ name })),
                },
            },
        });
    }

    // Try to find the organization named 'Admin Org'
    let organization = await prisma.organization.findFirst({
        where: { name: 'Admin Org' },
    });

    // If 'Admin Org' does not exist, create it
    if (!organization) {
        organization = await prisma.organization.create({
            data: {
                name: 'Admin Org',
                email: 'admin-org@example.com',
                phone: '1234567890',
                address: '123 Main St',
                type: 'customer',
            },
        });
    }

    // Upsert the 'Admin Org' organization and assign to adminOrg
    const adminOrg = await prisma.organization.upsert({
        where: { email: 'admin-org@example.com' },
        update: {},
        create: {
            name: 'Admin Org',
            email: 'admin-org@example.com',
            phone: '1234567890',
            address: '123 Main St',
            type: OrgType.customer,
        },
    });

    // Upsert the 'Customer Org' organization and assign to orgCustomer
    const orgCustomer = await prisma.organization.upsert({
        where: { email: 'customer-org@example.com' },
        update: {},
        create: {
            name: 'Customer Org',
            email: 'customer-org@example.com',
            phone: '1112223333',
            address: '100 Customer St',
            type: OrgType.customer,
        },
    });

    // Upsert the 'Warehouse Org' organization and assign to orgWarehouse
    const orgWarehouse = await prisma.organization.upsert({
        where: { email: 'warehouse-org@example.com' },
        update: {},
        create: {
            name: 'Warehouse Org',
            email: 'warehouse-org@example.com',
            phone: '4445556666',
            address: '200 Warehouse Ave',
            type: OrgType.warehouse,
        },
    });

    // Upsert the 'Logistics Org' organization and assign to orgLogistics
    const orgLogistics = await prisma.organization.upsert({
        where: { email: 'logistics-org@example.com' },
        update: {},
        create: {
            name: 'Logistics Org',
            email: 'logistics-org@example.com',
            phone: '7778889999',
            address: '300 Logistics Blvd',
            type: OrgType.logistics,
        },
    });

    // Hash the password 'admin123' for use with seeded users
    const hashedPassword = await bcrypt.hash('admin123', 10);

    // Find the 'Super Admin' role in the database
    const superAdminRole = await prisma.role.findUnique({
        where: { name: 'Super Admin' },
    });
    // Find the 'Customer Admin' role in the database
    const customerAdminRole = await prisma.role.findUnique({
        where: { name: 'Customer Admin' },
    });

    // If 'Super Admin' role is not found, throw an error
    if (!superAdminRole) {
        throw new Error('Super Admin role not found. Please seed roles before running this.');
    }
    // If 'Customer Admin' role is not found, throw an error
    if (!customerAdminRole) throw new Error('Customer Admin role missing!');

    // Upsert the 'Super Admin' user and assign to superAdminUser
    const superAdminUser = await prisma.user.upsert({
        where: { email: 'admin@example.com' },
        update: {},
        create: {
            name: 'Super Admin',
            email: 'admin@example.com',
            password: hashedPassword,
            organizationId: adminOrg.id,
            roleId: superAdminRole.id,
        },
    });

    // Upsert the 'Customer Admin' user and assign to customerUser
    const customerUser = await prisma.user.upsert({
        where: { email: 'customer@example.com' },
        update: {},
        create: {
            name: 'Customer Admin',
            email: 'customer@example.com',
            password: hashedPassword,
            organizationId: orgCustomer.id,
            roleId: customerAdminRole.id,
        },
    });

    // Upsert the 'Main Warehouse' warehouse and assign to warehouse
    const warehouse = await prisma.warehouse.upsert({
        where: { name: 'Main Warehouse' },
        update: {},
        create: {
            organizationId: orgWarehouse.id,
            name: 'Main Warehouse',
            address: '500 Warehouse St',
            latitude: 34.1,
            longitude: -118.25,
        },
    });

    // Try to find the logistics provider with the given email
    let logisticsProvider = await prisma.logisticsProvider.findFirst({
        where: { email: 'contact@fastship.com' },
    });

    // If logistics provider does not exist, create it
    if (!logisticsProvider) {
        logisticsProvider = await prisma.logisticsProvider.create({
            data: {
                organizationId: orgLogistics.id,
                name: 'FastShip Logistics',
                address: '600 Logistics Pkwy',
                phone: '1231231234',
                email: 'contact@fastship.com',
                website: 'https://fastship.com',
                cost_per_km: 80,
                cost_per_mile: 1.5,
                socialLinks: { twitter: '@fastship' },
            },
        });
    }

    // Try to find the store named 'Main Street Store'
    let store = await prisma.store.findFirst({
        where: { name: 'Main Street Store' },
    });

    // If store does not exist, create it
    if (!store) {
        store = await prisma.store.create({
            data: {
                organizationId: orgCustomer.id,
                name: 'Main Street Store',
                address: '700 Main St',
                latitude: 34.0522,
                longitude: -118.2437,
            },
        });
    }

    // Create a sample order using the seeded users, store, warehouse, and logistics provider
    await prisma.order.create({
        data: {
            customerId: customerUser.id,
            storeId: store.id,
            deliveryAddress: '800 Delivery Rd',
            deliveryLatitude: 34.05,
            deliveryLongitude: -118.24,
            pickupAddress: '700 Main St',
            pickupLatitude: 34.0522,
            pickupLongitude: -118.2437,
            totalDistanceKm: 10.5,
            totalDistanceMiles: 6.5,
            status: OrderStatus.pending,
            pickupDate: new Date(),
            pickupTime: new Date(),
            deliveryDate: new Date(),
            deliveryTime: new Date(),
            logisticsProviderId: logisticsProvider.id,
            warehouseId: warehouse.id,
        },
    });

    // Log a message indicating seeding completed successfully
    console.log('Seeding completed successfully!');
}

// Call the main function and handle errors and disconnect
main()
    // Catch any errors thrown in main and log them, then exit with error code
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    // Always disconnect Prisma client at the end
    .finally(async () => {
        await prisma.$disconnect();
    });

// =====================
// SEEDER END
// =====================
