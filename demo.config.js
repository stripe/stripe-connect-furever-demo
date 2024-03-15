module.exports = {
  // ========================================================================
  // Global
  // ========================================================================
  currency: "usd",
  paymentMethods: [],
  // ========================================================================
  // Branding
  // ========================================================================
  branding: {
    logo: "/images/favicon.ico",
  },
  // ========================================================================
  // Application fee in %
  // ========================================================================
  applicationFee: 0.03,
  locale: "en-US",

  addresses: [
    {
      city: "New York",
      country: "United States",
      line1: "20 W 34th St",
      line2: "",
      postal_code: "10001",
      state: "New York",
    },
    {
      city: "New York",
      country: "United States",
      line1: "175 5th Ave",
      line2: "",
      postal_code: "10010",
      state: "New York",
    },
    {
      city: "New York",
      country: "United States",
      line1: "45 Rockefeller Plaza",
      line2: "",
      postal_code: "10111",
      state: "New York",
    },
    {
      city: "New York",
      country: "United States",
      line1: "1071 5th Ave",
      line2: "",
      postal_code: "10128",
      state: "New York",
    },
    {
      city: "New York",
      country: "United States",
      line1: "Lincoln Center Plaza",
      line2: "",
      postal_code: "10023",
      state: "New York",
    },
  ],
  services: {
    Maintenance: ["Plumbing", "Electrical", "Handyman Services"],
    HVAC: ["Heating", "Cooling", "Smart Thermostat Installation"],
    Furniture: [
      "TV Mounting",
      "Bed Assembly",
      "Furniture Assembly",
      "Handing Shelves",
    ],
  },

  // ========================================================================
  // Pages
  // ========================================================================
  pages: {
    // All are for elements that show on all/most pages like footer, headers, etc.
    all: {},
    // Index is the homepage
    index: {},
  },
};
