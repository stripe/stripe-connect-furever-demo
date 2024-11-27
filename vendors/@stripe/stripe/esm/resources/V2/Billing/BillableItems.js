// File generated from our OpenAPI spec
import { StripeResource } from '../../../StripeResource.js';
const stripeMethod = StripeResource.method;
export const BillableItems = StripeResource.extend({
    retrieve: stripeMethod({
        method: 'GET',
        fullPath: '/v2/billing/billable_items/{id}',
    }),
    list: stripeMethod({
        method: 'GET',
        fullPath: '/v2/billing/billable_items',
        methodType: 'list',
    }),
});
