import {
    serviceQualificationByIdInputSchema,
    ServiceQualificationAddressSchema,
    EligibilityUnavailabilityReasonSchema,
    RelatedEntitySchema,
    serviceQualificationOutputSchema,
} from './service-qualification';

describe('Service Qualification Schemas', () => {
    it('should validate serviceQualificationByIdInputSchema', () => {
        const validData = {
            serviceQualificationItem: [
                {
                    service: {
                        place: {
                            externalId: '123',
                            externalSystem: 'system',
                        },
                    },
                },
            ],
        };

        expect(() => serviceQualificationByIdInputSchema.parse(validData)).not.toThrow();
    });

    it('should validate ServiceQualificationAddressSchema', () => {
        const validData = {
            type: 'addressType',
            geographicLocation: {
                name: 'locationName',
                type: 'Point',
                geometry: [{ x: 1, y: 2, z: null }],
            },
        };

        expect(() => ServiceQualificationAddressSchema.parse(validData)).not.toThrow();
    });

    it('should validate EligibilityUnavailabilityReasonSchema', () => {
        const validData = {
            code: 'code',
            label: 'label',
        };

        expect(() => EligibilityUnavailabilityReasonSchema.parse(validData)).not.toThrow();
    });

    it('should validate RelatedEntitySchema', () => {
        const validData = {
            '@type': 'type',
            qualificationResult: 'result',
            characteristic: [{ name: 'name', valueType: 'string', value: 'value' }],
            resourceSpecification: {
                id: 'id',
                cellName: null,
                type: 'type',
                name: 'name',
                feedingHeadend: 'headend',
                project: 'project',
            },
            resourceLocation: {
                type: 'type',
                labelType: 'label',
                name: 'name',
                description: null,
                parentLocation: 'parent',
                address: {
                    type: 'addressType',
                    geographicLocation: {
                        name: 'locationName',
                        type: 'Point',
                        geometry: [{ x: 1, y: 2, z: null }],
                    },
                },
            },
            eligibilityUnavailabilityReason: [{ code: 'code', label: 'label' }],
        };

        expect(() => RelatedEntitySchema.parse(validData)).not.toThrow();
    });

    it('should validate serviceQualificationOutputSchema', () => {
        const validData = {
            provideUnavailabilityReason: true,
            serviceQualificationItem: [
                {
                    qualificationResult: 'qualified',
                    codeOrder: 'order-code',
                    clientName: 'client-name',
                    service: {
                        serviceCharacteristic: [{ name: 'name', valueType: 'string', value: 'value' }],
                        relatedEntity: [
                            {
                                '@type': 'type',
                                qualificationResult: 'result',
                                characteristic: [{ name: 'name', valueType: 'string', value: 'value' }],
                                resourceSpecification: {
                                    id: 'id',
                                    cellName: null,
                                    type: 'type',
                                    name: 'name',
                                    feedingHeadend: 'headend',
                                    project: 'project',
                                },
                                resourceLocation: {
                                    type: 'type',
                                    labelType: 'label',
                                    name: 'name',
                                    description: null,
                                    parentLocation: 'parent',
                                    address: {
                                        type: 'addressType',
                                        geographicLocation: {
                                            name: 'locationName',
                                            type: 'Point',
                                            geometry: [{ x: 1, y: 2, z: null }],
                                        },
                                    },
                                },
                                eligibilityUnavailabilityReason: [{ code: 'code', label: 'label' }],
                            },
                        ],
                    },
                    eligibilityUnavailabilityReason: [{ code: 'code', label: 'label' }],
                },
            ],
        };

        expect(() => serviceQualificationOutputSchema.parse(validData)).not.toThrow();
    });
});
