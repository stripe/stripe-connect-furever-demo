"use strict";
// File generated from our OpenAPI spec
Object.defineProperty(exports, "__esModule", { value: true });
exports.OutboundDestinations = void 0;
const StripeResource_js_1 = require("../../../StripeResource.js");
const stripeMethod = StripeResource_js_1.StripeResource.method;
exports.OutboundDestinations = StripeResource_js_1.StripeResource.extend({
    list: stripeMethod({
        method: 'GET',
        fullPath: '/v2/payment_methods/outbound_destinations',
        methodType: 'list',
    }),
});
