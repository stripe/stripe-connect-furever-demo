// File generated from our OpenAPI spec
import { StripeResource } from '../../../StripeResource.js';
const stripeMethod = StripeResource.method;
export const QuantityConfigs = StripeResource.extend({
    retrieve: stripeMethod({
        method: 'GET',
        fullPath: '/v2/billing/quantity_configs/{id}',
    }),
    list: stripeMethod({
        method: 'GET',
        fullPath: '/v2/billing/quantity_configs',
        methodType: 'list',
    }),
});
