// ================= START: Import necessary modules and decorators =================
// Import the PartialType utility from @nestjs/swagger
// - `PartialType` is used to create a new DTO class by making all properties of an existing DTO optional.
// Import the CreateLogisticsProviderDto, which contains all the required fields for creating a logistics provider.
// - We will use this as a base for the update DTO, where all fields become optional.
import { PartialType } from '@nestjs/swagger';
import { CreateLogisticsProviderDto } from './create-logistics-provider.dto';
// ================= END: Import necessary modules and decorators =================



// ================= START: Define UpdateLogisticsProviderDto class =================
// The UpdateLogisticsProviderDto class extends PartialType(CreateLogisticsProviderDto)
// - This means it inherits all properties from CreateLogisticsProviderDto
// - However, each property becomes optional, which is useful for update operations.
//   Example: In an update request, you might only want to change the phone number or address,
//   so you don't need to pass all fields.
export class UpdateLogisticsProviderDto extends PartialType(CreateLogisticsProviderDto) { }
// ================= END: Define UpdateLogisticsProviderDto class =================
