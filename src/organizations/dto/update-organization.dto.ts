// ============================= START: UpdateOrganizationDto =============================

import { PartialType } from '@nestjs/mapped-types';
import { CreateOrganizationDto } from './create-organization.dto';

// Extends CreateOrganizationDto to make all fields optional for updates
export class UpdateOrganizationDto extends PartialType(CreateOrganizationDto) { }

// ============================= END: UpdateOrganizationDto =============================
