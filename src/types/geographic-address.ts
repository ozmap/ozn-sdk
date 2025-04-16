import { z } from 'zod';

import { externalSystemsSchema } from './shared';

// regex para lat e lng: https://stackoverflow.com/questions/3518504/regular-expression-for-matching-latitude-longitude-coordinates
// zod issue https://github.com/colinhacks/zod/issues/2600
export const geographicAddressInputSchema = z
    .object({
        name: z.string().min(2).optional(),
        postcode: z.string().min(5).optional(),
        streetNr: z.string().optional(),
        lat: z
            .string()
            .regex(/^(\+|-)?(?:90(?:(?:\.0{1,20})?)|(?:[0-9]|[1-8][0-9])(?:(?:\.[0-9]{1,20})?))$/, 'lat must to be between -90 and 90')
            .optional(),
        lng: z
            .string()
            .regex(/^(\+|-)?(?:180(?:(?:\.0{1,20})?)|(?:[0-9]|[1-9][0-9]|1[0-7][0-9])(?:(?:\.[0-9]{1,20})?))$/, 'lng must to be between -180 and 180')
            .optional(),
    })
    .refine((input) => {
        const hasCoordinates = input.lat && input.lng;
        const hasAddress = input.name && input.postcode && input.streetNr;

        return hasCoordinates || hasAddress;
    }, 'You must provide at least (lat & lng) or (name, postcode & streetNr).');

export const geographicLocationSchema = z.object({
    name: z.string(),
    type: z.string(),
    geometry: z.array(
        z.object({
            x: z.number(),
            y: z.number(),
            z: z.number().nullable(),
        }),
    ),
});

export const geographicAddressOutputSchema = z.object({
    id: z.string().or(z.number()),
    city: z.string(),
    cnl: z.string(),
    country: z.string(),
    locality: z.string(),
    district: z.string(),
    name: z.string(),
    postcode: z.string(),
    stateOrProvince: z.string(),
    streetName: z.string(),
    streetNr: z.string().or(z.number()),
    streetType: z.string(),
    streetTitle: z.string(),
    type: z.string(),
    geographicAddressComplement: z.string().optional(),
    geographicLocation: geographicLocationSchema,
    geographicSubAddress: z.string().optional(),
    externalSystems: z.array(externalSystemsSchema),
    relatedAddress: z
        .array(
            z.object({
                id: z.string(),
                externalSystem: z.string(),
                role: z.string(),
            }),
        )
        .optional(),
});

export type GeographicAddressInput = z.infer<typeof geographicAddressInputSchema>;
export type GeographicAddressOutput = z.infer<typeof geographicAddressOutputSchema>;
