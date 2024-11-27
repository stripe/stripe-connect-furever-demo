"use strict";
// File generated from our OpenAPI spec
Object.defineProperty(exports, "__esModule", { value: true });
exports.GbBankAccounts = void 0;
const StripeResource_js_1 = require("../../../StripeResource.js");
const stripeMethod = StripeResource_js_1.StripeResource.method;
exports.GbBankAccounts = StripeResource_js_1.StripeResource.extend({
    create: stripeMethod({
        method: 'POST',
        fullPath: '/v2/payment_methods/gb_bank_accounts',
    }),
    retrieve: stripeMethod({
        method: 'GET',
        fullPath: '/v2/payment_methods/gb_bank_accounts/{id}',
    }),
    acknowledgeConfirmationOfPayee: stripeMethod({
        method: 'POST',
        fullPath: '/v2/payment_methods/gb_bank_accounts/{id}/acknowledge_confirmation_of_payee',
    }),
    archive: stripeMethod({
        method: 'POST',
        fullPath: '/v2/payment_methods/gb_bank_accounts/{id}/archive',
    }),
    initiateConfirmationOfPayee: stripeMethod({
        method: 'POST',
        fullPath: '/v2/payment_methods/gb_bank_accounts/{id}/initiate_confirmation_of_payee',
    }),
});
