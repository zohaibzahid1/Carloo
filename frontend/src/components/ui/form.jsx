import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';

const Form = ({ children, ...props }) => {
  return <form {...props}>{children}</form>;
};

const FormField = ({ name, control, render }) => {
  return (
    <Controller
      name={name}
      control={control}
      render={render}
    />
  );
};

const FormItem = ({ children }) => {
  return <div className="space-y-2">{children}</div>;
};

const FormLabel = ({ children, ...props }) => {
  return (
    <label className="block text-sm font-medium text-carloo-500" {...props}>
      {children}
    </label>
  );
};

const FormControl = ({ children }) => {
  return <div className="mt-1">{children}</div>;
};

const FormMessage = ({ children }) => {
  return <p className="text-sm text-red-500">{children}</p>;
};

const FormDescription = ({ children }) => {
  return <p className="text-sm text-carloo-500">{children}</p>;
};

export {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription
}; 