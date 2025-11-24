import React from "react";
import { LucideMessageSquareText } from "lucide-react";

const TextAreaField = ({
  label,
  id,
  value,
  onChange,
  placeholder,
  isRTL,
  onHelpMeWrite,
  required = true,
  isAIAssisted = false,
  disabled = false,
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
      <textarea
        id={id}
        rows="4"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder || label}
        required={required}
        disabled={disabled}
        className={`field-textarea ${alignClass} ${error ? "error" : ""}`}
        aria-label={label}
        aria-invalid={!!error}
      />
      {isAIAssisted && (
        <div
          className={`ai-assist-container ${
            isRTL ? "justify-start" : "justify-end"
          }`}
        >
          <button
            type="button"
            onClick={onHelpMeWrite}
            className="ai-assist-button"
            disabled={disabled}
            aria-label={isRTL ? "ساعدني في الكتابة" : "Help Me Write"}
          >
            <span style={{ marginRight: "0.5rem" }}>✏️</span>
            {isRTL ? "ساعدني في الكتابة" : "Help Me Write"}
          </button>
        </div>
      )}
      {error && <span className="field-error">{error}</span>}
    </div>
  );
};

export default TextAreaField;
