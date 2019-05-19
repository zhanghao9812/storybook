import React, { useEffect, ChangeEvent } from 'react';
import { Form } from '@storybook/components';
import { FieldProps } from '../ChangeProp';

export const UnionField = (props: FieldProps) => {
  const { prop, changeProp } = props;
  const selectValues = prop.type.split('|').map(item =>
    item
      .trim()
      .slice(1)
      .slice(0, -1)
  );

  // Set default value or first value on load.
  useEffect(() => {
    changeProp(prop.value || selectValues[0]);
  }, []);

  return (
    <Form.Select
      defaultValue={prop.value}
      onChange={(e: ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        changeProp(value);
      }}
    >
      {selectValues.map(value => (
        <option key={value} value={value}>
          {value}
        </option>
      ))}
    </Form.Select>
  );
};
