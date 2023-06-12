import React, {createContext, useContext} from 'react';

export type AccountConfiguration =
  | 'no_dashboard_soll'
  | 'dashboard_soll'
  | 'no_dashboard_poll';

type AccountContext = {
  accountConfiguration: string | AccountConfiguration;
  handleAccountChange: (accountConfiguration: AccountConfiguration) => void;
};

const AccountContext = createContext<AccountContext>({
  accountConfiguration: 'no_dashboard_soll',
  handleAccountChange: () => {},
});

export const useAccount = () => {
  return useContext(AccountContext);
};

export const AccountProvider = ({children}: {children: React.ReactNode}) => {
  const [accountConfiguration, setAccountConfiguration] = React.useState<
    AccountConfiguration | string
  >(window.localStorage.getItem('accountConfiguration') || 'no_dashboard_soll');

  const handleAccountChange = (accountConfiguration: AccountConfiguration) => {
    setAccountConfiguration(accountConfiguration);
    window.localStorage.setItem('accountConfiguration', accountConfiguration);
  };
  return (
    <AccountContext.Provider
      value={{accountConfiguration, handleAccountChange}}
    >
      {children}
    </AccountContext.Provider>
  );
};
