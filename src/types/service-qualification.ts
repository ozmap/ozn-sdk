import { z } from 'zod';

import { externalSystemsSchema, ResourceSpecificationSchema } from './shared';
import { geographicAddressOutputSchema } from './geographic-address';

export const serviceQualificationByIdInputSchema = z.object({
    serviceQualificationItem: z
        .array(
            z.object({
                service: z.object({
                    place: externalSystemsSchema,
                }),
            }),
        )
        .nonempty(),
});

const GeographicLocationSchema = z.object({
    name: z.string(),
    type: z.string(),
    geometry: z.array(
        z.object({
            x: z.number(),
            y: z.number(),
            z: z.number().or(z.null()),
        }),
    ),
});

export const ServiceQualificationAddressSchema = z.object({
    type: z.string(),
    geographicLocation: GeographicLocationSchema,
});

const ResourceLocationSchema = z.object({
    type: z.string(),
    labelType: z.string(),
    name: z.string(),
    description: z.string().or(z.null()),
    parentLocation: z.string(),
    address: ServiceQualificationAddressSchema.or(geographicAddressOutputSchema),
});

export const EligibilityUnavailabilityReasonSchema = z.object({
    code: z.string().or(z.null()).nullable(),
    label: z.string().or(z.null()).nullable(),
});

const CharacteristicSchema = z.object({
    name: z.string(),
    valueType: z.string(),
    value: z.string(),
});

export const RelatedEntitySchema = z.object({
    '@type': z.string(),
    qualificationResult: z.string(),
    characteristic: z.array(CharacteristicSchema),
    resourceSpecification: ResourceSpecificationSchema,
    resourceLocation: ResourceLocationSchema,
    eligibilityUnavailabilityReason: z.array(EligibilityUnavailabilityReasonSchema),
});

const ServiceSchema = z.object({
    serviceCharacteristic: z.array(CharacteristicSchema),
    relatedEntity: z.array(RelatedEntitySchema),
});

const ServiceQualificationItemSchema = z.object({
    qualificationResult: z.string(),
    service: ServiceSchema,
    eligibilityUnavailabilityReason: z.array(EligibilityUnavailabilityReasonSchema),
});

export const serviceQualificationOutputSchema = z.object({
    provideUnavailabilityReason: z.boolean(),
    serviceQualificationItem: z.array(ServiceQualificationItemSchema),
});

export type ServiceQualificationByIdInput = z.infer<typeof serviceQualificationByIdInputSchema>;
export type ServiceQualificationOutput = z.infer<typeof serviceQualificationOutputSchema>;
