import React from 'react';

interface FormSub {
   value: string
}

const FormSub = ({ value }: FormSub) => {
   return <div className="auth-form-sub">{value}</div>;
};

export default FormSub;
