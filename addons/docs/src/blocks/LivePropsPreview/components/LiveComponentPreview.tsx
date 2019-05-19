import React, { useContext, useState, useEffect } from 'react';
import { Preview } from '../../Preview';
import { PropsContext } from '../props-context';

interface ComponentProps {
  [key: string]: any;
}

export const LiveComponentPreview = ({ Component }: any) => {
  const propsContext = useContext(PropsContext);
  const propsState = propsContext ? propsContext.propsState : {};

  // Becomes a key-value pair of the props that can be adjusted, and
  // should be passed to the previewed component.
  const [componentProps, setComponentProps] = useState<ComponentProps>({});

  useEffect(() => {
    if (!propsContext) return;

    // Generate initial componentProps values based on the docgen default values
    const props = Object.keys(propsContext.propsState).reduce(
      (_props: ComponentProps, propName: string) => {
        // eslint-disable-next-line no-param-reassign
        _props[propName] = propsContext.propsState[propName].value;
        return _props;
      },
      {}
    );

    setComponentProps(props);
  }, [propsState]);

  return (
    <Preview>
      <Component {...componentProps} />
    </Preview>
  );
};
