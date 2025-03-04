import { geographicAddressInputSchema, geographicLocationSchema, geographicAddressOutputSchema, GeographicAddressOutput } from './geographic-address';
import { externalSystemsSchema } from './shared';

describe('geographicAddressInputSchema', () => {
    const validInput = {
        name: 'Main Street',
        postcode: '12345',
        streetNr: '10b',
        lat: '40.7128',
        lng: '-74.0060',
    };

    it('should validate correct input', () => {
        expect(() => geographicAddressInputSchema.parse(validInput)).not.toThrow();
    });

    for (const key in validInput) {
        it(`should throw an error if send only ${key}`, () => {
            // @ts-expect-error - we want to test invalid input
            const result = geographicAddressInputSchema.safeParse({ [key]: validInput[key] });
            expect(result.success).toBe(false);
        });
    }

    it('should reject invalid field types', () => {
        const invalidInput = { ...validInput, lat: 40.7128 }; // number instead of string
        const result = geographicAddressInputSchema.safeParse(invalidInput);
        expect(result.success).toBe(false);
    });
});

describe('geographicLocationSchema', () => {
    const validLocation = {
        name: 'Central Park',
        type: 'Point',
        geometry: [
            {
                x: -73.968285,
                y: 40.785091,
                z: 10,
            },
        ],
    };

    it('should validate correct location', () => {
        expect(() => geographicLocationSchema.parse(validLocation)).not.toThrow();
    });

    it('should reject invalid geometry types', () => {
        const invalidLocation = {
            ...validLocation,
            geometry: { ...validLocation.geometry, x: 'invalid' },
        };
        const result = geographicLocationSchema.safeParse(invalidLocation);
        expect(result.success).toBe(false);
    });
});

describe('externalSystemsSchema', () => {
    const validExternalSystem = {
        externalId: 'EXT-123',
        externalSystem: 'CRM',
    };

    it('should validate correct external system', () => {
        expect(() => externalSystemsSchema.parse(validExternalSystem)).not.toThrow();
    });

    it('should reject missing externalSystem', () => {
        const invalidSystem = { externalId: 'EXT-123' };
        const result = externalSystemsSchema.safeParse(invalidSystem);
        expect(result.success).toBe(false);
    });
});

describe('geographicAddressOutputSchema', () => {
    const validOutput: GeographicAddressOutput = {
        id: 'addr-123',
        city: 'New York',
        cnl: 'US',
        country: 'United States',
        locality: 'Manhattan',
        district: 'Midtown',
        name: 'Empire State Building',
        postcode: '10118',
        stateOrProvince: 'NY',
        streetName: '5th Avenue',
        streetNr: '350',
        streetType: 'Ave',
        streetTitle: 'Fifth Avenue',
        type: 'commercial',
        geographicLocation: {
            name: 'Empire State Location',
            type: 'Point',
            geometry: [
                {
                    x: -73.9857,
                    y: 40.7484,
                    z: null,
                },
            ],
        },
        externalSystems: [
            {
                externalId: 'EXT-123',
                externalSystem: 'GIS',
            },
        ],
    };

    it('should validate complete output structure', () => {
        expect(() => geographicAddressOutputSchema.parse(validOutput)).not.toThrow();
    });

    it('should accept optional fields', () => {
        const withOptionalFields = {
            ...validOutput,
            geographicAddressComplement: 'Floor 86',
            geographicSubAddress: 'Observation Deck',
        };
        expect(() => geographicAddressOutputSchema.parse(withOptionalFields)).not.toThrow();
    });

    it('should reject invalid externalSystems array', () => {
        const invalidOutput = {
            ...validOutput,
            externalSystems: [{ externalId: 'EXT-123' }], // missing externalSystem
        };
        const result = geographicAddressOutputSchema.safeParse(invalidOutput);
        expect(result.success).toBe(false);
    });

    it('should enforce number types for geometry coordinates', () => {
        const invalidOutput = {
            ...validOutput,
            geographicLocation: {
                ...validOutput.geographicLocation,
                geometry: { x: '-73.9857', y: 40.7484 }, // string instead of number
            },
        };
        const result = geographicAddressOutputSchema.safeParse(invalidOutput);
        expect(result.success).toBe(false);
    });
});
