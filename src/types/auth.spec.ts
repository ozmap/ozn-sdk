import { tokenInputSchema, tokenOutputSchema } from './auth';

describe('tokenInputSchema', () => {
    it('should validate password grant type', () => {
        const validInput = {
            grant_type: 'password',
            username: 'user',
            password: 'pass',
        };
        expect(() => tokenInputSchema.parse(validInput)).not.toThrow();
    });

    it('should validate client credentials grant type', () => {
        const validInput = {
            grant_type: 'client_credentials',
            client_id: 'clientId',
            client_secret: 'clientSecret',
        };
        expect(() => tokenInputSchema.parse(validInput)).not.toThrow();
    });

    it('should validate refresh token grant type', () => {
        const validInput = {
            grant_type: 'refresh_token',
            refresh_token: 'refreshToken',
        };
        expect(() => tokenInputSchema.parse(validInput)).not.toThrow();
    });

    it('should reject invalid grant type', () => {
        const invalidInput = {
            grant_type: 'invalid_grant',
        };
        const result = tokenInputSchema.safeParse(invalidInput);
        expect(result.success).toBe(false);
    });

    it('should reject missing required fields', () => {
        const invalidInput = {
            grant_type: 'password',
        };
        const result = tokenInputSchema.safeParse(invalidInput);
        expect(result.success).toBe(false);
    });
});

describe('tokenOutputSchema', () => {
    it('should validate correct output', () => {
        const validOutput = {
            access_token: 'accessToken',
            expires_in: 3600,
            refresh_expires_in: 7200,
            refresh_token: 'refreshToken',
        };
        expect(() => tokenOutputSchema.parse(validOutput)).not.toThrow();
    });

    it('should reject missing required fields', () => {
        const invalidOutput = {
            access_token: 'accessToken',
            expires_in: 3600,
        };
        const result = tokenOutputSchema.safeParse(invalidOutput);
        expect(result.success).toBe(false);
    });

    it('should reject invalid field types', () => {
        const invalidOutput = {
            access_token: 'accessToken',
            expires_in: '3600', // should be a number
            refresh_expires_in: 7200,
            refresh_token: 'refreshToken',
        };
        const result = tokenOutputSchema.safeParse(invalidOutput);
        expect(result.success).toBe(false);
    });
});