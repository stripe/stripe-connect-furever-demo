import {stripe} from '@/lib/stripe';

export const getFinancingOffersList = async ({
  connected_account,
  limit = undefined,
}: {
  connected_account: string;
  limit?: number | undefined;
}) => {
  const overrideApiVersion =
    '2026-03-25.dahlia; capital_line_of_credit_preview=v1';

  return await stripe.capital.financingOffers
    .list(
      {
        connected_account: connected_account,
        limit: limit,
      },
      {
        apiVersion: overrideApiVersion,
      }
    )
    .then(
      (response) => {
        return response;
      },
      // fallback to default API version if the override API version is not supported by the platform
      async () => {
        console.log(
          'v1/capital/financing_offers: Unable to use line of credit preview API version. Falling back to default API version.'
        );
        return await stripe.capital.financingOffers.list({
          connected_account: connected_account,
          limit: 1,
        });
      }
    );
  // Let caller handle final error
};
