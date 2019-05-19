import React from 'react';
import { styled } from '@storybook/theming';
import { transparentize } from 'polished';
import { PropDef } from './PropDef';

enum PropType {
  Shape = 'shape',
  Union = 'union',
  ArrayOf = 'arrayOf',
  ObjectOf = 'objectOf',
  // Might be overkill to have below proptypes as separate components *shrug*
  Literal = 'literal',
  OneOf = 'enum',
  InstanceOf = 'instanceOf',
  Signature = 'signature',
}

interface PrettyPropTypeProps {
  type: any;
}

interface PrettyPropValProps {
  value: any;
}

interface PropRowProps {
  row: PropDef;
  // FIXME: row options
}

const Name = styled.span({ fontWeight: 'bold' });

const Required = styled.span(({ theme }) => ({
  color: theme.color.negative,
  fontFamily: theme.typography.fonts.mono,
}));

const StyledPropDef = styled.div(({ theme }) => ({
  color:
    theme.base === 'light'
      ? transparentize(0.4, theme.color.defaultText)
      : transparentize(0.6, theme.color.defaultText),
  fontFamily: theme.typography.fonts.mono,
  fontSize: `${theme.typography.size.code}%`,
}));

export const PrettyPropType: React.FunctionComponent<PrettyPropTypeProps> = ({ type }) => {
  const formattedType = type && type.name ? type.name : type;
  return <span>{formattedType}</span>;
};

export const PrettyPropVal: React.FunctionComponent<PrettyPropValProps> = ({ value }) => (
  <span>{value}</span>
);

export const PropRow: React.FunctionComponent<PropRowProps> = ({
  row: { name, type, required, description, defaultValue, ChangeProp },
}) => (
  <tr>
    <td>
      <Name>{name}</Name>
      {required ? <Required title="Required">*</Required> : null}
    </td>
    <td>
      <div>{description}</div>
      <StyledPropDef>
        <PrettyPropType type={type} />
      </StyledPropDef>
    </td>
    <td>{defaultValue === undefined ? '-' : <PrettyPropVal value={defaultValue} />}</td>
    {ChangeProp && (
      <td>
        <ChangeProp />
      </td>
    )}
  </tr>
);
