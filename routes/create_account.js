const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2022-11-15; unified_accounts_beta=v1",
});
const { getCurrency } = require("./utils/currency");

const getBankAccount = async ({ name, country }) => {
  let accountNumber;
  let routingNumber;
  switch (country) {
    case "SG":
      accountNumber = "000123456";
      routingNumber = "1100-000";
      break;
    case "AU":
      accountNumber = "000123456";
      routingNumber = "110000";
      break;
    case "GB":
      accountNumber = "GB82WEST12345698765432";
      routingNumber = "108800";
      break;
    case "FR":
      accountNumber = "FR1420041010050500013M02606";
      routingNumber = undefined;
      break;
    default:
      accountNumber = "000123456789";
      routingNumber = "110000000";
  }

  const bankAccount = await stripe.tokens.create({
    bank_account: {
      country,
      currency: getCurrency(country),
      account_holder_name: name,
      account_holder_type: "company",
      routing_number: routingNumber,
      account_number: accountNumber,
    },
  });

  return bankAccount;
};

const getAddress = (country) => {
  switch (country) {
    case "SG":
      return {
        support_address: {
          city: "Dublin",
          country: "IE",
          line1: "1 Grand Canal Street Lower",
          postal_code: "D02 H210",
        },
        address: {
          city: "Singapore",
          country: "SG",
          line1: "60 Anson Rd",
          line2: "#05-01 Mapletree Anson",
          postal_code: "079914",
        },
      };
    case "AU":
      return {
        support_address: {
          city: "Dublin",
          country: "IE",
          line1: "1 Grand Canal Street Lower",
          postal_code: "D02 H210",
        },
        address: {
          city: "Barangaroo",
          country: "AU",
          line1: "1 Sussex Street",
          state: "NSW",
          postal_code: "2000",
        },
      };
    case "GB":
      return {
        support_address: {
          city: "Dublin",
          country: "IE",
          line1: "1 Grand Canal Street Lower",
          postal_code: "D02 H210",
        },
        address: {
          city: "London",
          country: "GB",
          line1: "211 Old Street",
          postal_code: "EC1V 9NR",
        },
      };
    case "FR":
      return {
        support_address: {
          city: "Dublin",
          country: "IE",
          line1: "1 Grand Canal Street Lower",
          postal_code: "D02 H210",
        },
        address: {
          city: "Paris",
          country: "FR",
          line1: "10 Boulevard Haussmann",
          postal_code: "75009",
        },
      };
    default:
      return {
        support_address: {
          city: "South San Francisco",
          country: "US",
          line1: "354 Oyster Point Blvd",
          postal_code: "94080",
          state: "CA",
        },
        address: {
          city: "Seattle",
          country: "US",
          line1: "920 5th Avenue",
          postal_code: "98104",
          state: "WA",
        },
      };
  }
};

const getAccount = async ({ name, email, country }) => {
  const bankAccount = await getBankAccount({ name, country });
  const { support_address, address } = getAddress(country);

  const account = await stripe.accounts.create({
    controller: {
      application: {
        loss_liable: false,
        onboarding_owner: false,
        pricing_controls: true,
      },
      dashboard: {
        type: "none",
      },
    },
    country,
    email: email,
    capabilities: {
      card_payments: { requested: true },
      transfers: { requested: true },
    },
    external_account: bankAccount.id,
    business_profile: {
      mcc: 8999,
      name: name,
      product_description: "HVAC Services",
      support_email: "support@example.com",
      support_phone: "0000000000",
      support_address,
      support_url: "https://homex.com",
      url: "https://homex.com",
    },
    business_type: "company",
    company: {
      name: name,
      address,
      directors_provided: true,
      executives_provided: true,
      owners_provided: true,
      phone: "0000000000",
      tax_id: "000000000",
      ...(country === "AU" && {
        registration_number: "432123123",
      }),
    },
    settings: {
      card_payments: {
        statement_descriptor_prefix: "homex",
      },
      payments: {
        statement_descriptor: "homex.com",
      },
    },
  });

  if (country === "US" || country === "SG") {
    // Prefill Person
    await stripe.accounts.createPerson(account.id, {
      first_name: "John",
      last_name: "Doe",
      address: {
        ...getAddress(country).address,
        line1: "address_full_match",
      },
      dob: {
        day: 1,
        month: 1,
        year: 1901,
      },
      email: email,
      phone: "0000000000",
      ssn_last_4: "0000",
      relationship: {
        director: false,
        executive: true,
        owner: true,
        percent_ownership: 50,
        representative: true,
        title: "CEO",
      },
      verification: {
        document: {
          front: "file_identity_document_success",
        },
      },
      ...(country === "SG" && {
        full_name_aliases: [""],
        nationality: "SG",
        id_number: "000000000",
      }),
    });
  }

  return account;
};

module.exports = {
  createAccount: async function (req) {
    const { body } = req;
    try {
      const account = await getAccount(body);
      return { account };
    } catch (error) {
      console.error(error);
      return { error: error.message };
    }
  },
};
