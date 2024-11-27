"use strict";
// File generated from our OpenAPI spec
Object.defineProperty(exports, "__esModule", { value: true });
exports.RateCards = void 0;
const StripeResource_js_1 = require("../../../StripeResource.js");
const Rates_js_1 = require("./RateCards/Rates.js");
const Versions_js_1 = require("./RateCards/Versions.js");
const stripeMethod = StripeResource_js_1.StripeResource.method;
exports.RateCards = StripeResource_js_1.StripeResource.extend({
    constructor: function (...args) {
        StripeResource_js_1.StripeResource.apply(this, args);
        this.rates = new Rates_js_1.Rates(...args);
        this.versions = new Versions_js_1.Versions(...args);
    },
    create: stripeMethod({ method: 'POST', fullPath: '/v2/billing/rate_cards' }),
    retrieve: stripeMethod({
        method: 'GET',
        fullPath: '/v2/billing/rate_cards/{id}',
    }),
    update: stripeMethod({
        method: 'POST',
        fullPath: '/v2/billing/rate_cards/{id}',
    }),
    list: stripeMethod({
        method: 'GET',
        fullPath: '/v2/billing/rate_cards',
        methodType: 'list',
    }),
});
