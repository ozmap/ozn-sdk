import { z } from 'zod';

export const externalSystemsSchema = z.object({
    externalId: z.string().or(z.number()),
    externalSystem: z.string(),
});

export const CharacteristicSchema = z.object({
    name: z.string(),
    valueType: z.string(),
    value: z.string(),
});

export const ResourceSpecificationSchema = z.object({
    id: z.string(),
    cellName: z.string().or(z.null()),
    type: z.string(),
    name: z.string(),
    feedingHeadend: z.string(),
    project: z.string(),
});
