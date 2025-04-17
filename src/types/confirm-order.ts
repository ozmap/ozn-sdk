import { z } from 'zod';
import { ResourcePoolManagementOutputSchema } from './resource-pool-management';


export const ConfirmOrderInputSchema = z.object({
    port: z.object({
        idExternal: z.string(),
        idArea: z.string(),
        idOperator: z.string(),
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

export const ConfirmOrderOutputSchema =  ResourcePoolManagementOutputSchema

export type ConfirmOrderInput = z.infer<typeof ConfirmOrderInputSchema>;
export type ConfirmOrderOutput = z.infer<typeof ResourcePoolManagementOutputSchema>;
