import React from "react";

const InputField = ({
  label,
  id,
  type = "text",
  value,
  onChange,
  placeholder,
  isRTL,
  required = true,
  error = null,
}) => {
  const isNumber = type === "number";
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
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) =>
          onChange(
            isNumber
              ? e.target.value
                ? Number(e.target.value)
                : ""
              : e.target.value
          )
        }
        placeholder={placeholder || label}
        required={required}
        className={`field-input ${alignClass} ${error ? "error" : ""}`}
        aria-label={label}
        aria-invalid={!!error}
      />
      {error && <span className="field-error">{error}</span>}
    </div>
  );
};

export default InputField;
