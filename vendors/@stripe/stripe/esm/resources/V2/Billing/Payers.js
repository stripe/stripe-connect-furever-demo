// File generated from our OpenAPI spec
import { StripeResource } from '../../../StripeResource.js';
const stripeMethod = StripeResource.method;
export const Payers = StripeResource.extend({
    create: stripeMethod({ method: 'POST', fullPath: '/v2/billing/payers' }),
    retrieve: stripeMethod({ method: 'GET', fullPath: '/v2/billing/payers/{id}' }),
    list: stripeMethod({
        method: 'GET',
        fullPath: '/v2/billing/payers',
        methodType: 'list',
    }),
});
