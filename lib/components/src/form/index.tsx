import { styled } from '@storybook/theming';
import { Field } from './field/field';
import { Input, Select, Textarea, Button } from './input/input';

export { Toggle } from './toggle/toggle';

export const Form = Object.assign(
  styled.form({
    boxSizing: 'border-box',
    width: '100%',
  }),
  {
    Field,
    Input,
    Select,
    Textarea,
    Button,
  }
);
