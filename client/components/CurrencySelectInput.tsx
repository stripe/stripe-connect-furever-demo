import React from 'react';

import {SelectInput} from './FormInputs';

type Props = {
  value: unknown;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
};

export const CurrencySelectInput = ({value, onChange}: Props) => {
  return (
    <SelectInput
      label="Currency"
      type="select"
      name="currency"
      size="small"
      value={value}
      onChange={onChange}
    >
      <option value="">Default</option>
      <option value="aed">AED</option>
      <option value="aud">AUD</option>
      <option value="cad">CAD</option>
      <option value="cny">CNY</option>
      <option value="eur">EUR</option>
      <option value="gbp">GBP</option>
      <option value="inr">INR</option>
      <option value="jpy">JPY</option>
      <option value="sgd">SGD</option>
      <option value="usd">USD</option>
    </SelectInput>
  );
};
