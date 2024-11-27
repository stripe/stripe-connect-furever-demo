// File generated from our OpenAPI spec
import { StripeResource } from '../../../StripeResource.js';
const stripeMethod = StripeResource.method;
export const OutboundDestinations = StripeResource.extend({
    list: stripeMethod({
        method: 'GET',
        fullPath: '/v2/payment_methods/outbound_destinations',
        methodType: 'list',
    }),
});
