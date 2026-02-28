'use client';

interface CompanyNameProps {
  value: string;
  onChange: (value: string) => void;
}

export default function CompanyName({ value, onChange }: CompanyNameProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value;

    if (val.length > 120) {
      return;
    }

    val = val.replace(/^\s+/, '');
    val = val.replace(/\s+/g, ' ');

    const allowedCharsRegex = /^[\p{L}\p{N}&.,\-(),'\s]*$/u;
    if (!allowedCharsRegex.test(val)) {
      val = val.replace(/[^\p{L}\p{N}&.,\-(),'\s]/gu, '');
    }

    val = val.replace(/\s*&\s*/g, ' & ');
    val = val.replace(/\s+/g, ' ');

    if (val.length > 0) {
      if (!/^[\p{L}\p{N}]/u.test(val.charAt(0))) {
        val = val.replace(/^[^\p{L}\p{N}]+/u, '');
      }
      val = val.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase());
      val = val.replace(/\b(pvt)\s+(ltd)\b/gi, '(Pvt) Ltd');
      val = val.replace(/\bsmc-pvt\s+ltd\b/gi, 'SMC-Pvt Ltd');
      val = val.replace(/\bcompany\s+ltd\b/gi, 'Company Ltd');
      val = val.replace(/\bcorporation\b/gi, 'Corporation');
      val = val.replace(/\bltd\b/gi, 'Ltd');
      val = val.replace(/\bpvt\b/gi, 'Pvt');
      val = val.replace(/\bllc\b/gi, 'LLC');
      val = val.replace(/\bllp\b/gi, 'LLP');
      val = val.replace(/\binc\b/gi, 'Inc');
      val = val.replace(/\bcorp\b/gi, 'Corp');
      val = val.replace(/\bco\b/gi, 'Co');
    }

    onChange(val);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    let val = e.target.value.trim();
    // Strip stray trailing punctuation/spaces
    val = val.replace(/[.,\-\s]+$/, '');
    onChange(val);
  };

  return (
    <div className="form-group">
      <label htmlFor="companyName">Company Name *</label>
      <input
        type="text"
        id="companyName"
        name="companyName"
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        required
        maxLength={120}
      />
      <p className='under-inputbox'>Note: Ensure the company name matches NTN.</p>
      {value && (
        <>
          {value.length >= 3 &&
            value.length <= 120 &&
            /^[\p{L}\p{N}]/u.test(value.charAt(0)) &&
            /[\p{L}\p{N}]$/u.test(value) &&
            !/\s{2,}/.test(value) && (
              <p className="successsmessage" style={{ color: 'green', fontSize: '12px', marginTop: '4px' }}>
                ✓ Your formatting is correct.
              </p>
          )}
          {value.length < 3 && (
            <p className="error-message" style={{ color: 'red', fontSize: '12px', marginTop: '4px' }}>
              Company name must be at least 3 characters long.
            </p>
          )}
          {value.length > 120 && (
            <p className="successsmessage" style={{ color: 'green', fontSize: '12px', marginTop: '4px' }}>
              ✓ Your formatting is correct.
            </p>
          )}
          {value.length > 0 && !/^[\p{L}\p{N}]/u.test(value.charAt(0)) && (
            <p className="error-message" style={{ color: 'red', fontSize: '12px', marginTop: '4px' }}>
              Company name must start with a letter or number.
            </p>
          )}
          {/\s{2,}/.test(value) && (
            <p className="error-message" style={{ color: 'red', fontSize: '12px', marginTop: '4px' }}>
              Avoid multiple spaces between words.
            </p>
          )}
        </>
      )}
    </div>
  );
}
