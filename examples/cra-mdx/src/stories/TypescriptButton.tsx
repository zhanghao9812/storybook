import React from 'react';
import { styled, color, typography } from '@storybook/theming';

interface ButtonProps extends StyledButtonProps {
  onClick?: Function;
  numberOfButtons: number;
  text: string;
}

interface StyledButtonProps {
  variant: 'small' | 'large';
  outline: boolean;
}

const StyledButton = styled.button(({ outline, variant }: StyledButtonProps) => ({
  backgroundColor: outline ? 'white' : color.primary,
  borderRadius: 20,
  border: `1px solid ${color.primary}`,
  cursor: 'pointer',
  color: outline ? color.primary : 'white',
  fontFamily: typography.fonts.base,
  fontSize: variant === 'small' ? typography.size.s3 : typography.size.l3,
  padding: '10px 20px',
  margin: 10,
}));

const TypescriptButton = (props: ButtonProps) => {
  const { variant, outline, numberOfButtons, text } = props;

  const maxNumberOfButtons = numberOfButtons > 15 || numberOfButtons < 0 ? 1 : numberOfButtons;

  return (
    <>
      {Array.from({ length: maxNumberOfButtons })
        .map((_val, index) => index)
        .map(value => (
          <StyledButton key={value} variant={variant} outline={outline}>
            {text}
          </StyledButton>
        ))}
    </>
  );
};

TypescriptButton.defaultProps = {
  numberOfButtons: 1,
  text: 'Click me!',
};

export default TypescriptButton;
