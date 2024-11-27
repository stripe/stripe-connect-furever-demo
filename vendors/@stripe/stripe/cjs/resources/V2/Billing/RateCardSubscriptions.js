"use strict";
// File generated from our OpenAPI spec
Object.defineProperty(exports, "__esModule", { value: true });
exports.RateCardSubscriptions = void 0;
const StripeResource_js_1 = require("../../../StripeResource.js");
const stripeMethod = StripeResource_js_1.StripeResource.method;
exports.RateCardSubscriptions = StripeResource_js_1.StripeResource.extend({
    create: stripeMethod({
        method: 'POST',
        fullPath: '/v2/billing/rate_card_subscriptions',
    }),
    retrieve: stripeMethod({
        method: 'GET',
        fullPath: '/v2/billing/rate_card_subscriptions/{id}',
    }),
    update: stripeMethod({
        method: 'POST',
        fullPath: '/v2/billing/rate_card_subscriptions/{id}',
    }),
    list: stripeMethod({
        method: 'GET',
        fullPath: '/v2/billing/rate_card_subscriptions',
        methodType: 'list',
    }),
    cancel: stripeMethod({
        method: 'POST',
        fullPath: '/v2/billing/rate_card_subscriptions/{id}/cancel',
    }),
});
