(() => {
  'use strict';
  const e =
    'loadConnect was called but an existing Connect.js script already exists in the document; existing script parameters will be used';
  let t = null;
  const n = (e) => ({
      initialize: (t) => {
        const n = t.metaOptions ?? {};
        return e.init({...t, metaOptions: {...n, sdk: !0}});
      },
    }),
    o = Promise.resolve().then(
      () => (
        null !== t ||
          (t = new Promise((t, o) => {
            if (
              (window.StripeConnect && console.warn(e), window.StripeConnect)
            ) {
              const e = n(window.StripeConnect);
              t(e);
            } else
              try {
                let c = document.querySelectorAll(
                  'script[src="https://connect-js.stripe.com/v0.1/connect.js"]'
                )[0];
                c
                  ? console.warn(e)
                  : c ||
                    (c = (() => {
                      const e = document.createElement('script');
                      if (
                        ((e.src =
                          'https://connect-js.stripe.com/v0.1/connect.js'),
                        !document.head)
                      )
                        throw new Error(
                          'Expected document.head not to be null. Connect.js requires a <head> element.'
                        );
                      return document.head.appendChild(e), e;
                    })()),
                  c.addEventListener('load', () => {
                    if (window.StripeConnect) {
                      const e = n(window.StripeConnect);
                      t(e);
                    } else
                      o(
                        new Error(
                          'Connect.js did not load the necessary objects'
                        )
                      );
                  }),
                  c.addEventListener('error', () => {
                    o(new Error('Failed to load Connect.js'));
                  });
              } catch (e) {
                o(e);
              }
          })),
        t
      )
    );
  let c = !1;
  o.catch((e) => {
    c || console.warn(e);
  });
  const r = () => {
      const e = document.querySelector('div.loading-error-message');
      e &&
        ((e.textContent =
          'Something went wrong. Please refresh your page and try again.'),
        (e.style.display = 'block'));
    },
    s = () => {
      const e = document.querySelector('div.loading-error-message');
      e && (e.style.display = 'none');
    },
    i = async () => {
      const e = await fetch('/stripe/create-account-session');
      if (e.ok) {
        const {client_secret: t, publishable_key: n} = await e.json();
        return {clientSecret: t, publishableKey: n};
      }
      console.error(
        'Failed to obtain account session, could not initialize connect.js'
      );
    },
    a = async () => {
      const e = await i(),
        t = e?.clientSecret;
      return t ? s() : r(), t;
    };
  !(async function () {
    const e = await i(),
      t = await ((c = !0),
      o.then((e) => {
        return null === (t = e) ? null : t;
        var t;
      }));
    if (e) {
      s();
      const {clientSecret: n, publishableKey: o} = e;
      t.initialize({
        publishableKey: o,
        clientSecret: n,
        appearance: {colors: {primary: '#228403'}},
        uiConfig: {overlay: 'dialog'},
        refreshClientSecret: a,
      });
    } else r();
  })();
})();
