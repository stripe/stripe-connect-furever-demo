"use strict";
// File generated from our OpenAPI spec
Object.defineProperty(exports, "__esModule", { value: true });
exports.Accounts = void 0;
const StripeResource_js_1 = require("../../StripeResource.js");
const stripeMethod = StripeResource_js_1.StripeResource.method;
exports.Accounts = StripeResource_js_1.StripeResource.extend({
    create: stripeMethod({ method: 'POST', fullPath: '/v2/accounts' }),
    retrieve: stripeMethod({ method: 'GET', fullPath: '/v2/accounts/{id}' }),
    update: stripeMethod({ method: 'POST', fullPath: '/v2/accounts/{id}' }),
    list: stripeMethod({
        method: 'GET',
        fullPath: '/v2/accounts',
        methodType: 'list',
    }),
    close: stripeMethod({ method: 'POST', fullPath: '/v2/accounts/{id}/close' }),
});
