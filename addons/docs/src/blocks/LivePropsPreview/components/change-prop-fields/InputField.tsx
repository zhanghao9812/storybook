import { Form } from '@storybook/components';
import React, { ChangeEvent } from 'react';
import { FieldProps } from '../ChangeProp';

interface InputFieldProps extends FieldProps {
  type?: string;
}

export const InputField = (props: InputFieldProps) => {
  const { prop, changeProp, type } = props;

  return (
    <Form.Input
      type={type || 'text'}
      defaultValue={prop.value}
      onChange={(e: ChangeEvent<HTMLInputElement>) => {
        changeProp(e.target.value);
      }}
    />
  );
};
