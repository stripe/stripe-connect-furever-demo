"use strict";
// File generated from our OpenAPI spec
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cadences = void 0;
const StripeResource_js_1 = require("../../../StripeResource.js");
const stripeMethod = StripeResource_js_1.StripeResource.method;
exports.Cadences = StripeResource_js_1.StripeResource.extend({
    create: stripeMethod({ method: 'POST', fullPath: '/v2/billing/cadences' }),
    retrieve: stripeMethod({
        method: 'GET',
        fullPath: '/v2/billing/cadences/{id}',
    }),
    update: stripeMethod({ method: 'POST', fullPath: '/v2/billing/cadences/{id}' }),
    list: stripeMethod({
        method: 'GET',
        fullPath: '/v2/billing/cadences',
        methodType: 'list',
    }),
    cancel: stripeMethod({
        method: 'POST',
        fullPath: '/v2/billing/cadences/{id}/cancel',
    }),
});
