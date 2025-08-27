import { FormPageProp } from '@/components/properties/FormPageProp.ts';
import React from 'react';

const FormPage = ({ params }: FormPageProp) => {
  return (
    <div>
      <h1>Form: {params.formName}</h1>
    </div>
  );
};

export default FormPage;
