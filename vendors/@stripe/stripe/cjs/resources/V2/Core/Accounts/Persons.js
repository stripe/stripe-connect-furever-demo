"use strict";
// File generated from our OpenAPI spec
Object.defineProperty(exports, "__esModule", { value: true });
exports.Persons = void 0;
const StripeResource_js_1 = require("../../../../StripeResource.js");
const stripeMethod = StripeResource_js_1.StripeResource.method;
exports.Persons = StripeResource_js_1.StripeResource.extend({
    create: stripeMethod({
        method: 'POST',
        fullPath: '/v2/core/accounts/{account_id}/persons',
    }),
    retrieve: stripeMethod({
        method: 'GET',
        fullPath: '/v2/core/accounts/{account_id}/persons/{id}',
    }),
    update: stripeMethod({
        method: 'POST',
        fullPath: '/v2/core/accounts/{account_id}/persons/{id}',
    }),
    list: stripeMethod({
        method: 'GET',
        fullPath: '/v2/core/accounts/{account_id}/persons',
        methodType: 'list',
    }),
    del: stripeMethod({
        method: 'DELETE',
        fullPath: '/v2/core/accounts/{account_id}/persons/{id}',
    }),
});
