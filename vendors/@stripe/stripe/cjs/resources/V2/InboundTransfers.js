"use strict";
// File generated from our OpenAPI spec
Object.defineProperty(exports, "__esModule", { value: true });
exports.InboundTransfers = void 0;
const StripeResource_js_1 = require("../../StripeResource.js");
const stripeMethod = StripeResource_js_1.StripeResource.method;
exports.InboundTransfers = StripeResource_js_1.StripeResource.extend({
    create: stripeMethod({ method: 'POST', fullPath: '/v2/inbound_transfers' }),
    retrieve: stripeMethod({
        method: 'GET',
        fullPath: '/v2/inbound_transfers/{id}',
    }),
    list: stripeMethod({
        method: 'GET',
        fullPath: '/v2/inbound_transfers',
        methodType: 'list',
    }),
});
