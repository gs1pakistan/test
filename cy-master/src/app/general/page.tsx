"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { TelephoneInput } from "@/components/TelephoneInput";
import "./general.css";

// ─────────────────────────────────────────────
// TYPE DEFINITIONS
// ─────────────────────────────────────────────

interface ContactInfo {
  designation: string;
  title: string;
  firstName: string;
  lastName: string;
  email: string;
  telephone: string;
}

interface FormData {
  formName: string;
  companyName: string;
  streetAddress: string;
  city: string;
  cityOther?: string;
  province: string;
  postCode: string;
  telephone: string;
  email: string;
  ntn: string;
  companyRegNo: string;
  noOfEmployees: string;
  website: string;
  glnRequired: boolean;
  glnAddresses: string[];
  billingRequired: "Yes" | "No";
  billingAddresses: string[];
  ceo: ContactInfo;
  keyContact: ContactInfo;
  accountsContact: ContactInfo;
  selectedCategories: string[];
  selectedTypeofProduct: string[];
  GTINsRequired: string;
  GTIN8sRequired: string;
  GTIN8: string;
  userName: string;
  agreeTerms: boolean;
  uploadedImage: string | null;
  selectedFees: string[];
}

interface ErrorModalProps {
  message: string;
  type: "success" | "error";
  isVisible: boolean;
  onClose: () => void;
}

// ─────────────────────────────────────────────
// CONSTANTS
// ─────────────────────────────────────────────

const PRODUCT_CATEGORIES = [
  "Agricultural", "Bakery Products", " Beverages", "Building Materials",
  "Chemicals", "Cigarettes", "Cleaning Products", "Computer Software",
  "Detergents", "Eggs", "Electric Heaters", "Equipment's", "Food",
  "Fruit Juices", "Confectionery", "Sea Foods", "Snack Foods", "Dairy Products",
  "Industrial Goods", "Mineral water", "Paper & Stationery",
  "Perfume & Cosmetics", "Soaps", "Sports Goods", "Tea", "Tissue Papers",
  "Toiletries", "Rice", "Toys", "Fruits and Vegetables Export", "Other",
];

const PAKISTANI_CITIES = [
  { label: "Cities", isGroup: true },
  "Abbottabad", "Attock", "Badin", "Bagh", "Bahawalnagar", "Bahawalpur",
  "Bannu", "Batkhela", "Bhakkar", "Bhimber", "Burewala", "Chaman",
  "Charsadda", "Chiniot", "Chitral", "Dadu", "Dera Ghazi Khan",
  "Dera Murad Jamali", "Dir", "Faisalabad", "Ghizer", "Ghanche", "Ghotki",
  "Gilgit", "Gojra", "Gwadar", "Gujranwala", "Gujrat", "Hafizabad", "Hangu",
  "Haripur", "Hunza", "Hyderabad", "Islamabad", "Jacobabad", "Jaffarabad",
  "Jaranwala", "Jhang", "Jhelum", "Kalat", "Kamoke", "Karachi", "Karak",
  "Kashmore", "Kasur", "Khairpur", "Khanewal", "Kharan", "Khuzdar", "Kohat",
  "Kot Adu", "Kotli", "Kot Momin", "Lahore", "Lakki Marwat", "Larkana",
  "Lasbela", "Layyah", "Lodhran", "Loralai", "Mandi Bahauddin", "Mansehra",
  "Mardan", "Mastung", "Matiari", "Mianwali", "Mingora", "Mirpur",
  "Mirpur Khas", "Mithi (Tharparkar)", "Multan", "Muridke", "Muzaffarabad",
  "Muzaffargarh", "Nagar", "Narowal", "Nawabshah", "Neelum", "Nowshera",
  "Okara", "Pakpattan", "Panjgur", "Parachinar", "Pasni", "Peshawar",
  "Phalia", "Poonch (Rawalakot)", "Quetta", "Rahim Yar Khan", "Rawalpindi",
  "Sadiqabad", "Sahiwal", "Sanghar", "Sargodha", "Sehwan", "Shakargarh",
  "Shangla", "Sheikhupura", "Shigar", "Shikarpur", "Sibbi", "Sialkot",
  "Skardu", "Sukkur", "Swat", "Tando Adam", "Tando Allahyar", "Tank",
  "Thatta", "Toba Tek Singh", "Turbat", "Umerkot", "Vehari", "Washuk", "Zhob",
  { label: "If your city is not listed, select Other and enter", isGroup: true },
  "Other",
];

const ANNUAL_FEE_OPTIONS = [
  { id: "1 GLN",     label: "1 GTIN-13 / GLN",  base: "PKR 8,723",  tax: "PKR 1,396", total: "PKR 10,119" },
  { id: "10 GTINs",  label: "10 GTIN-13s",       base: "PKR 8,723",  tax: "PKR 1,396", total: "PKR 10,119" },
  { id: "100 GTINs", label: "100 GTIN-13s",      base: "PKR 13,957", tax: "PKR 2,233", total: "PKR 16,190" },
  { id: "300 GTINs", label: "300 GTIN-13s",      base: "PKR 17,446", tax: "PKR 2,791", total: "PKR 20,238" },
  { id: "500 GTINs", label: "500 GTIN-13s",      base: "PKR 26,168", tax: "PKR 4,188", total: "PKR 30,355" },
  { id: "1000 GTINs",label: "1,000 GTIN-13s",   base: "PKR 34,891", tax: "PKR 5,583", total: "PKR 40,474" },
];

const ENTRANCE_FEE_ROWS = [
  { label: "For 10 GTIN-13s", base: "PKR 20,934", tax: "PKR 3,349", total: "PKR 24,284" },
  { label: "Above 10 GTIN-13s (50% of Normal Entrance Fee)", base: "PKR 41,870", tax: "PKR 6,699", total: "PKR 48,569" },
  { label: "For 1 GTIN-13s / GLN", base: "PKR 20,934", tax: "PKR 3,349", total: "PKR 24,284" },
];

const INITIAL_FORM_STATE: FormData = {
  formName: "General Form",
  companyName: "",
  streetAddress: "",
  city: "",
  cityOther: undefined,
  province: "",
  postCode: "",
  telephone: "",
  email: "",
  ntn: "",
  companyRegNo: "",
  noOfEmployees: "",
  website: "",
  glnRequired: false,
  glnAddresses: [],
  billingRequired: "No",
  billingAddresses: [],
  ceo: { designation: "CEO", title: "Mr.", firstName: "", lastName: "", email: "", telephone: "" },
  keyContact: { designation: "", title: "Mr.", firstName: "", lastName: "", email: "", telephone: "" },
  accountsContact: { designation: "", title: "Mr.", firstName: "", lastName: "", email: "", telephone: "" },
  selectedCategories: [],
  selectedTypeofProduct: [],
  GTINsRequired: "10",
  GTIN8sRequired: "no",
  GTIN8: "",
  userName: "",
  agreeTerms: false,
  uploadedImage: null,
  selectedFees: [],
};

// ─────────────────────────────────────────────
// VALIDATION HELPERS
// ─────────────────────────────────────────────

const isValidEmail = (value: string): boolean =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

const isValidTelephone = (value: string): boolean =>
  value.startsWith("+92") && value.length >= 10 && value.length <= 13;

const isValidWebsite = (value: string): boolean =>
  value === "" || (value.startsWith("www.") && value.length > 6);

// ─────────────────────────────────────────────
// REUSABLE SUB-COMPONENTS
// ─────────────────────────────────────────────

/** Inline success/error hint shown below inputs */
const FieldHint: React.FC<{ message: string; type: "success" | "error" | "warning" }> = ({ message, type }) => {
  const colors = { success: "green", error: "red", warning: "orange" };
  return (
    <p style={{ color: colors[type], fontSize: "12px", marginTop: "4px" }}>
      {message}
    </p>
  );
};

/** Email input with live validation hints */
const EmailInput: React.FC<{
  id: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}> = ({ id, value, onChange, placeholder = "example@company.com" }) => {
  const sanitize = (raw: string) => {
    let v = raw.toLowerCase().replace(/\s/g, "").replace(/[^a-z0-9@._-]/g, "");
    const atCount = (v.match(/@/g) || []).length;
    if (atCount > 1) {
      const parts = v.split("@");
      v = parts[0] + "@" + parts.slice(1).join("");
    }
    v = v.replace(/\.{2,}/g, ".");
    if (v.startsWith("@") || v.startsWith(".")) v = v.substring(1);
    return v;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > 254) return;
    onChange(sanitize(e.target.value));
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    onChange(e.target.value.replace(/\.+$/, ""));
  };

  const domain = value.includes("@") ? value.split("@")[1] : "";
  const tld = domain?.split(".").pop() ?? "";
  const isFullyValid =
    /^[a-z0-9._-]+@[a-z0-9-]+\.[a-z]{2,}$/.test(value) &&
    !value.includes("..") &&
    value.length >= 5 &&
    value.length <= 254;

  return (
    <>
      <input
        type="email"
        id={id}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        onKeyDown={(e) => { if (e.key === " " || e.keyCode === 32) e.preventDefault(); }}
        placeholder={placeholder}
        maxLength={254}
        required
      />
      {value && (
        <>
          {!value.includes("@") && <FieldHint type="error" message="Email must contain @ symbol." />}
          {(value.match(/@/g) || []).length > 1 && <FieldHint type="error" message="Email must contain only one @ symbol." />}
          {value.includes("@") && value.split("@")[0].length === 0 && <FieldHint type="error" message="Email must have a username before @ symbol." />}
          {value.includes("@") && (!domain || domain.length === 0) && <FieldHint type="error" message="Email must have a domain after @ symbol." />}
          {value.includes("@") && domain && !domain.includes(".") && <FieldHint type="error" message="Domain must contain at least one dot (e.g., gs1pk.org)." />}
          {value.includes("..") && <FieldHint type="error" message="Email cannot contain consecutive dots." />}
          {value.includes("@") && domain?.includes(".") && tld.length > 0 && (tld.length < 2 || !/^[a-z]+$/.test(tld)) && <FieldHint type="error" message="Domain extension must be at least 2 letters." />}
          {value.endsWith("@") && <FieldHint type="error" message="Please complete the email address with domain name." />}
          {value.length > 240 && <FieldHint type="warning" message={`${254 - value.length} characters remaining`} />}
          {isFullyValid && <FieldHint type="success" message="✓ Valid email format" />}
        </>
      )}
    </>
  );
};

/** First / Last name input with standard formatting & validation */
const NameInput: React.FC<{
  id: string;
  value: string;
  onChange: (value: string) => void;
  label?: string;
}> = ({ id, value, onChange, label }) => {
  const format = (raw: string) => {
    let v = raw.replace(/[^a-zA-Z\s\-]/g, "").substring(0, 35);
    v = v.replace(/\s+/g, " ");
    v = v.replace(/\b\w/g, (c) => c.toUpperCase());
    if (v.startsWith(" ") || v.startsWith("-")) v = v.substring(1);
    return v;
  };

  const isValid =
    value.length >= 2 &&
    /^[a-zA-Z]+[\sa-zA-Z\-]*[a-zA-Z]$/.test(value) &&
    !/\s{2,}/.test(value);

  return (
    <>
      <input
        type="text"
        id={id}
        value={value}
        aria-label={label}
        onChange={(e) => onChange(format(e.target.value))}
        onBlur={(e) => onChange(e.target.value.replace(/[\s\-]+$/, ""))}
        maxLength={35}
        pattern="[a-zA-Z\s\-]*"
        title="Only letters, spaces, and hyphens are allowed. Maximum 35 characters."
        required
      />
      {value && isValid && <FieldHint type="success" message="✓ Valid format" />}
      {value && value.length === 1 && <FieldHint type="error" message="Please write your complete name." />}
    </>
  );
};

/** Reusable contact block used in Steps 3, 4, 5 */
const ContactBlock: React.FC<{
  contactKey: keyof Pick<FormData, "ceo" | "keyContact" | "accountsContact">;
  contact: ContactInfo;
  onChange: (field: keyof ContactInfo, value: string) => void;
  designationOptions?: string[];
}> = ({ contactKey, contact, onChange, designationOptions }) => {
  const isCeo = contactKey === "ceo";

  return (
    <div className="form-grid">
      {/* Designation */}
      <div className="form-group">
        <label>Designation *</label>
        {isCeo ? (
          <select value={contact.designation} onChange={(e) => onChange("designation", e.target.value)} required>
            <option value="CEO">CEO</option>
            <option value="Managing Director">Managing Director</option>
            <option value="Proprietor">Proprietor</option>
          </select>
        ) : (
          <input
            type="text"
            value={contact.designation}
            onChange={(e) => {
              if (e.target.value.length <= 50) onChange("designation", e.target.value);
            }}
            maxLength={50}
            required
          />
        )}
      </div>

      {/* Title */}
      <div className="form-group">
        <label>Title *</label>
        <select value={contact.title} onChange={(e) => onChange("title", e.target.value)} required>
          <option value="Mr.">Mr.</option>
          <option value="Mrs.">Mrs.</option>
          <option value="Ms.">Ms.</option>
          <option value="Dr.">Dr.</option>
        </select>
      </div>

      {/* First Name */}
      <div className="form-group">
        <label>First Name *</label>
        <NameInput
          id={`${contactKey}-firstName`}
          value={contact.firstName}
          onChange={(v) => onChange("firstName", v)}
        />
      </div>

      {/* Last Name */}
      <div className="form-group">
        <label>Last Name *</label>
        <NameInput
          id={`${contactKey}-lastName`}
          value={contact.lastName}
          onChange={(v) => onChange("lastName", v)}
        />
      </div>

      {/* Email */}
      <div className="form-group">
        <label>Email *</label>
        <EmailInput
          id={`${contactKey}-email`}
          value={contact.email}
          onChange={(v) => onChange("email", v)}
          placeholder="example@company.com"
        />
      </div>

      {/* Telephone */}
      <div className="form-group">
        <label>Mobile or Telephone Number *</label>
        <TelephoneInput
          id={`${contactKey}-telephone`}
          value={contact.telephone}
          onChange={(v) => onChange("telephone", v)}
          includePrefix={true}
        />
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────
// ERROR MODAL
// ─────────────────────────────────────────────

const ErrorModal: React.FC<ErrorModalProps> = ({ message, isVisible, type, onClose }) => {
  useEffect(() => {
    if (!isVisible) return;
    document.body.style.overflow = "hidden";
    const modal = document.querySelector(".error-message-modal") as HTMLElement;
    if (modal) modal.focus();
    return () => { document.body.style.overflow = ""; };
  }, [isVisible]);

  useEffect(() => {
    const onEscape = (e: KeyboardEvent) => { if (e.key === "Escape" && isVisible) onClose(); };
    document.addEventListener("keydown", onEscape);
    return () => document.removeEventListener("keydown", onEscape);
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  return (
    <div
      className={`error-message-overlay ${type}`}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="error-title"
      aria-describedby="error-description"
    >
      <div className="error-message-modal" onClick={(e) => e.stopPropagation()} tabIndex={-1}>
        <button className="error-close-btn" onClick={onClose} aria-label="Close error message" type="button">×</button>

        <div className="error-icon-container">
          <div className="error-icon">{type === "success" ? "✔" : "⚠"}</div>
        </div>

        {type === "success" && (
          <div id="success-message" className="success-message">
            <h2>Form submitted successfully!</h2>
            <ul className="success-points">
              <li>A copy of your application will be emailed to you within an hour—please check your inbox.</li>
              <li>After reviewing your application, you will receive an invoice shortly.</li>
              <li>Please complete the payment and share proof of payment with us.</li>
              <li>Your application will remain on hold until the payment is confirmed.</li>
            </ul>
          </div>
        )}

        {type === "error" && <h2 id="error-title" className="error-title">Alert</h2>}

        <div id="error-description" className="error-message-text">{message}</div>
        <button className="error-action-btn" onClick={onClose} type="button">Got it, thanks!</button>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────
// TERMS & CONDITIONS TEXT
// ─────────────────────────────────────────────

const TERMS_ITEMS = [
  { title: "1. Grant of License", body: "GS1 Pakistan grants You a non-exclusive nontransferable license to use the GS1 company prefix in connection with the supply and sale of your products." },
  { title: "2. Term", body: "The License and these terms and conditions come into effect for You on the date on which GS1 Pakistan notifies You of its acceptance of your GS1 Company Prefix License and GS1 Pakistan Membership and continues until terminated as provided in clause 9." },
  { title: "3. Fees", body: "You must pay the Membership Fee to GS1 annually within 30 days of the date of GS1s invoice. GS1 may, from time to time, increase the Membership Fee. Where products bearing the GS1 identification numbers issued to You, as well as GS1 identification numbers associated with locations are already in the marketplace at the time the License is terminated, not with standing such termination, you will remain liable for a fee equivalent to the then current Membership Fee for the period that You continue to distribute those Products." },
  { title: "4. Consent", body: "Members understand and agree that its Data is shared by GS1 Pakistan with data recipients through both local and global GS1 services." },
  { title: "5. Warranties", body: "The Member represents and warrants that its Data: Originates from, is authorized or approved(validated) by the Member. Does not violate any third-party rights, including privacy rights, copyrights, trademarks, patents or other intellectual property rights of any third party, or violates any applicable laws or regulations, Does not contain any virus, Trojans, worms, logic bombs or any other materials which are malicious or technologically harmful." },
  { title: "6. Data Quality", body: null, hasLink: true },
  { title: "7. Remedial Action", body: "If GS1 Pakistan, in its sole discretion, suspects or believes that Data is submitted to or published in GS1 Activate Solution in violation of this agreement (e.g. it violates a third party intellectual property rights), it may take appropriate remedial action (including, without limitation, by temporarily suspending the availability of or definitively removing the said Data from the GS1 Activate and GS1 Registry Platform)." },
  { title: "8. Designees", body: "If Member acts on behalf of (e.g. as an agent, distributor, content provider) a Principal Member (e.g. a manufacturer) to create, maintain, manage and/or deliver its Principal Member Data, Member must be able to demonstrate its authority to provide Principal Member Data for the purpose and grant the license set out in this agreement at all times and on GS1 Pakistan first request." },
  { title: "9. Warranty Disclaimer", body: "GS1 Pakistan makes no warranties, express or implied, and GS1 specifically disclaims any warranty of merchantability or fitness for a particular purpose. GS1 Pakistan does not guarantee that the GS1 Numbers will meet \"all requirements\" of Your business." },
  { title: "10. Your Conduct", body: "You must not at any time during the term of the Membership and License, or after its termination, do or omit to do anything whereby GS1's goodwill or reputation may be prejudicially affected or brought into disrepute. You must comply with the technical standards set out in the GS1 Pakistan manuals/guidelines and such other directions as GS1 may give from time to time." },
  { title: "11. Use of the GS1 Numbers", body: "You must only use the GS1 numbers issued to You in connection with the manufacture, sale and identification of Your Products/Locations. You must not alter the GS1 numbers licensed to you in any way; You must not transfer, share, sell, lease, sub‐license or sub‐divide the GS1 numbers and permit them to be used by anyone else. You must recognize GS1 Pakistan's title to the GS1 numbers and related intellectual property and must not at any time do or allow to be done any act or thing which may in any way impair GS1's rights in regard to GS1 numbers or related intellectual property." },
  { title: "12. Indemnity", body: "Member shall fully indemnify, hold harmless and defend GS1 Pakistan, GS1 AISBL, as well as any GS1 Member Organization from and against all claims, actions, damages, liabilities, obligations, losses, settlements, judgments, costs and expenses (including reasonable attorneys' fees and costs), brought by any consumer, government agency or other third party which arise out of, relate to or result from: Any allegation that any use, publication or distribution of Member Data infringes any patent, copyright, trademark, database right or other intellectual property right. Any breach or alleged breach of this agreement or any applicable laws or regulations by Member and/or its Authorized Users; and/or Any allegation that any Member Data has been made available in breach of the Member warranties given herein." },
  { title: "13. Limitation of Liability", body: "To the full extent permitted by law, GS1 Pakistan excludes all liability in connection with this License for any indirect or consequential loss or damage, including lost profits and revenue. To the full extent permitted by law, GS1 Pakistan's total liability to You for loss or damage of any kind arising out of this License which is not excluded by clause 13 is limited, for any and all claims, to the total License Fee paid during the 12‐month period prior to the relevant liability accruing. Members shall be liable for the data it shares in GS1 Activate. To the fullest extent permitted by law, neither GS1 Pakistan, GS1 AISBL nor any other GS1 Member Organization shall be liable to a third party for any harm, effects or damages whatsoever, including but not limited to actual, direct, consequential, indirect, incidental or punitive damages, even if advised of the possibility of such damages, arising out of or in relation to the third party's use of Member's Data." },
  { title: "14. Termination", body: "GS1 Pakistan may terminate the license immediately by giving notice if: You fail to pay the Membership Fee by its due date; You commit a breach of Your obligations under these terms and conditions; You are declared bankrupt, go into liquidation, have a receiver or other controller appointed, or (being a company) are wound up otherwise than for the purpose of a reconstruction. Either GS1 Pakistan or You may terminate this Membership Agreement and License in any other circumstances by giving six months' written notice to the other party. Termination of this Membership Agreement and License does not relieve either GS1 or You from liability arising from any prior breach of the terms of this Agreement." },
  { title: "15. Consequences of Termination", body: "On termination of the Membership Agreement, your rights under this Agreement terminate and You must: Immediately cease applying the GS1 Numbers and Barcodes to any of your Products manufactured or sold by You after the termination date, as well as to any locations associated with you and within 30 days, pay to GS1 Pakistan all amounts due to GS1 Pakistan under this License at the termination date. You are not entitled to any rebate or refund of the Membership Fee or any other fees or charges paid under this License, unless this License expressly states otherwise. The termination or expiry of this Agreement does not affect those provisions, which by their nature survive termination, including clause 13 and 14. Notwithstanding termination of the GS1 Pakistan License Agreement, GS1 may retain the data provided by Member. (By default, such data will be shown but marked as no longer updated. Members may however request that GS1 no longer shows the data.)" },
  { title: "16. General Provisions", body: "All notices and other communications in connection with this Membership Agreement and License must be in writing and take effect from the time they are received unless a later time is specified. Notices for You will be sent to the address specified on your Membership application (or such other address as You may notify GS1 Pakistan of from time to time). This Membership Agreement and License is governed by the law in force in Pakistan. Each party submits to the non‐exclusive jurisdiction of the courts of that place." },
];

const TermsAndConditions: React.FC = () => (
  <div className="terms-content">
    {TERMS_ITEMS.map((item) =>
      item.hasLink ? (
        <div key={item.title} className="term-item">
          <strong>{item.title}:</strong> Member understands that Data will be validated against and shall comply with the validation rules [set out in the GS1 General Specifications, available via{" "}
          <a href="https://www.gs1.org/standards/barcodesepcrfid-id-keys/gs1-general-specifications" target="_blank" rel="noopener noreferrer">
            https://www.gs1.org/standards/barcodesepcrfid-id-keys/gs1-general-specifications
          </a>
          , the Global Data Dictionary] and any other technical specifications that may be implemented and/or as amended from time to time. Members shall be responsible for the quality of the data.
        </div>
      ) : (
        <div key={item.title} className="term-item">
          <strong>{item.title}:</strong> {item.body}
        </div>
      )
    )}
  </div>
);

// ─────────────────────────────────────────────
// STEP-LEVEL VALIDATION
// ─────────────────────────────────────────────

function validateStep(
  step: number,
  formData: FormData,
  customCategory: string,
): string[] {
  const errors: string[] = [];

  const requireField = (value: string | undefined, label: string) => {
    if (!value?.trim()) errors.push(`${label} is required`);
  };

  const checkTelephone = (value: string, label: string) => {
    if (!value?.trim()) { errors.push(`${label} is required`); return; }
    if (!isValidTelephone(value)) {
      if (!value.startsWith("92")) errors.push(`${label} must start with country code '92'`);
      else if (value.length < 10) errors.push(`${label} must have at least 08 digits after country code '92'`);
      else errors.push(`Invalid ${label.toLowerCase()} format (e.g., 923001234567)`);
    }
  };

  const checkEmail = (value: string, label: string) => {
    if (!value?.trim()) { errors.push(`${label} is required`); return; }
    if (!isValidEmail(value)) errors.push(`${label} must be a valid email address`);
  };

  const checkName = (value: string, label: string) => {
    if (!value?.trim()) { errors.push(`${label} is required`); return; }
    if (!/^[a-zA-Z\s]+$/.test(value)) errors.push(`${label} should contain only letters and spaces`);
  };

  const validateContactBlock = (contact: ContactInfo, prefix: string) => {
    requireField(contact.designation, `${prefix} Designation`);
    requireField(contact.title, `${prefix} Title`);
    checkName(contact.firstName, `${prefix} First Name`);
    checkName(contact.lastName, `${prefix} Last Name`);
    checkEmail(contact.email, `${prefix} Email`);
    checkTelephone(contact.telephone, `${prefix} Telephone`);
  };

  switch (step) {
    case 1: {
      requireField(formData.companyName, "Company Name");
      requireField(formData.streetAddress, "Street Address");

      const finalCity = formData.city === "Other" ? formData.cityOther : formData.city;
      if (!finalCity?.trim()) errors.push("City is required");
      else if (!/^[a-zA-Z\s]+$/.test(finalCity)) errors.push("City should contain only letters and spaces");

      if (!formData.province) errors.push("Province selection is required");

      if (!formData.postCode?.trim()) errors.push("Postal Code is required");
      else if (!/^\d+$/.test(formData.postCode)) errors.push("Postal Code should contain only numbers");
      else if (formData.postCode.length !== 5) errors.push("Postal Code must be exactly 5 digits long");
      else {
        const postCodeNum = parseInt(formData.postCode, 10);
        if (postCodeNum < 10000 || postCodeNum > 99999) {
          errors.push("Postal Code must be between 10000 and 99999");
        }
      }

      checkTelephone(formData.telephone, "Telephone number");
      checkEmail(formData.email, "Company Email");

      if (!formData.ntn?.trim()) {
        errors.push("NTN field is required");
      } else {
        const ntn = formData.ntn.trim();
        const shortNTN = /^[A-Z0-9]{7}-[A-Z0-9]$/;
        const longNTN = /^[0-9]{5}-[0-9]{7}-[0-9]$/;
        if (!shortNTN.test(ntn) && !longNTN.test(ntn)) {
          if (ntn.length < 9) errors.push("NTN format is invalid. Please enter a complete 8 digits, Use format: AB12345-6");
          else if (ntn.length > 9) errors.push("NTN format is invalid.");
          else errors.push("NTN must be either 9 characters (AB12345-6) or 15 characters (42301-8776868-8)");
        }
      }

      if (!formData.noOfEmployees?.trim()) errors.push("Number of Employees is required");
      else if (parseInt(formData.noOfEmployees) <= 0) errors.push("Number of Employees must be greater than 0");

      if (formData.website !== "" && !isValidWebsite(formData.website)) {
        if (!formData.website.startsWith("www.")) errors.push("Website URL must start with 'www.' (e.g., www.example.com)");
        else if (formData.website.length <= 8) errors.push("Please enter a complete website URL (e.g., www.example.com)");
      }
      break;
    }

    case 2: {
      if (formData.glnRequired) {
        const validAddresses = formData.glnAddresses.filter((a) => a && a !== "-" && a.trim() !== "");
        if (validAddresses.length === 0) {
          errors.push("At least one GLN address is required when GLN is selected as 'Yes'");
        } else {
          formData.glnAddresses.forEach((addr, i) => {
            if (addr && addr !== "-" && addr.trim().length < 10)
              errors.push(`GLN address ${i + 1} must be at least 10 characters long`);
          });
        }
      }
      if (formData.billingRequired === "Yes") {
        const billing = formData.billingAddresses[0];
        if (!billing || billing === "-" || billing.trim() === "")
          errors.push("Billing address is required when separate billing is selected as 'Yes'");
        else if (billing.trim().length < 10)
          errors.push("Billing address must be at least 10 characters long");
      }
      break;
    }

    case 3: validateContactBlock(formData.ceo, "CEO"); break;
    case 4: validateContactBlock(formData.keyContact, "Key Contact"); break;
    case 5: validateContactBlock(formData.accountsContact, "Accounts Contact"); break;

    case 6: {
      if (formData.selectedCategories.length === 0)
        errors.push("At least one product category must be selected");
      if (formData.selectedCategories.includes("Other") && !customCategory.trim())
        errors.push("Please specify your custom category when 'Other' is selected");

      if (formData.GTIN8sRequired === "yes") {
        if (!formData.GTIN8?.trim()) errors.push("Number of GTIN-8s is required when GTIN-8 is selected as 'Yes'");
        else if (isNaN(parseInt(formData.GTIN8)) || parseInt(formData.GTIN8) < 10)
          errors.push("Minimum 10 GTIN-8s are required");
      } else if (formData.GTIN8sRequired === "no") {
        if (formData.selectedFees.length === 0)
          errors.push("Please select the required number of GTIN from the fee structure table");
      } else {
        errors.push("Please select whether you require GTIN-8");
      }
      break;
    }

    case 7: {
      if (!formData.userName?.trim()) errors.push("Authorized Person Full Name is required");
      else if (formData.userName.trim().length < 3) errors.push("Full name must be at least 3 characters long");
      else if (!/^[a-zA-Z\s]+$/.test(formData.userName)) errors.push("Full name should contain only letters and spaces");

      if (!formData.uploadedImage) errors.push("Signature upload is required");
      if (!formData.agreeTerms) errors.push("You must agree to the Terms and Conditions to proceed");
      break;
    }
  }

  return errors;
}

function buildErrorMessage(errors: string[]): string {
  if (errors.length === 1) return errors[0];
  const shown = errors.slice(0, 3);
  let msg = "• " + shown.join("\n• ");
  if (errors.length > 3) msg += `\n• ... and ${errors.length - 3} more error(s)`;
  return msg;
}

// ─────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────

const GeneralForm: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorType, setErrorType] = useState<"error" | "success">("error");
  const [customCategory, setCustomCategory] = useState("");
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM_STATE);
  const [showErrors, setShowErrors] = useState(false);

  // Dropdown states
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const [isCityDropdownOpen, setIsCityDropdownOpen] = useState(false);
  const categoryDropdownRef = useRef<HTMLDivElement>(null);
  const cityDropdownRef = useRef<HTMLDivElement>(null);

  // ── Close dropdowns on outside click ──────────
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (categoryDropdownRef.current && !categoryDropdownRef.current.contains(e.target as Node))
        setIsCategoryDropdownOpen(false);
      if (cityDropdownRef.current && !cityDropdownRef.current.contains(e.target as Node))
        setIsCityDropdownOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // ── Modal helpers ─────────────────────────────
  const showError = (msg: string, type: "error" | "success" = "error") => {
    setErrorMessage(msg);
    setErrorType(type);
    setShowErrorModal(true);
  };
  const hideError = () => { setShowErrorModal(false); setErrorMessage(""); };

  // ── Generic input change handler ──────────────
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  // ── Contact field update ───────────────────────
  const handleContactChange = (
    contactType: keyof Pick<FormData, "ceo" | "keyContact" | "accountsContact">,
    field: keyof ContactInfo,
    value: string,
  ) => {
    setFormData((prev) => ({ ...prev, [contactType]: { ...prev[contactType], [field]: value } }));
  };

  // ── City selection ────────────────────────────
  const handleCitySelect = (city: string) => {
    setFormData((prev) => ({
      ...prev,
      city,
      cityOther: city === "Other" ? "" : undefined,
    }));
    setIsCityDropdownOpen(false);
  };

  // ── Fee toggle (single-select) ────────────────
  const handleFeeToggle = (fee: string) => {
    const sanitizedId = fee.replace(/\s+/g, "-").toLowerCase();
    const row = document.getElementById(`annual-${sanitizedId}`)?.closest("tr");
    row?.classList.add("changing-selection");
    setTimeout(() => {
      setFormData((prev) => ({
        ...prev,
        selectedFees: prev.selectedFees.includes(fee) ? [] : [fee],
      }));
      setTimeout(() => row?.classList.remove("changing-selection"), 300);
    }, 100);
  };

  // ── Image upload ──────────────────────────────
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      showError("Please upload only image files (JPG, PNG, etc.)");
      e.target.value = "";
      return;
    }
    if (file.size > 1024 * 1024) {
      showError("File size must be less than 1MB. Please choose a smaller image.");
      e.target.value = "";
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => setFormData((prev) => ({ ...prev, uploadedImage: reader.result as string }));
    reader.readAsDataURL(file);
  };

  // ── GLN address management ────────────────────
  const handleGlnAddressChange = (index: number, value: string) => {
    const updated = [...formData.glnAddresses];
    updated[index] = value;
    setFormData((prev) => ({ ...prev, glnAddresses: updated }));
  };

  const addGlnAddress = () => {
    if (formData.glnAddresses.length < 20)
      setFormData((prev) => ({ ...prev, glnAddresses: [...prev.glnAddresses, ""] }));
  };

  const removeGlnAddress = (index: number) => {
    const updated = [...formData.glnAddresses];
    updated.splice(index, 1);
    setFormData((prev) => ({ ...prev, glnAddresses: updated }));
  };

  // ── Category selection ────────────────────────
  const handleCategoryChange = (category: string) => {
    if (category === "Other") {
      if (formData.selectedCategories.includes("Other")) {
        setFormData((prev) => ({
          ...prev,
          selectedCategories: prev.selectedCategories.filter(
            (c) => c !== "Other" && PRODUCT_CATEGORIES.includes(c),
          ),
        }));
        setCustomCategory("");
      } else {
        setFormData((prev) => ({ ...prev, selectedCategories: [...prev.selectedCategories, "Other"] }));
      }
    } else {
      setFormData((prev) => ({
        ...prev,
        selectedCategories: prev.selectedCategories.includes(category)
          ? prev.selectedCategories.filter((c) => c !== category)
          : [...prev.selectedCategories, category],
      }));
    }
  };

  const handleCustomCategoryChange = (value: string) => {
    setCustomCategory(value);
    if (!formData.selectedCategories.includes("Other")) return;
    const predefined = formData.selectedCategories.filter((c) => PRODUCT_CATEGORIES.includes(c));
    setFormData((prev) => ({
      ...prev,
      selectedCategories: value.trim() ? [...predefined, value.trim()] : [...predefined, ""],
    }));
  };

  // ── Navigation ────────────────────────────────
  const nextStep = () => {
    const errors = validateStep(currentStep, formData, customCategory);
    if (errors.length === 0 && currentStep < 7) {
      setShowErrors(false);
      setCurrentStep((s) => s + 1);
    } else {
      setShowErrors(true);
      showError(buildErrorMessage(errors));
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      const prevStepNum = currentStep - 1;
      setCurrentStep(prevStepNum);

      // Immediately validate the previous step to show any errors
      const errors = validateStep(prevStepNum, formData, customCategory);
      if (errors.length > 0) {
        setShowErrors(true);
      } else {
        setShowErrors(false);
      }
    }
  };

  // ── Submit ────────────────────────────────────
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate ALL steps before submission (not just current step)
    const allErrors: string[] = [];
    for (let step = 1; step <= 7; step++) {
      const stepErrors = validateStep(step, formData, customCategory);
      if (stepErrors.length > 0) {
        allErrors.push(`Step ${step}:`);
        allErrors.push(...stepErrors.map((err) => `  • ${err}`));
      }
    }

    if (allErrors.length > 0) {
      setShowErrors(true);
      showError("Cannot submit - Please fix all validation errors:\n\n" + allErrors.join("\n"));

      // Navigate to first step with errors
      for (let step = 1; step <= 7; step++) {
        if (validateStep(step, formData, customCategory).length > 0) {
          setCurrentStep(step);
          break;
        }
      }
      return;
    }

    const scriptURL = process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL;
    if (!scriptURL) { showError("Configuration error. Please contact support."); return; }

    setIsSubmitting(true);
    const finalFormData = {
      ...formData,
      city: formData.city === "Other" ? formData.cityOther : formData.city,
    };

    // Optimistic UI: show success and reset immediately
    showError("Further details are in the email.", "success");
    setFormData(INITIAL_FORM_STATE);
    setCurrentStep(1);
    setShowErrors(false);
    setIsSubmitting(false);

    // Fire-and-forget background submission
    fetch(scriptURL, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(finalFormData),
    }).catch((err) => console.error("Background submission error:", err));
  };

  // ─────────────────────────────────────────────
  // STEP RENDERERS
  // ─────────────────────────────────────────────

  const renderStep1 = () => (
    <div className="step-content">
      <h2>Company Information</h2>
      <div className="form-grid">
        <input type="hidden" name="formName" value={formData.formName} />

        {/* Company Name */}
        <div className="form-group">
          <label htmlFor="companyName">Company Name *</label>
          <input
            type="text"
            id="companyName"
            name="companyName"
            value={formData.companyName}
            onChange={(e) => {
              let v = e.target.value;
              if (v.length > 120) return;
              v = v.replace(/^\s+/, "").replace(/\s+/g, " ");
              v = v.replace(/[^\p{L}0-9&.,\-(),'\s]/gu, "");
              v = v.replace(/\s*&\s*/g, " & ").replace(/\s+/g, " ");
              if (v.length > 0) {
                if (!/^[\p{L}0-9]/u.test(v.charAt(0))) v = v.replace(/^[^\p{L}0-9]+/u, "");
                v = v.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase());
                v = v
                  .replace(/\b(pvt)\s+(ltd)\b/gi, "(Pvt) Ltd")
                  .replace(/\bsmc-pvt\s+ltd\b/gi, "SMC-Pvt Ltd")
                  .replace(/\bcompany\s+ltd\b/gi, "Company Ltd")
                  .replace(/\bcorporation\b/gi, "Corporation")
                  .replace(/\bltd\b/gi, "Ltd")
                  .replace(/\bpvt\b/gi, "Pvt")
                  .replace(/\bllc\b/gi, "LLC")
                  .replace(/\bllp\b/gi, "LLP")
                  .replace(/\binc\b/gi, "Inc")
                  .replace(/\bcorp\b/gi, "Corp")
                  .replace(/\bco\b/gi, "Co");
              }
              setFormData((prev) => ({ ...prev, companyName: v }));
            }}
            onBlur={(e) => {
              const v = e.target.value.trim().replace(/[^\p{L}0-9]+$/u, "");
              setFormData((prev) => ({ ...prev, companyName: v }));
            }}
            maxLength={120}
            required
          />
          <p className="under-inputbox">Note: Ensure the company name matches NTN.</p>
          {formData.companyName && (
            <>
              {formData.companyName.length >= 3 &&
                formData.companyName.length <= 120 &&
                /^[\p{L}0-9]/u.test(formData.companyName.charAt(0)) &&
                /[\p{L}0-9.]$/u.test(formData.companyName) &&
                !/\s{2,}/.test(formData.companyName) && (
                  <FieldHint type="success" message="✓ Your formatting is correct." />
                )}
              {formData.companyName.length < 3 && (
                <FieldHint type="error" message="Company name must be at least 3 characters long." />
              )}
              {formData.companyName.length > 0 && !/^[\p{L}0-9]/u.test(formData.companyName.charAt(0)) && (
                <FieldHint type="error" message="Company name must start with a letter or number." />
              )}
              {/\s{2,}/.test(formData.companyName) && (
                <FieldHint type="error" message="Avoid multiple spaces between words." />
              )}
            </>
          )}
        </div>

        {/* Street Address */}
        <div className="form-group">
          <label htmlFor="streetAddress">Street Address *</label>
          <input
            type="text"
            id="streetAddress"
            name="streetAddress"
            value={formData.streetAddress}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              let v = e.target.value;
              if (v.length > 200) return;
              v = v.replace(/[^a-zA-Z0-9\s#\-/,]/g, "").replace(/\./g, "");
              if (v && !/^[a-zA-Z0-9]/.test(v)) v = v.replace(/^[^a-zA-Z0-9]+/, "");
              v = v.replace(/\b\w+/g, (w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase());
              v = v.replace(/\s*,\s*/g, ", ").replace(/\s+/g, " ").replace(/,{2,}/g, ",");
              setFormData((prev) => ({ ...prev, streetAddress: v }));
            }}
            onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
              let v = e.target.value.trim();
              if (v && !v.endsWith(".")) v += ".";
              setFormData((prev) => ({ ...prev, streetAddress: v }));
            }}
            placeholder="Office# 123, Main Street, Block A"
            maxLength={200}
            required
          />
          <p className="under-inputbox">Allowed characters: #, -, /, and , (comma).</p>
        </div>

        {/* City */}
        <div className="form-group">
          <label htmlFor="city">City *</label>
          {formData.city === "Other" ? (
            <input
              type="text"
              id="city"
              name="city"
              value={formData.cityOther || ""}
              onChange={(e) => {
                let v = e.target.value.replace(/[^a-zA-Z\s]/g, "");
                if (v.length > 0) v = v.charAt(0).toUpperCase() + v.slice(1).toLowerCase();
                setFormData((prev) => ({ ...prev, cityOther: v }));
              }}
              placeholder="Enter your city name"
              required
            />
          ) : (
            <div className="custom-city-dropdown" ref={cityDropdownRef}>
              <div className="custom-city-header" onClick={() => setIsCityDropdownOpen((o) => !o)}>
                <span>{formData.city || "Select City"}</span>
                <span className={`dropdown-arrow ${isCityDropdownOpen ? "open" : ""}`}>▼</span>
              </div>
              {isCityDropdownOpen && (
                <div className="custom-city-options">
                  {PAKISTANI_CITIES.map((city, i) =>
                    typeof city === "object" ? (
                      <div key={i} className="city-group-header">{city.label}</div>
                    ) : (
                      <div key={i} className="city-option" onClick={() => handleCitySelect(city)}>{city}</div>
                    )
                  )}
                </div>
              )}
            </div>
          )}
          {formData.city === "Other" && (
            <button
              type="button"
              onClick={() => setFormData((prev) => ({ ...prev, city: "", cityOther: undefined }))}
              style={{ marginTop: "4px", padding: "1px 10px", fontSize: "12px", backgroundColor: "#f0f0f0", border: "1px solid #ccc", borderRadius: "6px", cursor: "pointer" }}
            >
              ← Back to city list
            </button>
          )}
        </div>

        {/* Province */}
        <div className="form-group">
          <label htmlFor="province">State/Province *</label>
          <select id="province" name="province" value={formData.province} onChange={handleInputChange} required>
            <option value="">Select Province</option>
            <option value="Sindh">Sindh</option>
            <option value="Punjab">Punjab</option>
            <option value="Khyber Pakhtunkhwa">Khyber Pakhtunkhwa</option>
            <option value="Balochistan">Balochistan</option>
            <option value="Islamabad">Islamabad Capital Territory</option>
            <option value="Azad Jammu and Kashmir">Azad Jammu and Kashmir (AJK)</option>
            <option value="Gilgit Baltistan">Gilgit Baltistan</option>
          </select>
        </div>

        {/* Postal Code */}
        <div className="form-group">
          <label htmlFor="postCode">Postal Code *</label>
          <input
            type="text"
            id="postCode"
            name="postCode"
            value={formData.postCode}
            onChange={(e) => {
              const v = e.target.value;
              if (/^\d*$/.test(v) && v.length <= 5) setFormData((prev) => ({ ...prev, postCode: v }));
            }}
            maxLength={5}
            required
          />
          {formData.postCode && (
            <>
              {formData.postCode.length < 5 && <FieldHint type="error" message="Postal code must be 5 digits long." />}
              {formData.postCode.length === 5 && (() => {
                const postCodeNum = parseInt(formData.postCode, 10);
                if (postCodeNum < 10000 || postCodeNum > 99999) {
                  return <FieldHint type="error" message="Postal code must be between 10000 and 99999." />;
                }
                return <FieldHint type="success" message="✓ Valid postal code." />;
              })()}
            </>
          )}
        </div>

        {/* Telephone */}
        <div className="form-group">
          <label htmlFor="telephone">Telephone (Including City Codes) *</label>
          <TelephoneInput
            id="telephone"
            value={formData.telephone}
            onChange={(v) => setFormData((prev) => ({ ...prev, telephone: v }))}
            includePrefix={true}
          />
        </div>

        {/* Company Email */}
        <div className="form-group">
          <label htmlFor="email">Company Email *</label>
          <EmailInput
            id="email"
            value={formData.email}
            onChange={(v) => setFormData((prev) => ({ ...prev, email: v }))}
            placeholder="example@company.com"
          />
          <p className="under-inputbox">Please provide the official company email address.</p>
        </div>

        {/* NTN */}
        <div className="form-group">
          <label htmlFor="ntn">Enter your NTN (this field is required) *</label>
          <div className="form-group">
            <input
              type="text"
              id="ntn"
              name="ntn"
              value={formData.ntn}
              onChange={(e) => {
                let v = e.target.value.toUpperCase().replace(/[^A-Z0-9\-]/g, "");
                const digits = v.replace(/[^0-9]/g, "");
                if (/^[0-9]+$/.test(digits) && digits.length > 8) {
                  let f = "";
                  if (digits.length <= 5) f = digits;
                  else if (digits.length <= 12) f = `${digits.slice(0, 5)}-${digits.slice(5)}`;
                  else f = `${digits.slice(0, 5)}-${digits.slice(5, 12)}-${digits.slice(12, 13)}`;
                  v = f.slice(0, 15);
                } else {
                  const clean = v.replace(/[^A-Z0-9]/g, "");
                  v = clean.length <= 7 ? clean : `${clean.slice(0, 7)}-${clean.slice(7, 8)}`;
                  v = v.slice(0, 9);
                }
                setFormData((prev) => ({ ...prev, ntn: v }));
              }}
              placeholder="e.g. AB12345-6"
              required
            />
            <p className="under-inputbox">You must provide your NTN number to proceed with the application.</p>
            {formData.ntn && (
              <>
                <div style={{ marginTop: "6px", height: "6px", backgroundColor: "#e0e0e0", borderRadius: "4px" }}>
                  <div style={{
                    width: `${Math.min((formData.ntn.length / 9) * 100, 100)}%`, height: "100%", borderRadius: "4px",
                    backgroundColor:
                      formData.ntn.length === 9 || formData.ntn.length === 15 ? "#22c55e" : "#ef4444",
                    transition: "width 0.3s ease, background-color 0.3s ease",
                  }} />
                </div>
                {formData.ntn.length === 9 && /^[A-Z0-9]{7}-[A-Z0-9]$/.test(formData.ntn) && (
                  <FieldHint type="success" message="✓ Valid NTN format" />
                )}
                {formData.ntn.length === 15 && /^[0-9]{5}-[0-9]{7}-[0-9]$/.test(formData.ntn) && (
                  <FieldHint type="success" message="✓ Valid CNIC format. Kindly share images of your CNIC (both front and back sides) to info@gs1pk.org" />
                )}
                {formData.ntn.length < 9 && !/^[A-Z0-9]{7}-[A-Z0-9]$/.test(formData.ntn) && (
                  <FieldHint type="error" message="Please enter a complete and valid NTN: 1234567-8" />
                )}
                {formData.ntn.length > 9 && !/^[0-9]{5}-[0-9]{7}-[0-9]$/.test(formData.ntn) && (
                  <FieldHint type="error" message="Exceeds NTN limit. Press Backspace. Valid NTN: 1234567-8 (8 digits only)" />
                )}
              </>
            )}
          </div>
        </div>

        {/* SECP Company Registration */}
        <div className="form-group">
          <label htmlFor="companyRegNo">SECP Company Registration Number</label>
          <input
            type="text"
            id="companyRegNo"
            name="companyRegNo"
            value={formData.companyRegNo}
            onChange={(e) => { if (e.target.value.length <= 30) handleInputChange(e); }}
            maxLength={30}
          />
        </div>

        {/* Number of Employees */}
        <div className="form-group">
          <label htmlFor="noOfEmployees">Number of Employees *</label>
          <input
            type="number"
            id="noOfEmployees"
            name="noOfEmployees"
            value={formData.noOfEmployees}
            onChange={(e) => { if (e.target.value.length <= 20) handleInputChange(e); }}
            maxLength={20}
            required
          />
        </div>

        {/* Website */}
        <div className="form-group">
          <label>Do you have a website?</label>
          <div className="radio-options">
            <label>
              <input
                type="radio"
                name="website"
                value="yes"
                checked={formData.website !== ""}
                onChange={() => setFormData((prev) => ({ ...prev, website: "www." }))}
              />
              Yes
            </label>
            <label>
              <input
                type="radio"
                name="website"
                value="no"
                checked={formData.website === ""}
                onChange={() => setFormData((prev) => ({ ...prev, website: "" }))}
              />
              No, I do not have a website
            </label>
          </div>
          {formData.website !== "" && (
            <div className="form-group">
              <label htmlFor="website">Website</label>
              <input
                type="url"
                id="website"
                name="website"
                value={formData.website}
                onChange={handleInputChange}
                placeholder="www.example.com"
                required
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="step-content">
      <h2 className="text-2xl font-bold mb-6">GLN and Billing Information</h2>

      {/* GLN Section */}
      <div className="gln-section">
        <label className="label">Do you require GLN?</label>
        <p className="fee-description">
          You need a Global Location Number to uniquely identify your company, warehouse, store, or any other location in the GS1 system?
        </p>
        <div className="radio-options">
          {["yes", "no"].map((option) => (
            <label key={option} className="radio-label">
              <input
                type="radio"
                name="glnRequired"
                value={option}
                checked={formData.glnRequired === (option === "yes")}
                onChange={() =>
                  setFormData((prev) => ({
                    ...prev,
                    glnRequired: option === "yes",
                    glnAddresses: option === "yes"
                      ? (prev.glnAddresses.length === 0 || prev.glnAddresses[0] === "-" ? [""] : prev.glnAddresses)
                      : ["-"],
                  }))
                }
                className="radio-input"
              />
              {option.charAt(0).toUpperCase() + option.slice(1)}
            </label>
          ))}
        </div>

        {formData.glnRequired && (
          <div className="gln-addresses">
            <label className="label">
              Please Provide Complete <strong>GLN address</strong> if it is different from above mentioned address
            </label>
            {formData.glnAddresses
              .filter((a) => a !== "-")
              .map((address, i) => (
                <div key={i} className="address-row">
                  <textarea
                    value={address}
                    onChange={(e) => handleGlnAddressChange(i, e.target.value)}
                    placeholder={`Enter address ${i + 1}`}
                    className="address-textarea"
                    rows={3}
                    required
                  />
                  <button type="button" onClick={() => removeGlnAddress(i)} className="remove-btn">−</button>
                </div>
              ))}
            {formData.glnAddresses.length < 20 && (
              <button type="button" onClick={addGlnAddress} className="add-btn">+ Add Address</button>
            )}
            <p className="total-count">
              Total GLNs: {formData.glnAddresses.filter((a) => a !== "-" && a.trim() !== "").length}
            </p>
          </div>
        )}
      </div>

      {/* Billing Section */}
      <div className="gln-section">
        <div className="form-group">
          <label>Do you require a separate Billing Address?</label>
          <p className="fee-description">
            A billing address is the address where invoices and payment-related documents are sent. If your billing address is different from your business or shipping address, you should select Yes and provide the correct billing address details.
          </p>
          <div className="radio-options">
            <label>
              <input
                type="radio"
                name="billingRequired"
                value="yes"
                checked={formData.billingRequired === "Yes"}
                onChange={() =>
                  setFormData((prev) => ({
                    ...prev,
                    billingRequired: "Yes",
                    billingAddresses:
                      prev.billingAddresses[0] === "-" || prev.billingAddresses.length === 0 ? [""] : prev.billingAddresses,
                  }))
                }
              />
              Yes, enter a separate billing address
            </label>
            <label>
              <input
                type="radio"
                name="billingRequired"
                value="no"
                checked={formData.billingRequired === "No"}
                onChange={() => setFormData((prev) => ({ ...prev, billingRequired: "No", billingAddresses: ["-"] }))}
              />
              Same as Company Address
            </label>
          </div>
          {formData.billingRequired === "Yes" && (
            <div className="form-group">
              <label htmlFor="billingAddress">Please Insert Full Billing Address Below</label>
              <textarea
                id="billingAddress"
                name="billingAddress"
                value={formData.billingAddresses[0] === "-" ? "" : formData.billingAddresses[0] || ""}
                onChange={(e) => setFormData((prev) => ({ ...prev, billingAddresses: [e.target.value] }))}
                placeholder="Enter billing address"
                rows={3}
                required
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="step-content">
      <h2>CEO / Managing Director Contact</h2>
      <ContactBlock
        contactKey="ceo"
        contact={formData.ceo}
        onChange={(field, value) => handleContactChange("ceo", field, value)}
      />
    </div>
  );

  const renderStep4 = () => (
    <div className="step-content">
      <h2>Key Contact for GS1 Activate Tool</h2>
      <h3>Kindly enter information of the person responsible for using the GS1 Activate Tool.</h3>
      <ContactBlock
        contactKey="keyContact"
        contact={formData.keyContact}
        onChange={(field, value) => handleContactChange("keyContact", field, value)}
      />
    </div>
  );

  const renderStep5 = () => (
    <div className="step-content">
      <h2>Accounts Contact Information</h2>
      <ContactBlock
        contactKey="accountsContact"
        contact={formData.accountsContact}
        onChange={(field, value) => handleContactChange("accountsContact", field, value)}
      />
    </div>
  );

  const renderStep6 = () => (
    <div className="step-content">
      <h2>Product Information</h2>

      {/* Category Dropdown */}
      <div className="gln-section">
        <div className="form-group">
          <label>Product category that best represents your business *</label>
          <div className={`dropdown-container ${isCategoryDropdownOpen ? "open" : ""}`} ref={categoryDropdownRef}>
            <div className="dropdown-header" onClick={() => setIsCategoryDropdownOpen((o) => !o)}>
              <span>
                {formData.selectedCategories.filter((c) => c !== "Other").length > 0
                  ? `${formData.selectedCategories.filter((c) => c !== "Other").length} categories selected`
                  : "Select categories..."}
              </span>
              <span className="dropdown-arrow">▼</span>
            </div>
            {isCategoryDropdownOpen && (
              <div className="dropdown-options">
                {PRODUCT_CATEGORIES.map((cat) => (
                  <label key={cat} className="dropdown-option">
                    <input
                      type="checkbox"
                      checked={formData.selectedCategories.includes(cat)}
                      onChange={() => handleCategoryChange(cat)}
                    />
                    <span>{cat}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {formData.selectedCategories.includes("Other") && (
            <div className="form-group" style={{ marginTop: "10px" }}>
              <label htmlFor="customCategory">Please specify your category:</label>
              <input
                type="text"
                id="customCategory"
                value={customCategory}
                onChange={(e) => handleCustomCategoryChange(e.target.value)}
                placeholder="Enter your custom category"
                className="form-control"
                style={{ marginTop: "5px" }}
              />
            </div>
          )}

          {formData.selectedCategories.filter((c) => c !== "Other").length > 0 && (
            <div className="selected-categories">
              <small>Selected: {formData.selectedCategories.filter((c) => c !== "Other").join(", ")}</small>
            </div>
          )}
        </div>
      </div>

      {/* GTIN-8 */}
      <div className="gln-section">
        <div className="form-group">
          <label>Do you require GTIN-8?</label>
          <p className="note">
            GTIN-8 numbers encoded in EAN-8 barcode symbols are used on very small retail items (e.g., cigarettes, cosmetics, etc.) where there is insufficient space on the label or package to include an EAN-13 barcode.
          </p>
          <div className="radio-options">
            <label>
              <input type="radio" name="GTIN8sRequired" value="yes" checked={formData.GTIN8sRequired === "yes"} onChange={handleInputChange} />
              Yes
            </label>
            <label>
              <input type="radio" name="GTIN8sRequired" value="no" checked={formData.GTIN8sRequired === "no"} onChange={handleInputChange} />
              No
            </label>
          </div>
          {formData.GTIN8sRequired === "yes" && (
            <div className="form-group">
              <label htmlFor="GTIN8">
                Enter the number of GTIN-8s. Annual fee: Rs. 3,488 per GTIN-8 + 16% PRA (minimum 10 GTIN-8s required).
              </label>
              <input type="number" id="GTIN8" name="GTIN8" value={formData.GTIN8} onChange={handleInputChange} placeholder="Enter a number starting from 10 or higher." required />
            </div>
          )}
        </div>
      </div>

      {/* Fee Tables */}
      <div className="fee-structure">
        <h3>Select the required number of Global Trade Item Numbers (GTINs) below.</h3>

        {/* Entrance Fee */}
        <div className="fee-table">
          <table>
            <thead>
              <tr>
                <th>Entrance Fee (Incl. Govt. Taxes)</th>
                <th>Base Fee</th>
                <th>Tax (16%)</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {ENTRANCE_FEE_ROWS.map((row) => (
                <tr key={row.label}>
                  <td>{row.label}</td>
                  <td>{row.base}</td>
                  <td>{row.tax}</td>
                  <td>{row.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="fee-description">
          (Members availing 50% rate for Entrance Fee will be required to pay the balance amount of Rs.20,934/+16% PRA when applying for Additional Numbers).
        </p>

        {/* Annual Fee */}
        <div className="fee-table">
          <table>
            <thead>
              <tr>
                <th>Select</th>
                <th>Annual Fee (Incl. Govt. Taxes)</th>
                <th>Base Fee</th>
                <th>Tax (16%)</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {ANNUAL_FEE_OPTIONS.map((row) => (
                <tr key={row.id}>
                  <td>
                    <input
                      type="checkbox"
                      id={`annual-${row.id.replace(/\s+/g, "-").toLowerCase()}`}
                      checked={formData.selectedFees.includes(row.id)}
                      onChange={() => handleFeeToggle(row.id)}
                    />
                  </td>
                  <td>{row.label}</td>
                  <td>{row.base}</td>
                  <td>{row.tax}</td>
                  <td>{row.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="fee-description">Annual fees are due from one calendar year after the allocation date.</p>
        <p className="fee-description">Training is mandatory and its cost is included in the amount mentioned above.</p>
        <p className="fee-description">
          From the second year onward, companies are required to pay the annual renewal fee. For example, if you request 300 GTIN-13s, you will need to pay Rs. 68,807/- (Entrance + Annual Fees) for the first year and Rs. 20,238/- in subsequent years.
        </p>
        <p className="fee-description">Note: A late fee charge of 5% will apply to the renewal invoice if payment is made after the due date.</p>
        <p className="fee-description">
          If you are a printer submitting products on behalf of a brand owner or manufacturer, the submission must be accompanied by a letter from that GS1 member accepting the charges.
        </p>
        <p className="fee-description">
          Barcode test reports will be provided within 3–4 working days. The invoice will be issued to the company and the designated contact person.
        </p>
      </div>
    </div>
  );

  const renderStep7 = () => (
    <div className="step-content">
      <h2>Declaration & Signature</h2>

      {/* Terms */}
      <div className="terms-conditions">
        <h3>Terms and Conditions</h3>
        <TermsAndConditions />
        <div className="terms-checkbox-container">
          <input
            type="checkbox"
            id="agreeTerms"
            name="agreeTerms"
            checked={formData.agreeTerms}
            onChange={handleInputChange}
          />
          <label htmlFor="agreeTerms">I agree to all terms and conditions</label>
          {showErrors && !formData.agreeTerms && (
            <p className="error-message-term-condition">⯇ Please agree to the terms and conditions.</p>
          )}
        </div>
      </div>

      {/* Declaration & Name */}
      <div className="gln-section">
        <div className="form-group">
          <div className="declaration">
            <p>
              I/We <strong>{formData.userName || "[Name]"}</strong> hereby confirm that I/We have thoroughly read and fully understood all the Terms and Conditions of GS1 Pakistan, and willingly agree to them in their entirety without any reservations. I/We further affirm that all the information provided is true, accurate, and complete to the best of my/our knowledge and belief.
            </p>
          </div>
          <label htmlFor="userName">Authorized Person Full Name (as per official records) for Terms & Conditions acceptance.</label>
          <input
            type="text"
            id="userName"
            name="userName"
            value={formData.userName}
            onChange={(e) => { if (e.target.value.length <= 90) handleInputChange(e); }}
            placeholder="Enter your full name"
            maxLength={90}
            required
          />
        </div>
      </div>

      {/* Signature Upload */}
      <div className="gln-section">
        <div className="form-group">
          <label htmlFor="uploadedImage">Upload the signature of the authorized person.</label>
          <p className="fee-description">
            Please upload the scanned image or digital copy of the authorized persons signature. The authorized person is someone who has the legal right to sign documents and make decisions on behalf of the company.
            <br /><br />
            <strong>Guidelines for uploading:</strong><br />
            ✅ The file should be clear and readable.<br />
            ✅ Acceptable formats: JPG, PNG.<br />
            ✅ Maximum file size: (less than 1MB).<br />
            ✅ Make sure the signature is of the authorized company representative only.
          </p>
          <input type="file" id="uploadedImage" accept="image/*" onChange={handleImageUpload} required />
          {formData.uploadedImage && (
            <div className="image-preview">
              <Image src={formData.uploadedImage} alt="Signature Preview" width={300} height={100} unoptimized />
            </div>
          )}
        </div>
      </div>
    </div>
  );

  // ─────────────────────────────────────────────
  // STEP ROUTER
  // ─────────────────────────────────────────────

const STEP_RENDERERS: Record<number, () => React.ReactElement | null> = {
    1: renderStep1,
    2: renderStep2,
    3: renderStep3,
    4: renderStep4,
    5: renderStep5,
    6: renderStep6,
    7: renderStep7,
  };

  const STEP_LABELS: Record<number, string> = {
    1: "Company Info",
    2: "GLN & Billing",
    3: "CEO Contact",
    4: "Key Contact",
    5: "Acct. Contact",
    6: "Products",
    7: "Declaration",
  };

  // ─────────────────────────────────────────────
  // RENDER
  // ─────────────────────────────────────────────

  return (
    <div className="form-container">
      {/* Header */}
      <div className="form-header">
        <div className="form-header-title">
          <h1 className="form-header">
            <span className="title-main">GS1 Pakistan </span>
            <span className="title-sub"> General Application Form</span>
          </h1>
        </div>

        {/* Progress Bar */}
        <div className="progress-bar">
          {[1, 2, 3, 4, 5, 6, 7].map((step) => (
            <div
              key={step}
              className={`progress-step ${currentStep >= step ? "active" : ""} ${currentStep === step ? "current" : ""}`}
            >
              <div className="step-number">{step}</div>
              <div className="step-label">{STEP_LABELS[step]}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="registration-form">
        {(STEP_RENDERERS[currentStep] ?? (() => null))()}

        <div className="form-navigation">
          {currentStep > 1 && (
            <button type="button" onClick={prevStep} className="btn-secondary">Previous</button>
          )}
          {currentStep < 7 ? (
            <button type="button" onClick={nextStep} className="btn-next">Next</button>
          ) : (
            <button type="submit" disabled={isSubmitting} className="btn-primary">
              {isSubmitting ? "Submitting..." : "Submit Application"}
            </button>
          )}
        </div>
      </form>

      {/* Error / Success Modal */}
      <ErrorModal
        message={errorMessage}
        type={errorType}
        isVisible={showErrorModal}
        onClose={hideError}
      />
    </div>
  );
};

export default GeneralForm;