"use strict";
// File generated from our OpenAPI spec
Object.defineProperty(exports, "__esModule", { value: true });
exports.FinancialAddresses = void 0;
const StripeResource_js_1 = require("../../StripeResource.js");
const stripeMethod = StripeResource_js_1.StripeResource.method;
exports.FinancialAddresses = StripeResource_js_1.StripeResource.extend({
    create: stripeMethod({ method: 'POST', fullPath: '/v2/financial_addresses' }),
    retrieve: stripeMethod({
        method: 'GET',
        fullPath: '/v2/financial_addresses/{id}',
    }),
    list: stripeMethod({
        method: 'GET',
        fullPath: '/v2/financial_addresses',
        methodType: 'list',
    }),
});
