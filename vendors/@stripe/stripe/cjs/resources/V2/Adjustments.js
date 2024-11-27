"use strict";
// File generated from our OpenAPI spec
Object.defineProperty(exports, "__esModule", { value: true });
exports.Adjustments = void 0;
const StripeResource_js_1 = require("../../StripeResource.js");
const stripeMethod = StripeResource_js_1.StripeResource.method;
exports.Adjustments = StripeResource_js_1.StripeResource.extend({
    retrieve: stripeMethod({ method: 'GET', fullPath: '/v2/adjustments/{id}' }),
    list: stripeMethod({
        method: 'GET',
        fullPath: '/v2/adjustments',
        methodType: 'list',
    }),
});
