import { z } from 'zod';

export type PasswordInput = z.infer<typeof passwordSchema>;

export const passwordSchema = z.object({
    grant_type: z.literal('password'),
    username: z.string(),
    password: z.string(),
});

export type ClientCredentialsInput = z.infer<typeof clientCredentialsSchema>;

export const clientCredentialsSchema = z.object({
    grant_type: z.literal('client_credentials'),
    client_id: z.string(),
    client_secret: z.string(),
});

export type RefreshTokenInput = z.infer<typeof refreshTokenSchema>;

export const refreshTokenSchema = z.object({
    grant_type: z.literal('refresh_token'),
    refresh_token: z.string(),
});

export const tokenInputSchema = z.discriminatedUnion('grant_type', [passwordSchema, clientCredentialsSchema, refreshTokenSchema]);

export type TokenInput = z.infer<typeof tokenInputSchema>;

export const tokenOutputSchema = z.object({
    access_token: z.string(),
    expires_in: z.number(),
    refresh_expires_in: z.number(),
    refresh_token: z.string(),
});

export type TokenOutput = z.infer<typeof tokenOutputSchema>;