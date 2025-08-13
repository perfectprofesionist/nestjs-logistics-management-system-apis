import { IsString, IsEmail, IsUrl, IsObject, IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateLogisticsProviderDto {
    /* --- START: Organization ID ---
       Purpose: Represents the ID of the organization this logistics provider is linked to.
       Validation:
         - @IsInt(): Ensures the value is an integer.
       Swagger:
         - @ApiProperty(): Marks this property as part of the API documentation.
       Example: 101
       --- END: Organization ID --- */
    @ApiProperty()
    @IsInt()
    organizationId: number;

    /* --- START: Name ---
       Purpose: The name of the logistics provider (e.g., "FastTrack Logistics").
       Validation:
         - @IsString(): Ensures the value is a string.
       Swagger:
         - @ApiProperty(): Includes it in the generated Swagger docs.
       Example: "Speedy Transport Co."
       --- END: Name --- */
    @ApiProperty()
    @IsString()
    name: string;

    /* --- START: Address ---
       Purpose: Physical address of the logistics provider.
       Validation:
         - @IsString(): Ensures it's a valid string.
       Example: "123 Main Street, Springfield"
       --- END: Address --- */
    @ApiProperty()
    @IsString()
    address: string;

    /* --- START: Phone ---
       Purpose: Contact phone number for the logistics provider.
       Validation:
         - @IsString(): Ensures it's a string (no strict phone format validation here).
       Example: "+1-202-555-0147"
       --- END: Phone --- */
    @ApiProperty()
    @IsString()
    phone: string;

    /* --- START: Email ---
       Purpose: Email address for official contact.
       Validation:
         - @IsEmail(): Ensures the value follows proper email format.
       Example: "contact@fasttracklogistics.com"
       --- END: Email --- */
    @ApiProperty()
    @IsEmail()
    email: string;

    /* --- START: Website ---
       Purpose: Official website URL of the logistics provider.
       Validation:
         - @IsUrl(): Ensures the value is a valid URL.
       Example: "https://www.fasttracklogistics.com"
       --- END: Website --- */
    @ApiProperty()
    @IsUrl()
    website: string;

    /* --- START: Cost Per Kilometer ---
       Purpose: Base cost charged per kilometer for deliveries.
       Validation:
         - @IsInt(): Ensures it's an integer value.
       Example: 5
       --- END: Cost Per Kilometer --- */
    @ApiProperty()
    @IsInt()
    cost_per_km: number;

    /* --- START: Cost Per Mile ---
       Purpose: Base cost charged per mile for deliveries.
       Validation:
         - @IsInt(): Ensures it's an integer value.
       Example: 8
       --- END: Cost Per Mile --- */
    @ApiProperty()
    @IsInt()
    cost_per_mile: number;

    /* --- START: Social Links ---
       Purpose: Stores provider's social media links (Facebook, Instagram, LinkedIn, etc.)
       Validation:
         - @IsObject(): Ensures the value is an object (key-value pairs).
       Example:
         {
           facebook: "https://facebook.com/fasttrack",
           linkedin: "https://linkedin.com/company/fasttrack"
         }
       --- END: Social Links --- */
    @ApiProperty()
    @IsObject()
    socialLinks: Record<string, any>;
}
