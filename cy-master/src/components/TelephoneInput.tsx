"use client";

import React from "react";

interface TelephoneInputProps {
  id: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  /** If true, stores value as "+92..." for display. If false, stores as "92..." */
  includePrefix?: boolean;
}

const FieldHint: React.FC<{ message: string; type: "success" | "error" }> = ({
  message,
  type,
}) => {
  const colors = { success: "green", error: "red" };
  return (
    <p style={{ color: colors[type], fontSize: "12px", marginTop: "4px" }}>
      {message}
    </p>
  );
};

/**
 * Reusable telephone input component with validation
 * Handles both "+92" prefix (general form) and "92" prefix (other forms)
 */
export const TelephoneInput: React.FC<TelephoneInputProps> = ({
  id,
  value,
  onChange,
  placeholder,
  required = false,
  includePrefix = false,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Remove all non-digits
    let raw = e.target.value.replace(/\D/g, "");

    // Always start with 92
    if (!raw.startsWith("92")) {
      raw = "92";
    }

    // Limit total digits (92 + 10 digits max = 12 total)
    if (raw.length > 12) {
      raw = raw.substring(0, 12);
    }

    // Send with or without + prefix based on includePrefix
    onChange(includePrefix ? "+" + raw : raw);
  };

  // Determine display value and lengths
  const displayValue = includePrefix
    ? value.startsWith("+92")
      ? value
      : "+92"
    : value.startsWith("92")
      ? value
      : "92";

  // For validation messages, we check the actual numeric length
  // "+92" has length 3, "92" has length 2
  const prefixLength = includePrefix ? 3 : 2;
  const totalLength = displayValue.length;
  const digitLength = totalLength - prefixLength; // Digits after country code

  // Error: less than 8 digits after country code (total less than 10)
  const showError = totalLength > prefixLength && totalLength < 10;
  // Success: 8-10 digits after country code (total 10-12)
  const showSuccess =
    totalLength >= 10 &&
    totalLength <= 12 &&
    displayValue.startsWith(includePrefix ? "+92" : "92");

  const defaultPlaceholder = includePrefix
    ? "+923001234567 (minimum 8 digits after +92)"
    : "923001234567 (minimum 8 digits after 92)";

  return (
    <>
      <input
        type="tel"
        id={id}
        value={displayValue}
        onChange={handleChange}
        placeholder={placeholder || defaultPlaceholder}
        required={required}
      />
      {showError && (
        <FieldHint
          type="error"
          message={`Please enter at least 8 digits after country code ${includePrefix ? "+92" : "92"}.`}
        />
      )}
      {showSuccess && (
        <FieldHint
          type="success"
          message="✓ Valid telephone number format"
        />
      )}
    </>
  );
};
