import { ResourcePoolManagementInput, resourcePoolManagementInputSchema } from './resource-pool-management';

describe('ResourcePoolManagementInputSchema', () => {
    it('should validate a correct input', () => {
        const validInput: ResourcePoolManagementInput = {
            relatedParty: {
                role: 'Manager',
                property: [{ name: 'Department', value: 'IT' }],
            },
            reservationItem: [
                {
                    resourceCapacity: {
                        place: {
                            externalId: 'EXT-001',
                            externalSystem: 'External System A',
                        },
                    },
                    appliedCapacityAmount: {
                        characteristic: [{ name: 'Capacity', value: '10GB', valueType: 'string' }],
                    },
                },
            ],
        };

        expect(() => resourcePoolManagementInputSchema.parse(validInput)).not.toThrow();
    });

    it('should fail validation for missing required fields', () => {
        const invalidInput = {
            reservationItem: [], // missing relatedParty
        };

        expect(() => resourcePoolManagementInputSchema.parse(invalidInput)).toThrow();
    });

    it('should fail validation for incorrect field types', () => {
        const invalidInput = {
            relatedParty: {
                role: 123,
                property: [{ name: 'Department', value: 456 }],
            },
            reservationItem: [
                {
                    resourceCapacity: {
                        systemId: 999,
                    },
                    appliedCapacityAmount: {
                        characteristic: [{ name: 'Capacity', value: true }],
                    },
                },
            ],
        };

        expect(() => resourcePoolManagementInputSchema.parse(invalidInput)).toThrow();
    });
});
