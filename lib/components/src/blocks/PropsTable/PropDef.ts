import React from 'react';

export interface PropDef {
  name: string;
  type: any;
  required: boolean;
  description?: string;
  defaultValue?: any;
  // Optional element that is injected in the PropRow, this component
  // Can dynamically change the value of the prop. Used in the LivePropsPreview.
  ChangeProp?: React.FC;
}
