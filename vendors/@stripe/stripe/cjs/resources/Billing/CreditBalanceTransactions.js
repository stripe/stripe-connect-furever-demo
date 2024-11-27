"use strict";
// File generated from our OpenAPI spec
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreditBalanceTransactions = void 0;
const StripeResource_js_1 = require("../../StripeResource.js");
const stripeMethod = StripeResource_js_1.StripeResource.method;
exports.CreditBalanceTransactions = StripeResource_js_1.StripeResource.extend({
    retrieve: stripeMethod({
        method: 'GET',
        fullPath: '/v1/billing/credit_balance_transactions/{id}',
    }),
    list: stripeMethod({
        method: 'GET',
        fullPath: '/v1/billing/credit_balance_transactions',
        methodType: 'list',
    }),
});
