import { useState } from 'react';

const FormInput = ({ 
  label, 
  type, 
  name, 
  value, 
  onChange, 
  error, 
  placeholder 
}) => {
  const [focused, setFocused] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleFocus = () => setFocused(true);
  const handleBlur = () => setFocused(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleInputChange = (e) => {
    let { name, value } = e.target;

    if (name === 'creditcard') {
      value = value.replace(/\D/g, '').substring(0, 16); // ensures only 16 digits, no spaces
    }
    if (name === 'phone') {
      value = value.replace(/\D/g, '').substring(0, 11);
    }

    const newEvent = {
      ...e,
      target: {
        ...e.target,
        name,
        value
      }
    };

    onChange(newEvent);
  };

  return (
    <div
      className={`flex flex-col transition-all duration-200 ${
        focused ? 'border-primary bg-white' : ''
      } ${error ? 'border-red-500 bg-red-50' : ''}`}
    >
      <label className="text-sm font-medium text-gray-700 mb-2">{label}</label>
      <div className="relative flex items-center">
        <input
          type={type === 'password' && passwordVisible ? 'text' : type}
          name={name}
          value={value}
          onChange={handleInputChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={placeholder}
          className={`w-full h-12 px-4 border ${
            error ? 'border-red-500 bg-red-50 focus:ring-red-500/10' : 'border-gray-200'
          } rounded-lg text-base transition-all duration-200 bg-gray-50 text-gray-900
            focus:outline-none focus:border-primary focus:bg-white focus:ring-3 focus:ring-primary/10
            placeholder:text-gray-400`}
        />
        {type === 'password' && (
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute right-3 bg-transparent border-none cursor-pointer text-xs font-semibold text-gray-600 uppercase p-0 hover:text-primary"
          >
            {passwordVisible ? 'Hide' : 'Show'}
          </button>
        )}
      </div>
      {error && (
        <span className="text-red-500 text-xs mt-1 animate-fadeIn">
          {error}
        </span>
      )}
    </div>
  );
};

export default FormInput;
