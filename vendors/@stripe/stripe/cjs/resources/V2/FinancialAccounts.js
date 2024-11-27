"use strict";
// File generated from our OpenAPI spec
Object.defineProperty(exports, "__esModule", { value: true });
exports.FinancialAccounts = void 0;
const StripeResource_js_1 = require("../../StripeResource.js");
const stripeMethod = StripeResource_js_1.StripeResource.method;
exports.FinancialAccounts = StripeResource_js_1.StripeResource.extend({
    retrieve: stripeMethod({
        method: 'GET',
        fullPath: '/v2/financial_accounts/{id}',
    }),
    list: stripeMethod({
        method: 'GET',
        fullPath: '/v2/financial_accounts',
        methodType: 'list',
    }),
});
