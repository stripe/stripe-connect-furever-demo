"use strict";
// File generated from our OpenAPI spec
Object.defineProperty(exports, "__esModule", { value: true });
exports.Accounts = void 0;
const StripeResource_js_1 = require("../../../StripeResource.js");
const Persons_js_1 = require("./Accounts/Persons.js");
const stripeMethod = StripeResource_js_1.StripeResource.method;
exports.Accounts = StripeResource_js_1.StripeResource.extend({
    constructor: function (...args) {
        StripeResource_js_1.StripeResource.apply(this, args);
        this.persons = new Persons_js_1.Persons(...args);
    },
    create: stripeMethod({ method: 'POST', fullPath: '/v2/core/accounts' }),
    retrieve: stripeMethod({ method: 'GET', fullPath: '/v2/core/accounts/{id}' }),
    update: stripeMethod({ method: 'POST', fullPath: '/v2/core/accounts/{id}' }),
    list: stripeMethod({
        method: 'GET',
        fullPath: '/v2/core/accounts',
        methodType: 'list',
    }),
    close: stripeMethod({
        method: 'POST',
        fullPath: '/v2/core/accounts/{id}/close',
    }),
});
