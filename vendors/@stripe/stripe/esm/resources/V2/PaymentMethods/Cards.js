// File generated from our OpenAPI spec
import { StripeResource } from '../../../StripeResource.js';
const stripeMethod = StripeResource.method;
export const Cards = StripeResource.extend({
    create: stripeMethod({ method: 'POST', fullPath: '/v2/payment_methods/cards' }),
    retrieve: stripeMethod({
        method: 'GET',
        fullPath: '/v2/payment_methods/cards/{id}',
    }),
    update: stripeMethod({
        method: 'POST',
        fullPath: '/v2/payment_methods/cards/{id}',
    }),
    archive: stripeMethod({
        method: 'POST',
        fullPath: '/v2/payment_methods/cards/{id}/archive',
    }),
});
