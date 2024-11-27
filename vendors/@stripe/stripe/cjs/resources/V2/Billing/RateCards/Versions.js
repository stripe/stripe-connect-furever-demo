"use strict";
// File generated from our OpenAPI spec
Object.defineProperty(exports, "__esModule", { value: true });
exports.Versions = void 0;
const StripeResource_js_1 = require("../../../../StripeResource.js");
const stripeMethod = StripeResource_js_1.StripeResource.method;
exports.Versions = StripeResource_js_1.StripeResource.extend({
    retrieve: stripeMethod({
        method: 'GET',
        fullPath: '/v2/billing/rate_cards/{rate_card_id}/versions/{id}',
    }),
    list: stripeMethod({
        method: 'GET',
        fullPath: '/v2/billing/rate_cards/{rate_card_id}/versions',
        methodType: 'list',
    }),
});
