import { z } from 'zod';
import { geographicAddressOutputSchema } from './geographic-address';

const ResourceLocationSchema = z.object({
    type: z.string(),
    labelType: z.string(),
    name: z.string(),
    description: z.nullable(z.string()),
    parentLocation: z.nullable(z.any()), // Assuming it can be null or a reference to another location
    address: geographicAddressOutputSchema,
});

const CharacteristicSchema = z.object({
    id: z.nullable(z.string()),
    name: z.string(),
    valueType: z.string(),
    value: z.string(),
});

const ResourceSchema = z.object({
    id: z.string(),
    name: z.string(),
    entityType: z.string(),
    characteristic: z.array(CharacteristicSchema).nullable(),
    resourceLocation: z.nullable(ResourceLocationSchema),
});

const SupportingResourceSchema = z.object({
    id: z.string(),
    entityType: z.string(),
    name: z.nullable(z.string()),
    role: z.nullable(z.string()),
    resource: z.array(ResourceSchema).nullable(),
    characteristic: z.array(CharacteristicSchema).nullable(),
    supportingResource: z.nullable(z.any()), // Recursive, will define later
});

// Update SupportingResourceSchema to handle recursion
SupportingResourceSchema.partial().extend({
    supportingResource: z.nullable(z.array(SupportingResourceSchema)),
});

const RelatedPartyPropertySchema = z.object({
    name: z.string(),
    value: z.string(),
});

const RelatedPartySchema = z.object({
    role: z.string(),
    property: z.array(RelatedPartyPropertySchema),
});

const PlaceSchema = z.object({
    id: z.string(),
    type: z.string(),
});

const ServiceSchema = z.object({
    id: z.string(),
    description: z.string(),
    isServiceEnabled: z.boolean(),
    name: z.string(),
    serviceType: z.string(),
    relatedParty: z.array(RelatedPartySchema),
    place: z.array(PlaceSchema),
    state: z.string(),
    supportingResource: z.array(SupportingResourceSchema),
});

export const ServiceInventoryOutputSchema = z.array(ServiceSchema);
export type ServiceInventoryOutput = z.infer<typeof ServiceInventoryOutputSchema>;
