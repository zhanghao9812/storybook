import React, { ChangeEvent } from 'react';
import { styled, Theme } from '@storybook/theming';

interface ToggleProps {
  labelOn: string;
  valueOn: string;
  labelOff: string;
  valueOff: string;
  name: string;
  initialValue?: string;
  onChange: (value: ChangeEvent) => void;
}

const borderRadius = 30;

const ToggleLabel = styled.label(({ theme }) => ({
  cursor: 'pointer',
  color: theme.color.mediumdark,
  display: 'flex',
  backgroundColor: '#fff',
  fontWeight: theme.typography.weight.bold,
  padding: '6px 16px',
  justifyContent: 'center',
  alignItems: 'center',
  textAlign: 'center',
  transition: '150ms ease-in-out',
  transitionProperty: 'background-color, font-weight',
  width: '50%',

  '&:first-of-type': {
    borderTopLeftRadius: borderRadius,
    borderBottomLeftRadius: borderRadius,
  },
  '&:last-of-type': {
    borderTopRightRadius: borderRadius,
    borderBottomRightRadius: borderRadius,
  },
}));

const VisuallyHiddenInput = styled.input(({ theme }) => ({
  position: 'absolute',
  width: 1,
  height: 1,
  margin: -1,
  border: 0,
  padding: 0,
  clip: 'rect(0 0 0 0)',
  overflow: 'hidden',

  '&:checked + label': {
    background: theme.color.medium,
    color: theme.color.darker,
  },
}));

const ToggleWrapper = styled.div(({ theme }) => ({
  display: 'inline-flex',
  border: `1px solid ${theme.color.medium}`,
  borderRadius,
}));

const Toggle = ({
  labelOn,
  labelOff,
  valueOn,
  valueOff,
  name,
  onChange,
  initialValue,
}: ToggleProps) => {
  const onRadioChange = (ev: ChangeEvent) => {
    if (!onChange) return;

    onChange(ev);
  };

  return (
    <ToggleWrapper>
      <VisuallyHiddenInput
        id={`${name}-on`}
        name={name}
        value={valueOn}
        type="radio"
        onChange={onRadioChange}
        defaultChecked={initialValue === valueOn}
      />
      <ToggleLabel htmlFor={`${name}-on`}>{labelOn}</ToggleLabel>
      <VisuallyHiddenInput
        id={`${name}-off`}
        name={name}
        value={valueOff}
        type="radio"
        onChange={onRadioChange}
        defaultChecked={initialValue === valueOff}
      />
      <ToggleLabel htmlFor={`${name}-off`}>{labelOff}</ToggleLabel>
    </ToggleWrapper>
  );
};

Toggle.displayName = 'Toggle';
Toggle.defaultProps = {
  labelOn: 'True',
  valueOn: 'true',
  labelOff: 'False',
  valueOff: 'false',
  name: 'toggle',
};

export { Toggle };
