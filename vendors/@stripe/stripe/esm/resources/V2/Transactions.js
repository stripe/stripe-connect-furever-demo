// File generated from our OpenAPI spec
import { StripeResource } from '../../StripeResource.js';
const stripeMethod = StripeResource.method;
export const Transactions = StripeResource.extend({
    retrieve: stripeMethod({ method: 'GET', fullPath: '/v2/transactions/{id}' }),
    list: stripeMethod({
        method: 'GET',
        fullPath: '/v2/transactions',
        methodType: 'list',
    }),
});
