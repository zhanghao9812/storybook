import React, { useContext, useState, useEffect } from 'react';
import { PropsTable, PropDef } from '@storybook/components';
import { DocsContext } from '../DocsContext';

import { PropsContextProvider } from './props-context';
import { LiveComponentPreview, ChangeProp } from './components';

interface PropsObject {
  [key: string]: {};
  value: any;
  hasDefaultValue: boolean;
  type: string;
}

const getInitialPropsValues = (props: PropDef[], defaultValues: any) => {
  const initialValues = props.reduce((propsObject: PropsObject, prop: PropDef) => {
    const hasDefaultValue = typeof prop.defaultValue !== 'undefined';

    // The initial value of the coponent can be overriden by passing the defaultValues prop to the
    // <LivePropsPreview> component. If for this prop a value is passed in that object, it ALWAYS
    // overrules the defaultValue the component has by itself.
    const initialValue =
      typeof defaultValues[prop.name] !== 'undefined'
        ? defaultValues[prop.name]
        : prop.defaultValue;

    // eslint-disable-next-line no-param-reassign
    propsObject[prop.name] = {
      value: initialValue,
      hasDefaultValue,
      type: prop.type.name,
    };
    return propsObject;
  }, {});

  return initialValues;
};

const LivePropsPreview = ({ defaultValues = {}, of: Component }: any) => {
  const docs = useContext(DocsContext);
  const [rows, setRows] = useState([]);
  const [propsState, setPropsState] = useState({});

  // Get prop definations and generate props table rows.
  useEffect(() => {
    const parsedProps = docs.getPropDefs(Component).map((prop: any) => {
      // Append the ChangeProp component which is rendered in the PropsTable.
      // eslint-disable-next-line no-param-reassign
      prop.ChangeProp = () => <ChangeProp name={prop.name} />;
      return prop;
    });

    if (parsedProps) {
      setRows(parsedProps);
    }
  }, []);

  // Get initial values of all the props, and set them in the propsState (which is used in the PropsContext).
  useEffect(() => {
    const initialPropsState = getInitialPropsValues(rows, defaultValues);
    setPropsState(initialPropsState);
  }, [rows]);

  return (
    <PropsContextProvider initialPropsValue={propsState}>
      <LiveComponentPreview Component={Component} />
      <PropsTable rows={rows} hasInteractiveProps />
    </PropsContextProvider>
  );
};

export { LivePropsPreview };
