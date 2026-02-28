'use client';

import { useState } from 'react';

interface TelephoneProps {
  value: string;
  onChange: (value: string) => void;
  label: string;
  id: string;
}

export default function Telephone({ value, onChange, label, id }: TelephoneProps) {
  const [touched, setTouched] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTouched(true);
    let val = e.target.value.replace(/\D/g, '');

    if (val.length === 3 && val.charAt(2) === '0') {
      return;
    }
    if (val.length > 12) {
      val = val.substring(0, 12);
    }
    if (!val.startsWith('92')) {
      val = '92';
    }
    onChange('+' + val);
  };

  return (
    <div className="form-group">
      <label htmlFor={id}>{label}</label>
      <input
        type="tel"
        id={id}
        name={id}
        value={value.startsWith('+92') ? value : '+92'}
        onChange={handleChange}
        placeholder="+923001234567 (minimum 8 digits after 92)"
        required
      />
      {touched && value.length === 3 && (
        <p className="error-message" style={{ color: 'red', fontSize: '12px', marginTop: '4px' }}>
          The first digit after 92 cannot be 0. Please enter digits 1-9.
        </p>
      )}
      {value && value.length > 3 && value.length < 11 && (
        <p className="error-message" style={{ color: 'red', fontSize: '12px', marginTop: '4px' }}>
          Please enter at least 8 digits after country code 92.
        </p>
      )}
      {value && value.length >= 11 && (
        <p className="successs-message" style={{ color: 'green', fontSize: '12px', marginTop: '4px' }}>
          ✓ Valid telephone number format
        </p>
      )}
    </div>
  );
}
