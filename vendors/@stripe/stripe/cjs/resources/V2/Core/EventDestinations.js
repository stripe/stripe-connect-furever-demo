"use strict";
// File generated from our OpenAPI spec
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventDestinations = void 0;
const StripeResource_js_1 = require("../../../StripeResource.js");
const stripeMethod = StripeResource_js_1.StripeResource.method;
exports.EventDestinations = StripeResource_js_1.StripeResource.extend({
    create: stripeMethod({
        method: 'POST',
        fullPath: '/v2/core/event_destinations',
    }),
    retrieve: stripeMethod({
        method: 'GET',
        fullPath: '/v2/core/event_destinations/{id}',
    }),
    update: stripeMethod({
        method: 'POST',
        fullPath: '/v2/core/event_destinations/{id}',
    }),
    list: stripeMethod({
        method: 'GET',
        fullPath: '/v2/core/event_destinations',
        methodType: 'list',
    }),
    del: stripeMethod({
        method: 'DELETE',
        fullPath: '/v2/core/event_destinations/{id}',
    }),
    disable: stripeMethod({
        method: 'POST',
        fullPath: '/v2/core/event_destinations/{id}/disable',
    }),
    enable: stripeMethod({
        method: 'POST',
        fullPath: '/v2/core/event_destinations/{id}/enable',
    }),
    ping: stripeMethod({
        method: 'POST',
        fullPath: '/v2/core/event_destinations/{id}/ping',
    }),
});
