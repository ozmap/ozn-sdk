import { z } from 'zod';

const resourceSchema = z
    .array(
        z.object({
            name: z.string(),
            resource: z.object({
                property: z.array(
                    z.object({
                        name: z.string(),
                        value: z.string(),
                    }),
                ),
                component: z.array(z.any()).optional(),
                resource: z.array(z.any()).optional(),
            }),
        }),
    )
    .nullable()
    .optional();

export const ServiceOrderActionEnum = z.enum(['add', 'modify', 'delete', 'modifyPort']);

export const ServiceOrderStateEnum = z.enum(['Completed', 'Held', 'InProgress', 'Cancelled', 'Failed'])

export const PortReplaceDetailEnum = z.enum([
    'crossing',
    'closerCTO',
    'signalIssue',
    'blockedAccess',
    'fullCTO',
    'operationalError',
    'occupied',
    'noSignal',
    'attenuated',
    'others',
]);

export type PortReplaceDetailEnum = z.infer<typeof PortReplaceDetailEnum>;

export const ServiceOrderInputSchema = z.object({
    externalId: z.string(),
    category: z.string(),
    orderDate: z.string(),
    requesterCallback: z.string(),
    relatedParty: z.array(
        z.object({
            role: z.string(),
            property: z.array(
                z.object({
                    name: z.string(),
                    value: z.string(),
                }),
            ),
        }),
    ),
    orderItem: z
        .array(
            z.object({
                id: z.string(),
                action: ServiceOrderActionEnum,
                serviceSpecification: z.array(
                    z.object({
                        id: z.string(),
                    }),
                ),
                service: z
                    .array(
                        z.object({
                            id: z.string(),
                            category: z.string(),
                            serviceCharacteristic: z
                                .array(
                                    z.object({
                                        name: z.string(),
                                        value: z.string(),
                                        characteristic: z.string().nullable().optional(),
                                    }),
                                )
                                .optional(),
                            resource: resourceSchema,
                        }),
                    )
                    .max(1),
            }),
        )
        .max(1),
});

export const ServiceOrderOutputSchema = z.object({
    id: z.string(),
    externalId: z.string(),
    description: z.string().nullable(),
    category: z.string(),
    note: z.string(),
    state: ServiceOrderStateEnum,
    orderDate: z.string(),
    requesterCallback: z.string(),
    relatedParty: z.array(
        z.object({
            role: z.string(),
            property: z.array(
                z.object({
                    name: z.string(),
                    value: z.string(),
                }),
            ),
        }),
    ),
    orderItem: z.array(
        z.object({
            id: z.string(),
            action: ServiceOrderActionEnum,
            requestedCompletionDate: z.string().nullable(),
            state: ServiceOrderStateEnum,
            statusMessage: z.string().nullable(),
            serviceSpecification: z.object({
                id: z.string(),
            }),
            orderItemRelationship: z.array(z.any()),
            service: z.object({
                id: z.string(),
                category: z.string(),
                changeReason: z.string().nullable(),
                name: z.string().nullable(),
                description: z.string().nullable(),
                place: z.array(z.any()),
                serviceCharacteristic: z.array(
                    z.object({
                        name: z.string(),
                        value: z.string(),
                    }),
                ),
                serviceRelationship: z.array(z.any()),
                relatedParty: z.any().nullable(),
                component: z.array(z.any()).optional(),
                resource: resourceSchema,
            }),
        }),
    ),
});

export type ServiceOrderInput = z.infer<typeof ServiceOrderInputSchema>;
export type ServiceOrderOutput = z.infer<typeof ServiceOrderOutputSchema>;