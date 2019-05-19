import React, { useContext } from 'react';
import { styled } from '@storybook/theming';
import { PropsContext } from '../props-context';
import { BooleanField, UnionField, InputField } from './change-prop-fields';

const Flex = styled.div({ display: 'flex', flexDirection: 'column' });

export interface FieldProps {
  prop: {
    value: any;
    hasDefaultValue: boolean;
    type: string;
  };
  changeProp: (values: any) => void;
}

interface ChangePropProps {
  name: string;
}

/**
 * Determines what component should be rendered based on the prop type.
 * Eg a boolean field renders a true / false toggle, and a string renders an input field.
 *
 * Unknown fields render null.
 */
const getField = ({ prop, changeProp }: FieldProps) => {
  if (prop.type === 'boolean' || prop.type === 'bool')
    return <BooleanField prop={prop} changeProp={changeProp} />;

  // If type matches a union selector like: "small" | "large"
  if (prop.type.match(/"(.*?)" \|/)) return <UnionField prop={prop} changeProp={changeProp} />;

  if (prop.type === 'string') return <InputField prop={prop} changeProp={changeProp} />;

  if (prop.type === 'number')
    return <InputField type="number" prop={prop} changeProp={changeProp} />;

  return null;
};

/**
 * Renders a component that can change the prop values.
 * See getField function for possible fields it can render.
 */
export const ChangeProp = (props: ChangePropProps) => {
  const propsContext = useContext(PropsContext);

  if (!propsContext) return null;
  const { name } = props;
  const prop = propsContext.propsState[name];
  const changeProp = (value: any) =>
    propsContext.setPropsState(_props => {
      return {
        ..._props,
        [name]: {
          ..._props[name],
          value,
        },
      };
    });

  if (!prop) return null;

  const field = getField({ prop, changeProp });

  return <Flex>{field}</Flex>;
};
