"use strict";
// File generated from our OpenAPI spec
Object.defineProperty(exports, "__esModule", { value: true });
exports.FinancialAddresses = void 0;
const StripeResource_js_1 = require("../../../StripeResource.js");
const stripeMethod = StripeResource_js_1.StripeResource.method;
exports.FinancialAddresses = StripeResource_js_1.StripeResource.extend({
    credit: stripeMethod({
        method: 'POST',
        fullPath: '/v2/test_helpers/financial_addresses/{id}/credit',
    }),
    generateMicrodeposits: stripeMethod({
        method: 'POST',
        fullPath: '/v2/test_helpers/financial_addresses/{id}/generate_microdeposits',
    }),
});
