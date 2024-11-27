"use strict";
// File generated from our OpenAPI spec
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreditGrants = void 0;
const StripeResource_js_1 = require("../../StripeResource.js");
const stripeMethod = StripeResource_js_1.StripeResource.method;
exports.CreditGrants = StripeResource_js_1.StripeResource.extend({
    create: stripeMethod({ method: 'POST', fullPath: '/v1/billing/credit_grants' }),
    retrieve: stripeMethod({
        method: 'GET',
        fullPath: '/v1/billing/credit_grants/{id}',
    }),
    update: stripeMethod({
        method: 'POST',
        fullPath: '/v1/billing/credit_grants/{id}',
    }),
    list: stripeMethod({
        method: 'GET',
        fullPath: '/v1/billing/credit_grants',
        methodType: 'list',
    }),
    expire: stripeMethod({
        method: 'POST',
        fullPath: '/v1/billing/credit_grants/{id}/expire',
    }),
    voidGrant: stripeMethod({
        method: 'POST',
        fullPath: '/v1/billing/credit_grants/{id}/void',
    }),
});
