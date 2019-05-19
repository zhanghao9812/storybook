import React, { createContext, useState, useEffect, SetStateAction, Dispatch } from 'react';

export interface PropsState {
  [key: string]: {
    hasDefaultValue: boolean;
    value: any;
    type: string;
  };
}

interface PropsContext {
  propsState: PropsState;
  setPropsState: Dispatch<SetStateAction<PropsState>>;
}

interface PropsContextProviderProps {
  children: React.ReactNode;
  initialPropsValue: PropsState;
}

export const PropsContext = createContext<PropsContext | undefined>(undefined);

export const PropsContextProvider = ({
  children,
  initialPropsValue,
}: PropsContextProviderProps) => {
  const [propsState, setPropsState] = useState({});

  useEffect(() => {
    setPropsState(initialPropsValue);
  }, [initialPropsValue]);

  return (
    <PropsContext.Provider value={{ propsState, setPropsState }}>{children}</PropsContext.Provider>
  );
};
