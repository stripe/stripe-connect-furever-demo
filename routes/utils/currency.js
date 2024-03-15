const getCurrency = (country) => {
  switch (country) {
    case "SG":
      return "sgd";
    case "AU":
      return "aud";
    case "GB":
      return "gbp";
    case "FR":
      return "eur";
    default:
      return "usd";
  }
};

const getCurrencySymbol = (country) => {
  switch (country) {
    case "SG":
      return "$";
    case "AU":
      return "A$";
    case "GB":
      return "£";
    case "FR":
      return "€";
    default:
      return "$";
  }
};

module.exports = {
  getCurrency,
  getCurrencySymbol,
};
