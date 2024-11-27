// File generated from our OpenAPI spec
import { StripeResource } from '../../StripeResource.js';
const stripeMethod = StripeResource.method;
export const FinancialAccounts = StripeResource.extend({
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
