require("dotenv").config();

const express = require("express");
const cookieSession = require("cookie-session");
const exphbs = require("express-handlebars");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const demoConfig = require("./demo.config");
const errorHandler = require("./middlewares/errorHandler");

const app = express();

app.use(
  cookieSession({
    secret: process.env.SESSION_SECRET_KEY,
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
  })
);

// Automatically pass session data to Handlebars
app.use((req, res, next) => {
  app.locals.session = req.session;
  res.locals.isAuthenticated = !!req.session?.isAuthenticated;
  next();
});

logger.token("error", function (req, res) {
  return req.error;
});

// Configure template engine and main template file
app.engine(
  "hbs",
  exphbs({
    defaultLayout: "main",
    extname: ".hbs",
    helpers: {
      enableAnalytics: function () {
        return process.env.ENABLE_ANALYTICS === "true";
      },
      formatDateTime: function (secondsSinceEpoch) {
        var d = new Date(secondsSinceEpoch * 1000);
        var options = {
          weekday: "long",
          year: "numeric",
          month: "numeric",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          seconds: "2-digit",
        };

        return d.toLocaleDateString("en-US", options);
      },
      demoConfig() {
        return demoConfig;
      },
      currentYear() {
        return new Date().getFullYear();
      },
      stripePublishableKey() {
        return process.env.STRIPE_PUBLISHABLE_KEY;
      },
      eq(one, two) {
        return one == two;
      },
      ne(one, two) {
        return one !== two;
      },
      lt(one, two) {
        return one < two;
      },
      gt(one, two) {
        return one > two;
      },
      lte(one, two) {
        return one <= two;
      },
      gte(one, two) {
        return one >= two;
      },
      centsToDollars(price) {
        return ((price || 0) / 100).toFixed(2);
      },
      centsToDollarsRounded(price) {
        return (price || 0) / 100;
      },
      getLast4(cardNumber) {
        return cardNumber.slice(-4);
      },
      formatCardNumber: (cardNumber) => {
        formattedCardNumber = cardNumber.match(/.{1,4}/g).join(" ");
        return formattedCardNumber;
      },
      formatCurrency: function (locale, amount) {
        return new Intl.NumberFormat(locale, {
          style: "currency",
          currency: "USD",
        }).format(amount / 100);
      },
      formatDate(timestamp) {
        const date = new Date(timestamp * 1000);

        return date.toLocaleDateString(demoConfig.locale, {
          month: "short",
          day: "numeric",
          year: "numeric",
        });
      },
      capitalize(text) {
        return text.charAt(0).toUpperCase() + text.slice(1);
      },
      formatTime(timestamp) {
        const date = new Date(timestamp * 1000);

        return date.toLocaleTimeString(demoConfig.locale, {
          hour: "numeric",
          minute: "2-digit",
        });
      },
      oddTableRowIndex(index, options) {
        if (index % 2 == 0) {
          return options.fn(this);
        } else {
          return options.inverse(this);
        }
      },
      userInitials(user = "") {
        return user.slice(0, 1).toUpperCase();
      },
      ifEquals: function (arg1, arg2, options) {
        return arg1 == arg2 ? options.fn(this) : options.inverse(this);
      },
      noCapitalOffers(capitalOffers) {
        return capitalOffers.length == 0;
      },
      capitalOfferUndelivered(capitalOffers) {
        if (capitalOffers.length > 0) {
          return capitalOffers[0].status === "undelivered";
        } else {
          return false;
        }
      },
      capitalOfferInReview(capitalOffers) {
        if (capitalOffers.length > 0) {
          return capitalOffers[0].status === "accepted";
        } else {
          return false;
        }
      },
      capitalOfferActive(capitalOffers) {
        if (capitalOffers.length > 0) {
          return capitalOffers[0].status === "paid_out";
        } else {
          return false;
        }
      },
    },
  })
);
app.set("view engine", "hbs");
app.use(
  logger("dev", {
    skip: function (req, res) {
      return res.statusCode >= 400;
    },
  })
);
app.use(
  logger(":error", {
    skip: function (req, res) {
      return res.statusCode < 400;
    },
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(__dirname + "/public"));

var indexRouter = require("./routes/index");
app.use("/", indexRouter);

app.use(errorHandler);

app.listen(process.env.PORT, () => {
  console.log(`The web server has started on port ${process.env.PORT}`);
});
