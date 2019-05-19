import React, { ChangeEvent } from 'react';
import { Toggle } from '@storybook/components';
import { FieldProps } from '../ChangeProp';

export const BooleanField = (props: FieldProps) => {
  const { prop, changeProp } = props;
  return (
    <Toggle
      type="checkbox"
      initialValue={prop.value === true || prop.value === 'true' ? 'true' : 'false'}
      onChange={(e: ChangeEvent<HTMLInputElement>) => {
        // Input values always return a string. Here we convert it back to a boolean.
        const checked = e.target.value === 'true';
        changeProp(checked);
      }}
    />
  );
};
