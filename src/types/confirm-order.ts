import { z } from 'zod';

export const ConfirmOrderInputSchema = z.object({
    port: z.object({
        idExternal: z.string(),
        nameExternal: z.string(),
    }),
    address: z.string(),
    idClient: z.string(),
    codeOrder: z.string(),
    idsExternals: z.object({
        gis: z.object({
            idClientExternal: z.string(),
        }),
        idBox: z.string(),
        idSplitter: z.string(),
        boxCoordinates: z.object({
            lat: z.number(),
            lng: z.number(),
        }),
    }),
});

export const ConfirmOrderOutputSchema =  z.object({
    _id: z.string(),
});

export type ConfirmOrderInput = z.infer<typeof ConfirmOrderInputSchema>;
export type ConfirmOrderOutput = z.infer<typeof ConfirmOrderOutputSchema>;
