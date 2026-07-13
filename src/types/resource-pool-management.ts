import { z } from 'zod';

import { geographicAddressOutputSchema } from './geographic-address';
import { CharacteristicSchema, externalSystemsSchema } from './shared';

const PropertySchema = z.object({
    name: z.string(),
    value: z.string(),
});

const RelatedPartySchema = z.object({
    role: z.string(),
    property: z.array(PropertySchema),
});

const ResourceCapacitySchema = z.object({
    place: externalSystemsSchema,
});

const AppliedCapacityAmountSchema = z.object({
    characteristic: z.array(CharacteristicSchema),
});

const ReservationItemSchema = z.object({
    resourceCapacity: ResourceCapacitySchema,
    appliedCapacityAmount: AppliedCapacityAmountSchema,
});

export const resourcePoolManagementInputSchema = z.object({
    relatedParty: RelatedPartySchema,
    reservationItem: z.array(ReservationItemSchema),
});

const ResourceSpecificationSchema = z.object({
    id: z.string(),
    cellName: z.nullable(z.string()),
    type: z.string(),
    name: z.string(),
});

const ResourceLocationSchema = z.object({
    type: z.string(),
    labelType: z.string(),
    name: z.string(),
    description: z.string(),
    parentLocation: z.string(),
    address: geographicAddressOutputSchema,
});

const ResourceSchema = z.object({
    id: z.string(),
    name: z.string(),
    type: z.literal('PTP'),
    resourceSpecification: ResourceSpecificationSchema,
    resourceLocation: ResourceLocationSchema,
});

const AppliedCapacityAmountSchemaOutput = z.object({
    resource: z.array(ResourceSchema),
});

const ResourceCapacitySchemaOutput = z.object({
    resourcePool: externalSystemsSchema,
});

const ReservationItemSchemaOutput = z.object({
    id: z.string(),
    reservationState: z.literal('NEW'),
    reservationStateDate: z.string(),
    resourceCapacity: ResourceCapacitySchemaOutput,
    appliedCapacityAmount: AppliedCapacityAmountSchemaOutput,
});

export const ResourcePoolManagementOutputSchema = z.object({
    reservationItem: z.array(ReservationItemSchemaOutput),
});


export const CancelReservationSchema = z.object({
    relatedParty: RelatedPartySchema,
    reservationItem: z.object({
        reservationState: z.string(),
    }),
});

export type CancelReservationInput = z.infer<typeof CancelReservationSchema>;
export type ResourcePoolManagementInput = z.infer<typeof resourcePoolManagementInputSchema>;
export type ResourcePoolManagementOutput = z.infer<typeof ResourcePoolManagementOutputSchema>;
