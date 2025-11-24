import React from "react";

const SelectField = ({
  label,
  id,
  value,
  onChange,
  options,
  isRTL,
  required = true,
  error = null,
}) => {
  const alignClass = isRTL ? "text-end" : "text-start";

  return (
    <div className="form-field">
      <label
        htmlFor={id}
        className={`field-label ${alignClass}`}
        aria-required={required}
      >
        {label} {required && <span className="required-asterisk">*</span>}
      </label>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        className={`field-select ${alignClass} ${error ? "error" : ""}`}
        aria-label={label}
        aria-invalid={!!error}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      {error && <span className="field-error">{error}</span>}
    </div>
  );
};

export default SelectField;
