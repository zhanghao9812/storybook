import React from 'react';
import TypescriptButton from './TypescriptButton';
import MDX from './TypescriptButton.stories.mdx';

export const componentMeta = {
  title: 'Module|TypescriptButton',
  decorators: [],
  parameters: { component: TypescriptButton, docs: MDX },
};

export const small = () => <TypescriptButton variant="small" />;
export const large = () => <TypescriptButton variant="large" />;
// eslint-disable-next-line no-underscore-dangle
export const docgenInfo = () => <div>{JSON.stringify(TypescriptButton.__docgenInfo)}</div>;
