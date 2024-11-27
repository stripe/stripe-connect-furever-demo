"use strict";
// File generated from our OpenAPI spec
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rates = void 0;
const StripeResource_js_1 = require("../../../../StripeResource.js");
const stripeMethod = StripeResource_js_1.StripeResource.method;
exports.Rates = StripeResource_js_1.StripeResource.extend({
    create: stripeMethod({
        method: 'POST',
        fullPath: '/v2/billing/rate_cards/{rate_card_id}/rates',
    }),
    retrieve: stripeMethod({
        method: 'GET',
        fullPath: '/v2/billing/rate_cards/{rate_card_id}/rates/{id}',
    }),
    list: stripeMethod({
        method: 'GET',
        fullPath: '/v2/billing/rate_cards/{rate_card_id}/rates',
        methodType: 'list',
    }),
});
