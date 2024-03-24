import React from 'react';

import {TextInput} from './FormInputs';

type Props = {
  value: string;
  onChange: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>;
};

export const AmountInput = ({value, onChange}: Props) => {
  return (
    <TextInput
      label="Amount"
      type="number"
      name="amount"
      placeholder="If blank, a random amount is used"
      inputProps={{
        min: '1',
        max: '1000',
        pattern: 'd*',
      }}
      size="small"
      value={value}
      onChange={onChange}
    />
  );
};
