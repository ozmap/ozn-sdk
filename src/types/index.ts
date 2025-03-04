import * as resourcePoolManagement from './resource-pool-management';
import * as geographicAddress from './geographic-address';
import * as serviceQualification from './service-qualification';
import * as shared from './shared';

export default {
    ...shared,
    ...geographicAddress,
    ...resourcePoolManagement,
    ...serviceQualification,
};
