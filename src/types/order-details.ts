import { z } from 'zod';

export const OrderDetailsOutputSchema = z.object({
    box: z.object({
        name: z.string(),
        lat: z.number(),
        lng: z.number(),
    }),
    property: z
        .object({
            lat: z.number(),
            lng: z.number(),
        })
        .optional(),
    drop: z
        .object({
            length: z.number(),
        })
        .optional(),
    poles: z
        .array(
            z.object({
                lng: z.number(),
                lat: z.number(),
            }),
        )
        .optional(),
});

export type OrderDetailsOutput = z.infer<typeof OrderDetailsOutputSchema>;