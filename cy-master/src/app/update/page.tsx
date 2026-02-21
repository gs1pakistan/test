//Update form page
'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { TelephoneInput } from '@/components/TelephoneInput';
import './update.css';

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
  cityOther?: string,
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
  billingRequired: 'Yes' | 'No';
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

// Error Message Modal Component
interface ErrorModalProps {
  message: string;
  type: 'success' | 'error';
  isVisible: boolean;
  onClose: () => void;
}

const ErrorModal: React.FC<ErrorModalProps> = ({ message, isVisible, type, onClose }) => {
  useEffect(() => {
    if (isVisible) {
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
      // Focus management for accessibility
      const modal = document.querySelector('.error-message-modal') as HTMLElement;
      if (modal) modal.focus();
    } else {
      document.body.style.overflow = '';
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = '';
    };
  }, [isVisible]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isVisible) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
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
      <div
        className="error-message-modal"
        onClick={(e) => e.stopPropagation()}
        tabIndex={-1}
      >
        <button
          className="error-close-btn"
          onClick={onClose}
          aria-label="Close error message"
          type="button"
        >
          ×
        </button>

        <div className="error-icon-container">
          <div className="error-icon">{type === 'success' ? '✔' : '⚠'}</div>
        </div>

        {type === 'success' && (
          <div id="success-message" className="success-message">
            <h2>Form submitted successfully!</h2>
            <ul className="success-points">
              <li>1.A copy of your application will be emailed to you within an hour—please check your inbox.</li>
              <li>2.After reviewing your application, you will receive an invoice shortly.</li>
              <li>3.Please complete the payment and share proof of payment with us.</li>
              <li>4.Your application will remain on hold until the payment is confirmed.</li>
            </ul>
          </div>
        )}

        {type === 'error' && (
          <h2 id="error-title" className="error-title">
            Alert
          </h2>
        )}

        <div id="error-description" className="error-message-text">
          {message}
        </div>

        <button className="error-action-btn" onClick={onClose} type="button">
          Got it, thanks!
        </button>
      </div>
    </div>
  );
};

const categories = [
  'Agricultural',
  'Bakery Products',
  'Beverages',
  'Bed & Linens',
  'Building Materials',
  'Chemicals',
  'Cigarettes',
  'Cleaning Products',
  'Computer Software',
  'Confectionery',
  'Dairy Products',
  'Detergents',
  'Dental Instruments',
  'Eggs',
  'Electric Heaters',
  "Equipment's",
  'Food',
  'Fruit Juices',
  'Hospitals',
  'Sea Foods',
  'Snack Foods',
  'Industrial Goods',
  'Mineral water',
  'Paper & Stationery',
  'Ready Made Garments',
  'Pharmaceuticals',
  'Pharmacy',
  'Perfume & Cosmetics',
  'Surgical Equipments',
  'Textiles',
  'Soaps',
  'Sports Goods',
  'Tea',
  'Tissue Papers',
  'Toiletries',
  'Rice',
  'Toys',
  'Fruits and Vegetables Export',
  'Other',
];
// Cities data array
const pakistaniCities = [
  // Punjab Cities
  // Sindh Cities
  { label: "Cities", isGroup: true },
  "Abbottabad", "Attock", "Badin", "Bagh", "Bahawalnagar", "Bahawalpur", "Bannu", "Batkhela", "Bhakkar", "Bhimber", "Burewala", "Chaman", "Charsadda", "Chiniot", "Chitral", "Dadu", "Dera Ghazi Khan", "Dera Murad Jamali", "Dir", "Faisalabad", "Ghizer", "Ghanche", "Ghotki", "Gilgit", "Gojra", "Gwadar", "Gujranwala", "Gujrat", "Hafizabad", "Hangu", "Haripur", "Hunza", "Hyderabad", "Islamabad", "Jacobabad", "Jaffarabad", "Jaranwala", "Jhang", "Jhelum", "Kalat", "Kamoke", "Karachi", "Karak", "Kashmore", "Kasur", "Khairpur", "Khanewal", "Kharan", "Khuzdar", "Kohat", "Kot Adu", "Kotli", "Kot Momin", "Lahore", "Lakki Marwat", "Larkana", "Lasbela", "Layyah", "Lodhran", "Loralai", "Mandi Bahauddin", "Mansehra", "Mardan", "Mastung", "Matiari", "Mianwali", "Mingora", "Mirpur", "Mirpur Khas", "Mithi (Tharparkar)", "Multan", "Muridke", "Muzaffarabad", "Muzaffargarh", "Nagar", "Narowal", "Nawabshah", "Neelum", "Nowshera", "Okara", "Pakpattan", "Panjgur", "Parachinar", "Pasni", "Peshawar", "Phalia", "Poonch (Rawalakot)", "Quetta", "Rahim Yar Khan", "Rawalpindi", "Sadiqabad", "Sahiwal", "Sanghar", "Sargodha", "Sehwan", "Shakargarh", "Shangla", "Sheikhupura", "Shigar", "Shikarpur", "Sibbi", "Sialkot", "Skardu", "Sukkur", "Swat", "Tando Adam", "Tando Allahyar", "Tank", "Thatta", "Toba Tek Singh", "Turbat", "Umerkot", "Vehari", "Washuk", "Zhob",

  // Other option
  { label: "If your city is not listed, select Other and enter", isGroup: true },
  "Other"
];
const GeneralForm: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorType, setErrorType] = useState<'error' | 'success'>('error');
  const [customCategory, setCustomCategory] = useState('');

  const initialFormState: FormData = {
    formName: 'Update Form',
    companyName: '',
    streetAddress: '',
    city: '',
    province: '',
    postCode: '',
    telephone: '',
    email: '',
    ntn: '',
    companyRegNo: '',
    noOfEmployees: '',
    website: '',
    glnRequired: false,
    glnAddresses: [],
    billingRequired: 'No',
    billingAddresses: [],
    ceo: {
      designation: 'CEO',
      title: 'Mr.',
      firstName: '',
      lastName: '',
      email: '',
      telephone: '',
    },
    keyContact: {
      designation: '',
      title: 'Mr.',
      firstName: '',
      lastName: '',
      email: '',
      telephone: '',
    },
    accountsContact: {
      designation: '',
      title: 'Mr.',
      firstName: '',
      lastName: '',
      email: '',
      telephone: '',
    },
    selectedCategories: [],
    selectedTypeofProduct: [],
    GTINsRequired: '10',
    GTIN8sRequired: 'no',
    GTIN8: '',
    userName: '',
    agreeTerms: false,
    uploadedImage: null,
    selectedFees: [],
  };

  const [formData, setFormData] = useState<FormData>(initialFormState);
  const [showErrors, setShowErrors] = useState(false);

  // Function to show error modal
  const showError = (msg: string, type: 'error' | 'success' = 'error') => {
    setErrorMessage(msg);
    setErrorType(type);
    setShowErrorModal(true);
  };

  const hideError = () => {
    setShowErrorModal(false);
    setErrorMessage('');
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleContactChange = (
    contactType: keyof Pick<FormData, 'ceo' | 'keyContact' | 'accountsContact'>,
    field: keyof ContactInfo,
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      [contactType]: {
        ...prev[contactType],
        [field]: value,
      },
    }));
  };

  // Dropdown states
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Toggle dropdown
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };


useEffect(() => {
  const handleClickOutside = (event: MouseEvent) => {
    if (cityDropdownRef.current && !cityDropdownRef.current.contains(event.target as Node)) {
      setIsCityDropdownOpen(false);
    }
  };

  document.addEventListener('mousedown', handleClickOutside);
  return () => document.removeEventListener('mousedown', handleClickOutside);
}, []); 

  // Add these states at the top of your component (where other useState are)
  const [isCityDropdownOpen, setIsCityDropdownOpen] = useState(false);
  const cityDropdownRef = useRef<HTMLDivElement>(null);

  // City selection handler
  const handleCitySelect = (selectedCity: string) => {
    if (selectedCity === "Other") {
      setFormData({ ...formData, city: selectedCity, cityOther: "" });
    } else {
      setFormData({ ...formData, city: selectedCity, cityOther: undefined });
    }
    setIsCityDropdownOpen(false);
  };
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Enhanced image upload with validation
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Check if file is an image
      if (!file.type.startsWith('image/')) {
        showError('Please upload only image files (JPG, PNG, etc.)');
        e.target.value = ''; // Clear the input
        return;
      }

      // Check file size (1MB = 1024 * 1024 bytes)
      if (file.size > 1024 * 1024) {
        showError('File size must be less than 1MB. Please choose a smaller image.');
        e.target.value = ''; // Clear the input
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          uploadedImage: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddressChange = (index: number, value: string) => {
    const updatedAddresses = [...formData.glnAddresses];
    updatedAddresses[index] = value;
    setFormData((prev) => ({
      ...prev,
      glnAddresses: updatedAddresses,
    }));
  };

  const addAddressField = () => {
    if (formData.glnAddresses.length < 20) {
      setFormData((prev) => ({
        ...prev,
        glnAddresses: [...prev.glnAddresses, ''],
      }));
    }
  };

  const removeAddressField = (index: number) => {
    const updated = [...formData.glnAddresses];
    updated.splice(index, 1);
    setFormData((prev) => ({
      ...prev,
      glnAddresses: updated,
    }));
  };

  // Category handling functions
  const handleCategoryChange = (category: string) => {
    if (category === 'Other') {
      // Toggle the placeholder category
      if (formData.selectedCategories.includes(category)) {
        // Remove placeholder and clear custom input
        const updatedCategories = formData.selectedCategories.filter(
          (cat) => cat !== category && categories.includes(cat)
        );
        setFormData((prev) => ({
          ...prev,
          selectedCategories: updatedCategories,
        }));
        setCustomCategory(''); // Clear custom input
      } else {
        // Add placeholder
        setFormData((prev) => ({
          ...prev,
          selectedCategories: [...prev.selectedCategories, category],
        }));
      }
    } else {
      // Handle regular categories
      setFormData((prev) => ({
        ...prev,
        selectedCategories: prev.selectedCategories.includes(category)
          ? prev.selectedCategories.filter((c) => c !== category)
          : [...prev.selectedCategories, category],
      }));
    }
  };

  // Handle custom category input
  const handleCustomCategoryChange = (value: string) => {
    setCustomCategory(value);

    // Only process if "Other" is selected
    if (!formData.selectedCategories.includes('Other')) {
      return;
    }

    // Keep only predefined categories (remove old custom ones)
    const predefinedCategories = formData.selectedCategories.filter((cat) =>
      categories.includes(cat)
    );

    if (value.trim()) {
      // Always replace any previous custom category instead of adding a new one
      setFormData((prev) => ({
        ...prev,
        selectedCategories: [...predefinedCategories, value.trim()],
      }));
    } else {
      // If custom input is empty, restore placeholder
      setFormData((prev) => ({
        ...prev,
        selectedCategories: [...predefinedCategories, ''],
      }));
    }
  };

  // Updated validateStep function with detailed error checking
  const validateStep = (): { isValid: boolean; errors: string[] } => {
    const errors: string[] = [];

    // Helper functions

    const isValidTelephone = (value: string): boolean => {
      return value.startsWith('92') && value.length >= 10 && value.length <= 12;
    };
    const isValidWebsite = (value: string): boolean => {
      if (value === '') return true;
      return value.startsWith('www.') && value.length > 6;
    };

    const isValidEmail = (value: string): boolean => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(value);
    };

    switch (currentStep) {
      case 1:
        // Company Name validation
        if (!formData.companyName?.trim()) {
          errors.push("Company Name is required");
        }

        // Street Address validation
        if (!formData.streetAddress?.trim()) {
          errors.push("Street Address is required");
        }

        // City validation
        const finalCity = formData.city === "Other" ? formData.cityOther : formData.city;
        if (!finalCity?.trim()) {
          errors.push("City is required");
        } else if (!/^[a-zA-Z\s]+$/.test(formData.city)) {
          errors.push("City should contain only letters and spaces");
        }

        // Province validation
        if (!formData.province) {
          errors.push("Province selection is required");
        }

// Post Code validation----------------copy this below
if (!formData.postCode?.trim()) {
  errors.push("Postal Code is required");
} else if (!/^\d+$/.test(formData.postCode)) {
  errors.push("Postal Code should contain only numbers");
} else if (formData.postCode.length !== 5) {
  errors.push("Postal Code must be exactly 5 digits long");
} else {
  const postCodeNum = parseInt(formData.postCode, 10);
  if (postCodeNum < 10000 || postCodeNum > 99999) {
    errors.push("Postal Code must be between 10000 and 99999");
  }
}

        // Telephone validation
        if (!formData.telephone?.trim()) {
          errors.push("Telephone number is required");
        } else if (!isValidTelephone(formData.telephone)) {
          if (!formData.telephone.startsWith('92')) {
            errors.push("Telephone number must start with country code '92'");
          } else if (formData.telephone.length < 10) {
            errors.push("Telephone number must have at least 08 digits after country code '92'");
          } else {
            errors.push("Invalid telephone number format (e.g., 923001234567)");
          }
        }

        // Email validation
        if (!formData.email?.trim()) {
          errors.push("Company Email is required");
        } else if (!isValidEmail(formData.email)) {
          errors.push("Please enter a valid email address (e.g., example@company.com)");
        }

// NTN validation
        // NTN validation
        if (!formData.ntn?.trim()) {
          errors.push("NTN field is required");
        } else {
          const ntn = formData.ntn.trim();

          // Two valid patterns:
          const shortNTN = /^[A-Z0-9]{7}-[A-Z0-9]$/;     // e.g., AB12345-6
          const longNTN = /^[0-9]{5}-[0-9]{7}-[0-9]$/; // e.g., 42301-8776868-8

          if (!shortNTN.test(ntn) && !longNTN.test(ntn)) {
            if (ntn.length < 9) {
              errors.push("NTN format is invalid. Elease enter a complete 8 digits, Use format: AB12345-6");
            } else if (ntn.length > 9) {
              errors.push("NTN format is invalid.");
            } else {
              errors.push("NTN must be either 9 characters (AB12345-6) or 15 characters (42301-8776868-8)");
            }
          }
        }

        // Number of Employees validation
        if (!formData.noOfEmployees?.trim()) {
          errors.push("Number of Employees is required");
        } else if (parseInt(formData.noOfEmployees) <= 0) {
          errors.push("Number of Employees must be greater than 0");
        }

        // Website validation (only if provided)
        if (formData.website !== '' && !isValidWebsite(formData.website)) {
          if (!formData.website.startsWith('www.')) {
            errors.push("Website URL must start with 'www.' (e.g., www.example.com)");
          } else if (formData.website.length <= 8) {
            errors.push("Please enter a complete website URL (e.g., www.example.com)");
          }
        }
        break;

      case 2:
        // GLN validation
        if (formData.glnRequired) {
          const validAddresses = formData.glnAddresses.filter(addr =>
            addr && addr !== '-' && addr.trim() !== ''
          );
          if (validAddresses.length === 0) {
            errors.push("At least one GLN address is required when GLN is selected as 'Yes'");
          } else {
            // Check each GLN address
            formData.glnAddresses.forEach((addr, index) => {
              if (addr && addr !== '-' && addr.trim().length < 10) {
                errors.push(`GLN address ${index + 1} must be at least 10 characters long`);
              }
            });
          }
        }

        // Billing address validation
        if (formData.billingRequired === 'Yes') {
          if (!formData.billingAddresses[0] || formData.billingAddresses[0] === '-' || formData.billingAddresses[0].trim() === '') {
            errors.push("Billing address is required when separate billing is selected as 'Yes'");
          } else if (formData.billingAddresses[0].trim().length < 10) {
            errors.push("Billing address must be at least 10 characters long");
          }
        }
        break;

      case 3:
        // CEO Contact validation
        const ceoValidation = [
          { field: 'designation', label: 'CEO Designation', value: formData.ceo.designation },
          { field: 'title', label: 'CEO Title', value: formData.ceo.title },
          { field: 'firstName', label: 'CEO First Name', value: formData.ceo.firstName },
          { field: 'lastName', label: 'CEO Last Name', value: formData.ceo.lastName },
          { field: 'email', label: 'CEO Email', value: formData.ceo.email },
          { field: 'telephone', label: 'CEO Telephone', value: formData.ceo.telephone }
        ];

        ceoValidation.forEach(({ field, label, value }) => {
          if (!value?.trim()) {
            errors.push(`${label} is required`);
          } else if (field === 'email' && !isValidEmail(value)) {
            errors.push(`${label} must be a valid email address`);
          } else if (field === 'firstName' || field === 'lastName') {
            if (!/^[a-zA-Z\s]+$/.test(value)) {
              errors.push(`${label} should contain only letters and spaces`);
            }
          } else if (field === 'telephone' && !isValidTelephone(value)) {
            if (!value.startsWith('92')) {
              errors.push(`${label} must start with country code '92'`);
            } else if (value.length < 10) {
              errors.push(`${label} must have at least 08 digits after country code '92'`);
            } else {
              errors.push(`Invalid ${label.toLowerCase()} format (e.g., 923001234567)`);
            }
          }
        });
        break;

      case 4:
        // Key Contact validation
        const keyContactValidation = [
          { field: 'designation', label: 'Key Contact Designation', value: formData.keyContact.designation },
          { field: 'title', label: 'Key Contact Title', value: formData.keyContact.title },
          { field: 'firstName', label: 'Key Contact First Name', value: formData.keyContact.firstName },
          { field: 'lastName', label: 'Key Contact Last Name', value: formData.keyContact.lastName },
          { field: 'email', label: 'Key Contact Email', value: formData.keyContact.email },
          { field: 'telephone', label: 'Key Contact Telephone', value: formData.keyContact.telephone }
        ];

        keyContactValidation.forEach(({ field, label, value }) => {
          if (!value?.trim()) {
            errors.push(`${label} is required`);
          } else if (field === 'email' && !isValidEmail(value)) {
            errors.push(`${label} must be a valid email address`);
          } else if (field === 'firstName' || field === 'lastName') {
            if (!/^[a-zA-Z\s]+$/.test(value)) {
              errors.push(`${label} should contain only letters and spaces`);
            }
          } else if (field === 'telephone' && !isValidTelephone(value)) {
            if (!value.startsWith('92')) {
              errors.push(`${label} must start with country code '92'`);
            } else if (value.length < 10) {
              errors.push(`${label} must have at least 08 digits after country code '92'`);
            } else {
              errors.push(`Invalid ${label.toLowerCase()} format (e.g., 923001234567)`);
            }
          }
        });
        break;

      case 5:
        // Accounts Contact validation
        const accountsValidation = [
          { field: 'designation', label: 'Accounts Contact Designation', value: formData.accountsContact.designation },
          { field: 'title', label: 'Accounts Contact Title', value: formData.accountsContact.title },
          { field: 'firstName', label: 'Accounts Contact First Name', value: formData.accountsContact.firstName },
          { field: 'lastName', label: 'Accounts Contact Last Name', value: formData.accountsContact.lastName },
          { field: 'email', label: 'Accounts Contact Email', value: formData.accountsContact.email },
          { field: 'telephone', label: 'Accounts Contact Telephone', value: formData.accountsContact.telephone }
        ];

        accountsValidation.forEach(({ field, label, value }) => {
          if (!value?.trim()) {
            errors.push(`${label} is required`);
          } else if (field === 'email' && !isValidEmail(value)) {
            errors.push(`${label} must be a valid email address`);
          } else if (field === 'firstName' || field === 'lastName') {
            if (!/^[a-zA-Z\s]+$/.test(value)) {
              errors.push(`${label} should contain only letters and spaces`);
            }
          } else if (field === 'telephone' && !isValidTelephone(value)) {
            if (!value.startsWith('92')) {
              errors.push(`${label} must start with country code '92'`);
            } else if (value.length < 10) {
              errors.push(`${label} must have at least 08 digits after country code '92'`);
            } else {
              errors.push(`Invalid ${label.toLowerCase()} format (e.g., 923001234567)`);
            }
          }
        });
        break;

      case 6:
        // Product categories validation
        if (formData.selectedCategories.length === 0) {
          errors.push("At least one product category must be selected");
        }

        // Custom category validation
        if (formData.selectedCategories.includes('Other') && !customCategory.trim()) {
          errors.push("Please specify your custom category when 'Other' is selected");
        }
        break;

      case 7:
        // User name validation
        if (!formData.userName?.trim()) {
          errors.push("Authorized Person Full Name is required");
        } else if (formData.userName.trim().length < 3) {
          errors.push("Full name must be at least 3 characters long");
        } else if (!/^[a-zA-Z\s]+$/.test(formData.userName)) {
          errors.push("Full name should contain only letters and spaces");
        }

        // Image upload validation
        if (!formData.uploadedImage) {
          errors.push("Signature upload is required");
        }

        // Terms agreement validation
        if (!formData.agreeTerms) {
          errors.push("You must agree to the Terms and Conditions to proceed");
        }
        break;

      default:
        break;
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  };

  // Updated nextStep function
  const nextStep = () => {
    const validation = validateStep();

    if (validation.isValid && currentStep < 7) {
      setShowErrors(false);
      setCurrentStep(currentStep + 1);
    } else {
      setShowErrors(true);

      // Create detailed error message
      let errorMessage = '';

      if (validation.errors.length === 1) {
        errorMessage = validation.errors[0];
      } else if (validation.errors.length <= 3) {
        errorMessage = validation.errors.join('\n• ');
        errorMessage = '• ' + errorMessage;
      } else {
        // For more than 3 errors, show first 3 and count
        const firstThreeErrors = validation.errors.slice(0, 3);
        errorMessage = '• ' + firstThreeErrors.join('\n• ');
        errorMessage += `\n• ... and ${validation.errors.length - 3} more error(s)`;
      }

      showError(errorMessage);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      const prevStepNum = currentStep - 1;
      setCurrentStep(prevStepNum);

      // Immediately validate the previous step to show any errors
      const validation = validateStep();
      if (!validation.isValid) {
        setShowErrors(true);
      } else {
        setShowErrors(false);
      }
    }
  };








  // Updated handleSubmit function
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate ALL steps before submission (not just current step)
    const allErrors: string[] = [];
    for (let step = 1; step <= 7; step++) {
      // Temporarily set step to validate all steps
      setCurrentStep(step);
      const validation = validateStep();
      if (!validation.isValid) {
        allErrors.push(`Step ${step}:`);
        allErrors.push(...validation.errors.map((err) => `  • ${err}`));
      }
    }

    if (allErrors.length > 0) {
      setShowErrors(true);
      showError("Cannot submit - Please fix all validation errors:\n\n" + allErrors.join("\n"));

      // Navigate to first step with errors
      for (let step = 1; step <= 7; step++) {
        setCurrentStep(step);
        const validation = validateStep();
        if (!validation.isValid) {
          setCurrentStep(step);
          break;
        }
      }
      return;
    }

    setIsSubmitting(true);

    // Get environment variable
    const scriptURL = process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL;

    if (!scriptURL) {
      console.error('Google Script URL not found');
      showError('Configuration error. Please contact support.');
      setIsSubmitting(false);
      return;
    }
    // Prepare form data to match Google Script's expected format
    const submissionData = {
      // Form identification - Update Form
      formName: "Update Form",

      // Basic company information
      companyName: formData.companyName,
      streetAddress: formData.streetAddress,
      city: formData.city === "Other" ? formData.cityOther : formData.city,
      province: formData.province,
      postCode: formData.postCode,
      telephone: formData.telephone,
      email: formData.email,
      ntn: formData.ntn,
      companyRegNo: formData.companyRegNo,
      noOfEmployees: formData.noOfEmployees,
      website: formData.website,

      // GLN Information
      glnRequired: formData.glnRequired,
      glnAddresses: formData.glnAddresses,

      // Billing Information
      billingRequired: formData.billingRequired,
      billingAddresses: formData.billingAddresses,

      // Contact Information (nested objects as expected by Google Script)
      ceo: {
        designation: formData.ceo.designation,
        title: formData.ceo.title,
        firstName: formData.ceo.firstName,
        lastName: formData.ceo.lastName,
        email: formData.ceo.email,
        telephone: formData.ceo.telephone,
        fax: ''
      },

      keyContact: {
        designation: formData.keyContact.designation,
        title: formData.keyContact.title,
        firstName: formData.keyContact.firstName,
        lastName: formData.keyContact.lastName,
        email: formData.keyContact.email,
        telephone: formData.keyContact.telephone,
        fax: ''
      },

      accountsContact: {
        designation: formData.accountsContact.designation,
        title: formData.accountsContact.title,
        firstName: formData.accountsContact.firstName,
        lastName: formData.accountsContact.lastName,
        email: formData.accountsContact.email,
        telephone: formData.accountsContact.telephone,
        fax: ''
      },

      // Product Information
      selectedCategories: formData.selectedCategories,
      selectedTypeofProduct: formData.selectedTypeofProduct || [],
      GTINsRequired: formData.GTINsRequired,
      GTIN8sRequired: formData.GTIN8sRequired,
      GTIN8: formData.GTIN8,

      // User Information
      userName: formData.userName,
      agreeTerms: formData.agreeTerms,
      uploadedImage: formData.uploadedImage,
      selectedFees: formData.selectedFees,

      // Add custom category if "Other" is selected
      customCategory: customCategory,

      // Metadata
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      submissionAttempt: 1
    };
   
    // Immediately show success and reset form (optimistic UI)
    showError('Further details are in the email.', 'success');
    setFormData(initialFormState);
    setCurrentStep(1);
    setShowErrors(false);
    setCustomCategory('');
    setIsSubmitting(false);

    // Background submission (fire and forget)
    fetch(scriptURL, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(submissionData),
    }).catch((error) => {
      // Silent error logging - don't disturb user experience
      console.error('Background submission error:', error);
    });
  };



  const renderStepContent = () => {
    switch (currentStep) {

      case 1:
        return (
          <div className="step-content">
            <h2>Company Information</h2>
            <div className="form-grid">
              <input
                type="hidden"
                name="formName"
                value={formData.formName}
              />
              <div className="form-group">
                <label htmlFor="companyName">Company Name *</label>
                <input
                  type="text"
                  id="companyName"
                  name="companyName"
                  value={formData.companyName}
                  onChange={(e) => {
                    let value = e.target.value;

                    // Character limit check - prevent input beyond 120 characters
                    if (value.length > 120) {
                      return; // Don't update if exceeds limit
                    }

                    // Remove leading/trailing spaces and multiple consecutive spaces
                    value = value.replace(/^\s+/, ''); // Remove leading spaces
                    value = value.replace(/\s+/g, ' '); // Replace multiple spaces with single space
                    // Only allow specific characters: letters, numbers, and safe punctuation
                    const allowedCharsRegex = /^[a-zA-Z0-9&.,\-(),'\s]*$/;
                    if (!allowedCharsRegex.test(value)) {
                      // Remove invalid characters
                      value = value.replace(/[^a-zA-Z0-9&.,\-(),'\s]/g, '');
                    }
                    // Add spaces around ampersands automatically
                    value = value.replace(/\s*&\s*/g, ' & ');
                    // Clean up any double spaces that might result from the ampersand formatting
                    value = value.replace(/\s+/g, ' ');
                    // Ensure it doesn't start or end with special characters (except when typing)
                    if (value.length > 0) {
                      // Don't allow starting with special characters
                      if (!/^[a-zA-Z0-9]/.test(value.charAt(0))) {
                        value = value.replace(/^[^a-zA-Z0-9]+/, '');
                      }
                      // Apply title case formatting
                      value = value.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase());
                      // Handle common business suffixes properly
                      value = value.replace(/\b(pvt)\s+(ltd)\b/gi, '(Pvt) Ltd');
                      value = value.replace(/\bsmc-pvt\s+ltd\b/gi, 'SMC-Pvt Ltd');
                      value = value.replace(/\bcompany\s+ltd\b/gi, 'Company Ltd');
                      value = value.replace(/\bcorporation\b/gi, 'Corporation');
                      value = value.replace(/\bltd\b/gi, 'Ltd');
                      value = value.replace(/\bpvt\b/gi, 'Pvt');
                      value = value.replace(/\bllc\b/gi, 'LLC');
                      value = value.replace(/\bllp\b/gi, 'LLP');
                      value = value.replace(/\binc\b/gi, 'Inc');
                      value = value.replace(/\bcorp\b/gi, 'Corp');
                      value = value.replace(/\bco\b/gi, 'Co');
                    }
                    setFormData({ ...formData, companyName: value });
                  }}
                  onBlur={(e) => {
                    let value = e.target.value.trim();
                    // Remove trailing special characters
                    value = value.replace(/[^a-zA-Z0-9]+$/, '');
                    // Add full stop at the end if not already present and value exists
                    if (value.length > 0 && !value.endsWith('.')) {
                      value += '.';
                    }
                    setFormData({ ...formData, companyName: value });
                  }}
                  pattern="^[a-zA-Z0-9][a-zA-Z0-9&.,\-(),'\s]*[a-zA-Z0-9]\.?$"
                  title="Company name must be 3-120 characters, start and end with letter/number, and contain only letters, numbers, and safe punctuation (&, ., -, ,, (, ), ')"
                  required
                  maxLength={120}
                />
                <p className='under-inputbox'>Note: Ensure the company name matches NTN.</p>
                {/* Validation Error Messages */}
                {formData.companyName && (
                  <>
                    {/* Success Message */}
                    {formData.companyName.length >= 3 &&
                      formData.companyName.length <= 120 &&
                      /^[a-zA-Z0-9]/.test(formData.companyName.charAt(0)) &&
                      /[a-zA-Z0-9.]$/.test(formData.companyName) &&
                      !/\s{2,}/.test(formData.companyName) && (
                        <p className="successsmessage" style={{ color: 'green', fontSize: '12px', marginTop: '4px' }}>
                          ✓ Your formatting is correct.
                        </p>
                      )}

                    {/* Error Messages */}
                    {formData.companyName.length < 3 && (
                      <p className="error-message" style={{ color: 'red', fontSize: '12px', marginTop: '4px' }}>
                        Company name must be at least 3 characters long.
                      </p>
                    )}

                    {formData.companyName.length > 120 && (
                      <p className="successsmessage" style={{ color: 'green', fontSize: '12px', marginTop: '4px' }}>
                        ✓ Your formatting is correct.
                      </p>
                    )}

                    {formData.companyName.length > 0 && !/^[a-zA-Z0-9]/.test(formData.companyName.charAt(0)) && (
                      <p className="error-message" style={{ color: 'red', fontSize: '12px', marginTop: '4px' }}>
                        Company name must start with a letter or number.
                      </p>
                    )}

                    {/\s{2,}/.test(formData.companyName) && (
                      <p className="error-message" style={{ color: 'red', fontSize: '12px', marginTop: '4px' }}>
                        Avoid multiple spaces between words.
                      </p>
                    )}
                  </>
                )}
              </div>



              <div className="form-group">
                <label htmlFor="streetAddress">Street Address *</label>
                <input
                  type="text"
                  id="streetAddress"
                  name="streetAddress"
                  value={formData.streetAddress}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    let value = e.target.value;

                    // Character limit check - prevent input beyond 200 characters
                    if (value.length > 200) {
                      return; // Don't update if exceeds limit
                    }

                    // Step 1: Remove invalid characters - sirf letters, numbers, spaces, #, -, /, comma allow (no full stop in middle)
                    value = value.replace(/[^a-zA-Z0-9\s#\-/,]/g, '');

                    // Step 2: Remove full stops from middle of address (only allow at very end)
                    value = value.replace(/\./g, '');

                    // Step 3: Ensure address starts with letter or number only
                    if (value && !/^[a-zA-Z0-9]/.test(value)) {
                      // Remove any leading characters that are not letters or numbers
                      value = value.replace(/^[^a-zA-Z0-9]+/, '');
                    }

                    // Step 4: Har word ka pehla letter capital karna
                    value = value.replace(/\b\w+/g, (word: string) => {
                      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
                    });

                    // Step 5: Before comma remove space, after comma add space
                    value = value.replace(/\s*,\s*/g, ', ');

                    // Step 6: Multiple spaces ko single space se replace karna
                    value = value.replace(/\s+/g, ' ');

                    // Step 7: Multiple commas ko single comma se replace karna
                    value = value.replace(/,{2,}/g, ',');

                    // Form data update karna
                    setFormData((prevData) => ({
                      ...prevData,
                      streetAddress: value
                    }));
                  }}
                  onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
                    let value = e.target.value.trim();

                    // Agar address empty nahi hai aur full stop se end nahi ho raha
                    if (value && !value.endsWith('.')) {
                      value += '.';
                      setFormData((prevData) => ({
                        ...prevData,
                        streetAddress: value
                      }));
                    }
                  }}
                  placeholder="Office# 123, Main Street, Block A"
                  maxLength={200}
                  required
                />
                <p className='under-inputbox'>Allowed characters: #, -, /, and , (comma).</p>
              </div>


              <div className="form-group">
                <label htmlFor="city">City *</label>
                {formData.city === "Other" ? (
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.cityOther || ""}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      let value = e.target.value.replace(/[^a-zA-Z\s]/g, '');
                      if (value.length > 0) {
                        value = value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
                      }
                      setFormData({ ...formData, cityOther: value });
                    }}
                    placeholder="Enter your city name"
                    required
                  />
                ) : (
                  <div className="custom-city-dropdown" ref={cityDropdownRef}>
                    <div
                      className="custom-city-header"
                      onClick={() => setIsCityDropdownOpen(!isCityDropdownOpen)}
                    >
                      <span>{formData.city || "Select City"}</span>
                      <span className={`dropdown-arrow ${isCityDropdownOpen ? 'open' : ''}`}>▼</span>
                    </div>

                    {isCityDropdownOpen && (
                      <div className="custom-city-options">
                        {pakistaniCities.map((city, index) => (
                          typeof city === 'object' ? (
                            <div key={index} className="city-group-header">
                              {city.label}
                            </div>
                          ) : (
                            <div
                              key={index}
                              className="city-option"
                              onClick={() => handleCitySelect(city)}
                            >
                              {city}
                            </div>
                          )
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {formData.city === "Other" && (
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, city: "", cityOther: undefined })}
                    style={{
                      marginTop: "4px",
                      padding: "1px 10px",
                      fontSize: "12px",
                      backgroundColor: "#f0f0f0",
                      border: "1px solid #ccc",
                      borderRadius: "6px",
                      cursor: "pointer"
                    }}
                  >
                    ← Back to city list
                  </button>
                )}
              </div>


              <div className="form-group">
                <label htmlFor="province">State/Province *</label>
                <select
                  id="province"
                  name="province"
                  value={formData.province}
                  onChange={handleInputChange}
                  required
                >
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



 <div className="form-group">
  <label htmlFor="postCode">Postal Code *</label>
  <input
    type="text"
    id="postCode"
    name="postCode"
    value={formData.postCode}
    onChange={(e) => {
      const value = e.target.value;

      // Allow only digits and restrict length to 5
      if (/^\d*$/.test(value) && value.length <= 5) {
        setFormData({ ...formData, postCode: value });
      }
    }}
    maxLength={5}
    required
  />

  {/* Validation Messages */}
  {formData.postCode && (
    <>
      {formData.postCode.length < 5 && (
        <p className="error-message" style={{ color: 'red', fontSize: '12px', marginTop: '4px' }}>
          Postal code must be 5 digits long.
        </p>
      )}
      {formData.postCode.length === 5 && (() => {
        const postCodeNum = parseInt(formData.postCode, 10);
        if (postCodeNum < 10000 || postCodeNum > 99999) {
          return (
            <p className="error-message" style={{ color: 'red', fontSize: '12px', marginTop: '4px' }}>
              Postal code must be between 10000 and 99999.
            </p>
          );
        }
        return (
          <p className="successsmessage" style={{ color: 'green', fontSize: '12px', marginTop: '4px' }}>
            ✓ Valid postal code.
          </p>
        );
      })()}
    </>
  )}
</div>


              <div className="form-group">
                <label htmlFor="telephone">Telephone (Including City Codes) *</label>
                <TelephoneInput
                  id="telephone"
                  value={formData.telephone}
                  onChange={(v) => setFormData({ ...formData, telephone: v })}
                  required
                />
              </div>



              <div className="form-group">
                <label htmlFor="email">Company Email *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={(e) => {
                    let value = e.target.value.trim();

                    // Character limit check - prevent input beyond 70 characters
                    if (value.length > 70) {
                      return; // Don't update if exceeds limit
                    }

                    // Remove any spaces and convert to lowercase
                    value = value.replace(/\s/g, '').toLowerCase();

                    // Basic email character filtering - allow only valid email characters
                    value = value.replace(/[^a-z0-9@._-]/g, '');

                    // Prevent multiple @ symbols
                    const atCount = (value.match(/@/g) || []).length;
                    if (atCount > 1) {
                      const parts = value.split('@');
                      value = parts[0] + '@' + parts.slice(1).join('');
                    }

                    // Prevent consecutive dots
                    value = value.replace(/\.{2,}/g, '.');

                    // Don't allow starting with @ or .
                    if (value.startsWith('@') || value.startsWith('.')) {
                      value = value.substring(1);
                    }

                    setFormData({ ...formData, email: value });
                  }}
                  placeholder="example@company.com"
                  maxLength={70}
                  required
                />
                <p className='under-inputbox'>Please provide the official company email address.</p>
                {/* Validation Messages */}
                {formData.email && (
                  <>
                    {formData.email.length > 70 && (
                      <p className="error-message" style={{ color: 'red', fontSize: '12px', marginTop: '4px' }}>
                        Email cannot exceed 70 characters.
                      </p>
                    )}

                    {!formData.email.includes('@') && (
                      <p className="error-message" style={{ color: 'red', fontSize: '12px', marginTop: '4px' }}>
                        Email must contain @ symbol.
                      </p>
                    )}

                    {formData.email.includes('@') && !formData.email.includes('.') && (
                      <p className="error-message" style={{ color: 'red', fontSize: '12px', marginTop: '4px' }}>
                        Email must contain a domain
                      </p>
                    )}

                    {formData.email.includes('@') && formData.email.split('@')[0].length === 0 && (
                      <p className="error-message" style={{ color: 'red', fontSize: '12px', marginTop: '4px' }}>
                        Email must have a username before @ symbol.
                      </p>
                    )}

                    {/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) && formData.email.length >= 5 && formData.email.length <= 70 && (
                      <p className="success-message" style={{ color: 'green', fontSize: '12px', marginTop: '4px' }}>
                        ✓ Valid email format
                      </p>
                    )}

                    {formData.email.endsWith('@') && (
                      <p className="error-message" style={{ color: 'red', fontSize: '12px', marginTop: '4px' }}>
                        Please complete the email address with domain name.
                      </p>
                    )}

                    {formData.email.includes('..') && (
                      <p className="error-message" style={{ color: 'red', fontSize: '12px', marginTop: '4px' }}>
                        Email cannot contain consecutive dots.
                      </p>
                    )}

                    {formData.email.endsWith('.') && !formData.email.endsWith('@') && (
                      <p className="error-message" style={{ color: 'red', fontSize: '12px', marginTop: '4px' }}>
                        Email cannot end with a dot (.).
                      </p>
                    )}
                  </>
                )}
              </div>








<div className="form-group">
  <div style={{ display: 'flex', alignItems: 'center', gap: '15px', margin: '0px 0' }}>
    <label htmlFor="ntn">Enter your NTN (this field is required) *</label>
  </div>

  <div className="form-group">
    <input
      type="text"
      id="ntn"
      name="ntn"
      value={formData.ntn}
      onChange={(e) => {
        let value = e.target.value.toUpperCase();

        // Remove invalid characters
        value = value.replace(/[^A-Z0-9\-]/g, '');

        // Extract only digits
        const onlyDigits = value.replace(/[^0-9]/g, '');

        // If long numeric pattern (CNIC-like)
        if (/^[0-9]+$/.test(onlyDigits) && onlyDigits.length > 8) {
          let formatted = '';

          if (onlyDigits.length <= 5) {
            formatted = onlyDigits;
          } else if (onlyDigits.length <= 12) {
            formatted = onlyDigits.slice(0, 5) + '-' + onlyDigits.slice(5);
          } else {
            formatted =
              onlyDigits.slice(0, 5) +
              '-' +
              onlyDigits.slice(5, 12) +
              '-' +
              onlyDigits.slice(12, 13);
          }

          value = formatted.slice(0, 15);
        } else {
          // Handle regular NTN (short) format XXXXXXX-X
          const clean = value.replace(/[^A-Z0-9]/g, '');

          if (clean.length <= 7) {
            value = clean;
          } else {
            value = clean.slice(0, 7) + '-' + clean.slice(7, 8);
          }

          // Ensure it doesn't exceed 9 chars
          value = value.slice(0, 9);
        }

        setFormData({ ...formData, ntn: value });
      }}
      placeholder="e.g. AB12345-6"
      required
    />

    <p className="under-inputbox">
      You must provide your NTN number to proceed with the application.
    </p>

{/* Validation Messages */}
{formData.ntn && (
  <>
    {/* Progress Bar */}
    <div style={{ marginTop: '6px', height: '6px', backgroundColor: '#e0e0e0', borderRadius: '4px' }}>
      <div
        style={{
          width: `${Math.min((formData.ntn.length / 9) * 100, 100)}%`,
          height: '100%',
          borderRadius: '4px',
          backgroundColor:
            formData.ntn.length < 9
              ? '#ef4444' // red
              : formData.ntn.length === 9
              ? '#22c55e' // green
              : formData.ntn.length > 9 && formData.ntn.length < 15
              ? '#ef4444' // red again
              : formData.ntn.length === 15
              ? '#22c55e' // green
              : '#e0e0e0',
          transition: 'width 0.3s ease, background-color 0.3s ease',
        }}
      ></div>
    </div>

    {/* Short NTN check (1234567-8) */}
    {formData.ntn.length === 9 && /^[A-Z0-9]{7}-[A-Z0-9]$/.test(formData.ntn) && (
      <p className="success-message" style={{ color: 'green', fontSize: '12px', marginTop: '4px' }}>
        ✓ Valid NTN format
      </p>
    )}

    {/* Long CNIC-like NTN check (42301-8776868-8) */}
    {formData.ntn.length === 15 && /^[0-9]{5}-[0-9]{7}-[0-9]$/.test(formData.ntn) && (
      <p className="success-message" style={{ color: 'green', fontSize: '12px', marginTop: '4px' }}>
        ✓ Valid CNIC format. Kindly share images of your CNIC (both front and back sides) to info@gs1pk.org
      </p>
    )}

    {/* Error messages */}
    {formData.ntn.length < 9 && !/^[A-Z0-9]{7}-[A-Z0-9]$/.test(formData.ntn) && (
      <p className="error-message" style={{ color: 'red', fontSize: '12px', marginTop: '4px' }}>
        Please enter a complete and valid NTN:<strong> 1234567-8</strong>
      </p>
    )}

    {formData.ntn.length > 9 && !/^[0-9]{5}-[0-9]{7}-[0-9]$/.test(formData.ntn) && (
      <p className="error-message" style={{ color: 'red', fontSize: '12px', marginTop: '4px' }}>
        <strong>Exceeds NTN limit . Press Backspace valid NTN: 1234567-8 .  Only 8 Digits</strong>
      </p>
    )}
  </>
)}
</div>
</div>



              <div className="form-group">
                <label htmlFor="companyRegNo">SECP Company Registration Number </label>
                <input
                  type="text"
                  id="companyRegNo"
                  name="companyRegNo"
                  value={formData.companyRegNo}
                  onChange={(e) => {
                    const value = e.target.value;

                    // Character limit check - prevent input beyond 40 characters
                    if (value.length > 30) {
                      return; // Don't update if exceeds limit
                    }
                    handleInputChange(e);
                  }}
                  maxLength={30}
                />
              </div>



              <div className="form-group">
                <label htmlFor="noOfEmployees">Number of Employees *</label>
                <input
                  type="number"
                  id="noOfEmployees"
                  name="noOfEmployees"
                  value={formData.noOfEmployees}
                  onChange={(e) => {
                    const value = e.target.value;

                    // Character limit check - prevent input beyond 20 characters
                    if (value.length > 20) {
                      return; // Don't update if exceeds limit
                    }

                    handleInputChange(e);
                  }}
                  maxLength={20}
                  required
                />

                {/* Validation Messages */}
                {formData.noOfEmployees && (
                  <>
                    {formData.noOfEmployees.toString().length > 20 && (
                      <p className="error-message" style={{ color: 'red', fontSize: '12px', marginTop: '4px' }}>
                        Number of employees cannot exceed 20 digits.
                      </p>
                    )}
                  </>
                )}
              </div>


              <div className="form-group">
                <label>Do you have a website?</label>
                <div className="radio-options">
                  <label>
                    <input
                      type="radio"
                      name="website"
                      value="yes"
                      checked={formData.website !== ''}
                      onChange={() =>
                        setFormData((prev) => ({
                          ...prev,
                          website: 'www.',
                        }))
                      }
                    />
                    Yes
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="website"
                      value="no"
                      checked={formData.website === ''}
                      onChange={() =>
                        setFormData((prev) => ({
                          ...prev,
                          website: '',
                        }))
                      }
                    />
                    No, I do not have a website
                  </label>
                </div>
                {formData.website !== '' && (
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

      case 2:
        return (
          <div className="step-content">
            <h2 className="text-2xl font-bold mb-6">GLN and Billing Information</h2>
            <div className="gln-section">
              <label className="label">Do you require GLN?</label>
              <p className='fee-description'>You need a Global Location Number to uniquely identify your company, warehouse, store, or any other location in the GS1 system?</p>
              <div className="radio-options">
                {['yes', 'no'].map((option) => (
                  <label key={option} className="radio-label">
                    <input
                      type="radio"
                      name="glnRequired"
                      value={option}
                      checked={formData.glnRequired === (option === 'yes')}
                      onChange={() =>
                        setFormData((prev) => ({
                          ...prev,
                          glnRequired: option === 'yes',
                          glnAddresses: option === 'yes'
                            ? (prev.glnAddresses.length === 0 || prev.glnAddresses[0] === '-' ? [''] : prev.glnAddresses)
                            : ['-'],
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
                  <label className="label">Please Provide Complete <strong>GLN address </strong>if it is different from above mentioned address </label>
                  {formData.glnAddresses.filter(addr => addr !== '-').map((address, index) => (
                    <div key={index} className="address-row">
                      <textarea
                        value={address}
                        onChange={(e) => handleAddressChange(index, e.target.value)}
                        placeholder={`Enter address ${index + 1}`}
                        className="address-textarea"
                        rows={3}
                        required
                      />
                      <button
                        type="button"
                        onClick={() => removeAddressField(index)}
                        className="remove-btn"
                      >
                        −
                      </button>
                    </div>
                  ))}
                  {formData.glnAddresses.length < 20 && (
                    <button type="button" onClick={addAddressField} className="add-btn">
                      + Add Address
                    </button>
                  )}
                  <p className="total-count">Total GLNs: {formData.glnAddresses.filter(addr => addr !== '-' && addr.trim() !== '').length}</p>
                </div>
              )}
            </div>

            <div className="gln-section">
              <div className="form-group">
                <label>Do you require a separate Billing Address?</label>
                <p className='fee-description'>  A billing address is the address where invoices and payment-related documents are sent. If your billing address is different from your business or shipping address, you should select “Yes” and provide the correct billing address details.</p>
                <div className="radio-options">
                  <label>
                    <input
                      type="radio"
                      name="billingRequired"
                      value="yes"
                      checked={formData.billingRequired === 'Yes'}
                      onChange={() =>
                        setFormData((prev) => ({
                          ...prev,
                          billingRequired: 'Yes',
                          billingAddresses: prev.billingAddresses[0] === '-' ? [''] : prev.billingAddresses.length === 0 ? [''] : prev.billingAddresses,
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
                      checked={formData.billingRequired === 'No'}
                      onChange={() =>
                        setFormData((prev) => ({
                          ...prev,
                          billingRequired: 'No',
                          billingAddresses: ['-'],
                        }))
                      }
                    />
                    Same as Company Address
                  </label>
                </div>

                {formData.billingRequired === 'Yes' && (
                  <div className="form-group">
                    <label htmlFor="billingAddress">Please Insert Full Billing Address Below</label>
                    <textarea
                      id="billingAddress"
                      name="billingAddress"
                      value={formData.billingAddresses[0] === '-' ? '' : (formData.billingAddresses[0] || '')}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          billingAddresses: [e.target.value],
                        }))
                      }
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

      case 3:
        return (
          <div className="step-content">
            <h2>CEO / Managing Director Contact</h2>
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="ceo-designation">Designation *</label>
                <select
                  id="ceo-designation"
                  value={formData.ceo.designation}
                  onChange={(e) => handleContactChange('ceo', 'designation', e.target.value)}
                  required
                >
                  <option value="CEO">CEO</option>
                  <option value="Managing Director">Managing Director</option>
                  <option value="Proprietor">Proprietor</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="ceo-title">Title *</label>
                <select
                  id="ceo-title"
                  value={formData.ceo.title}
                  onChange={(e) => handleContactChange('ceo', 'title', e.target.value)}
                  required
                >
                  <option value="Mr.">Mr.</option>
                  <option value="Mrs.">Mrs.</option>
                  <option value="Ms.">Ms.</option>
                  <option value="Dr.">Dr.</option>
                </select>
              </div>





              <div className="form-group">
                <label htmlFor="ceo-firstName">First Name *</label>
                <input
                  type="text"
                  id="ceo-firstName"
                  value={formData.ceo.firstName}
                  onChange={(e) => {
                    let value = e.target.value;

                    // Remove any non-letter characters except hyphens and spaces
                    value = value.replace(/[^a-zA-Z\s\-]/g, '');

                    // Limit to maximum 35 characters
                    if (value.length > 35) {
                      value = value.substring(0, 35);
                    }

                    // Replace multiple spaces with single space
                    value = value.replace(/\s+/g, ' ');

                    // Capitalize first letter of each word
                    value = value.replace(/\b\w/g, (char) => char.toUpperCase());

                    // Don't allow starting with space or hyphen
                    if (value.startsWith(' ') || value.startsWith('-')) {
                      value = value.substring(1);
                    }

                    handleContactChange('ceo', 'firstName', value);
                  }}
                  onBlur={(e) => {
                    let value = e.target.value;
                    // Remove trailing spaces and hyphens on blur
                    value = value.replace(/[\s\-]+$/, '');
                    handleContactChange('ceo', 'firstName', value);
                  }}
                  maxLength={35}
                  pattern="[a-zA-Z\s\-]*"
                  title="Only letters, spaces, and hyphens are allowed. Maximum 35 characters."
                  required
                />

                {/* Validation Messages */}
                {formData.ceo.firstName && (
                  <>
                    {formData.ceo.firstName.length >= 2 &&
                      /^[a-zA-Z]+[\sa-zA-Z\-]*[a-zA-Z]$/.test(formData.ceo.firstName) &&
                      !/\s{2,}/.test(formData.ceo.firstName) && (
                        <p style={{ color: 'green', fontSize: '12px', marginTop: '4px' }}>
                          ✓ Valid format
                        </p>
                      )}

                    {formData.ceo.firstName.length === 1 && (
                      <p style={{ color: 'red', fontSize: '12px', marginTop: '4px' }}>
                        Please write your complete first name.
                      </p>
                    )}
                  </>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="ceo-lastName">Last Name *</label>
                <input
                  type="text"
                  id="ceo-lastName"
                  value={formData.ceo.lastName}
                  onChange={(e) => {
                    let value = e.target.value;

                    // Remove any non-letter characters except hyphens and spaces
                    value = value.replace(/[^a-zA-Z\s\-]/g, '');

                    // Limit to maximum 35 characters
                    if (value.length > 35) {
                      value = value.substring(0, 35);
                    }

                    // Replace multiple spaces with single space
                    value = value.replace(/\s+/g, ' ');

                    // Capitalize first letter of each word
                    value = value.replace(/\b\w/g, (char) => char.toUpperCase());

                    // Don't allow starting with space or hyphen
                    if (value.startsWith(' ') || value.startsWith('-')) {
                      value = value.substring(1);
                    }

                    handleContactChange('ceo', 'lastName', value);
                  }}
                  onBlur={(e) => {
                    let value = e.target.value;
                    // Remove trailing spaces and hyphens on blur
                    value = value.replace(/[\s\-]+$/, '');
                    handleContactChange('ceo', 'lastName', value);
                  }}
                  maxLength={35}
                  pattern="[a-zA-Z\s\-]*"
                  title="Only letters, spaces, and hyphens are allowed. Maximum 35 characters."
                  required
                />

                {/* Validation Messages */}
                {formData.ceo.lastName && (
                  <>
                    {formData.ceo.lastName.length >= 2 &&
                      /^[a-zA-Z]+[\sa-zA-Z\-]*[a-zA-Z]$/.test(formData.ceo.lastName) &&
                      !/\s{2,}/.test(formData.ceo.lastName) && (
                        <p style={{ color: 'green', fontSize: '12px', marginTop: '4px' }}>
                          ✓ Valid format
                        </p>
                      )}

                    {formData.ceo.lastName.length === 1 && (
                      <p style={{ color: 'red', fontSize: '12px', marginTop: '4px' }}>
                        Please write your complete last name.
                      </p>
                    )}
                  </>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="ceo-email">Email *</label>
                <input
                  type="email"
                  id="ceo-email"
                  value={formData.ceo.email}
                  onKeyDown={(e) => {
                    // Completely prevent space key from being pressed
                    if (e.key === ' ' || e.key === 'Spacebar' || e.keyCode === 32) {
                      e.preventDefault();
                    }
                  }}
                  onChange={(e) => {
                    let value = e.target.value;

                    // Convert to lowercase (case-insensitive)
                    value = value.toLowerCase();

                    // Filter allowed characters: letters, numbers, @, ., -, _
                    // Username part can have: letters, numbers, dots, hyphens, underscores
                    // Domain part can have: letters, numbers, hyphens, dots
                    value = value.replace(/[^a-z0-9@._-]/g, '');

                    // Add maximum length limit (reasonable length)
                    if (value.length > 254) {
                      value = value.substring(0, 254);
                    }

                    // Must have one and only one @ symbol
                    const atCount = (value.match(/@/g) || []).length;
                    if (atCount > 1) {
                      const parts = value.split('@');
                      value = parts[0] + '@' + parts.slice(1).join('');
                    }

                    // Prevent consecutive dots
                    value = value.replace(/\.{2,}/g, '.');

                    // Don't allow starting with @ or .
                    if (value.startsWith('@') || value.startsWith('.')) {
                      value = value.substring(1);
                    }

                    handleContactChange('ceo', 'email', value);
                  }}
                  onBlur={(e) => {
                    let value = e.target.value;
                    // Remove trailing dots only when user finishes typing (on blur)
                    value = value.replace(/\.+$/, '');
                    handleContactChange('ceo', 'email', value);
                  }}
                  placeholder="example@company.com"
                  maxLength={254}
                  required
                />

                {/* Complete Validation Messages */}
                {formData.ceo.email && (
                  <>
                    {/* Must have @ symbol */}
                    {!formData.ceo.email.includes('@') && (
                      <p className="error-message" style={{ color: 'red', fontSize: '12px', marginTop: '4px' }}>
                        Email must contain @ symbol.
                      </p>
                    )}

                    {/* One and only one @ symbol */}
                    {(formData.ceo.email.match(/@/g) || []).length > 1 && (
                      <p className="error-message" style={{ color: 'red', fontSize: '12px', marginTop: '4px' }}>
                        Email must contain only one @ symbol.
                      </p>
                    )}

                    {/* Username part validation (before @) */}
                    {formData.ceo.email.includes('@') && formData.ceo.email.split('@')[0].length === 0 && (
                      <p className="error-message" style={{ color: 'red', fontSize: '12px', marginTop: '4px' }}>
                        Email must have a username before @ symbol.
                      </p>
                    )}

                    {/* Domain part validation (after @) */}
                    {formData.ceo.email.includes('@') && (() => {
                      const parts = formData.ceo.email.split('@');
                      const domain = parts[1];
                      return !domain || domain.length === 0;
                    })() && (
                        <p className="error-message" style={{ color: 'red', fontSize: '12px', marginTop: '4px' }}>
                          Email must have a domain after @ symbol.
                        </p>
                      )}

                    {/* Domain must have at least one dot */}
                    {formData.ceo.email.includes('@') && (() => {
                      const parts = formData.ceo.email.split('@');
                      const domain = parts[1];
                      return domain && !domain.includes('.');
                    })() && (
                        <p className="error-message" style={{ color: 'red', fontSize: '12px', marginTop: '4px' }}>
                          Domain must contain at least one dot (e.g., gs1pk.org).
                        </p>
                      )}

                    {/* No consecutive dots */}
                    {formData.ceo.email.includes('..') && (
                      <p className="error-message" style={{ color: 'red', fontSize: '12px', marginTop: '4px' }}>
                        Email cannot contain consecutive dots.
                      </p>
                    )}

                    {/* Valid TLD validation (at least 2 letters) */}
                    {formData.ceo.email.includes('@') && (() => {
                      const parts = formData.ceo.email.split('@');
                      const domain = parts[1];
                      if (!domain || !domain.includes('.')) return false;

                      const domainParts = domain.split('.');
                      const tld = domainParts[domainParts.length - 1];

                      // TLD must be at least 2 characters and only contain letters
                      return tld.length > 0 && (tld.length < 2 || !/^[a-z]+$/.test(tld));
                    })() && (
                        <p className="error-message" style={{ color: 'red', fontSize: '12px', marginTop: '4px' }}>
                          Domain extension must be at least 2 letters
                        </p>
                      )}

                    {/* Ending with @ */}
                    {formData.ceo.email.endsWith('@') && (
                      <p className="error-message" style={{ color: 'red', fontSize: '12px', marginTop: '4px' }}>
                        Please complete the email address with domain name.
                      </p>
                    )}

                    {/* Character limit warning */}
                    {formData.ceo.email.length > 240 && (
                      <p className="error-message" style={{ color: 'orange', fontSize: '12px', marginTop: '4px' }}>
                        {254 - formData.ceo.email.length} characters remaining
                      </p>
                    )}

                    {/* Success message for valid email */}
                    {(() => {
                      const emailRegex = /^[a-z0-9._-]+@[a-z0-9-]+\.[a-z]{2,}$/;
                      const isValidFormat = emailRegex.test(formData.ceo.email);
                      const hasNoConsecutiveDots = !formData.ceo.email.includes('..');
                      const hasReasonableLength = formData.ceo.email.length >= 5 && formData.ceo.email.length <= 254;

                      return isValidFormat && hasNoConsecutiveDots && hasReasonableLength;
                    })() && (
                        <p className="success-message" style={{ color: 'green', fontSize: '12px', marginTop: '4px' }}>
                          ✓ Valid email format
                        </p>
                      )}
                  </>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="ceo-telephone">Mobile or Telephone Number *</label>
                <TelephoneInput
                  id="ceo-telephone"
                  value={formData.ceo.telephone}
                  onChange={(v) => handleContactChange('ceo', 'telephone', v)}
                  required
                />
              </div>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="step-content">
            <h2>Key Contact for GS1 Activate Tool</h2>
            <h3>Kindly enter information of the person responsible for using the GS1 Activate Tool.</h3>
            <div className="form-grid">
              <div className="form-group">

                <label htmlFor="keyContact-designation">Designation *</label>
                <input
                  type="text"
                  id="keyContact-designation"
                  value={formData.keyContact.designation}
                  onChange={(e) => {
                    const value = e.target.value;

                    // Character limit check - prevent input beyond 50 characters
                    if (value.length > 50) {
                      return; // Don't update if exceeds limit
                    }

                    handleContactChange('keyContact', 'designation', value);
                  }}
                  maxLength={50}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="keyContact-title">Title *</label>
                <select
                  id="keyContact-title"
                  value={formData.keyContact.title}
                  onChange={(e) => handleContactChange('keyContact', 'title', e.target.value)}
                  required
                >
                  <option value="Mr.">Mr.</option>
                  <option value="Mrs.">Mrs.</option>
                  <option value="Ms.">Ms.</option>
                  <option value="Dr.">Dr.</option>
                </select>
              </div>



              <div className="form-group">
                <label htmlFor="keyContact-firstName">First Name *</label>
                <input
                  type="text"
                  id="keyContact-firstName"
                  value={formData.keyContact.firstName}
                  onChange={(e) => {
                    let value = e.target.value;

                    // Remove any non-letter characters except hyphens and spaces
                    value = value.replace(/[^a-zA-Z\s\-]/g, '');

                    // Limit to maximum 35 characters
                    if (value.length > 35) {
                      value = value.substring(0, 35);
                    }

                    // Replace multiple spaces with single space
                    value = value.replace(/\s+/g, ' ');

                    // Capitalize first letter of each word
                    value = value.replace(/\b\w/g, (char) => char.toUpperCase());

                    // Don't allow starting with space or hyphen
                    if (value.startsWith(' ') || value.startsWith('-')) {
                      value = value.substring(1);
                    }

                    handleContactChange('keyContact', 'firstName', value);
                  }}
                  onBlur={(e) => {
                    let value = e.target.value;
                    // Remove trailing spaces and hyphens on blur
                    value = value.replace(/[\s\-]+$/, '');
                    handleContactChange('keyContact', 'firstName', value);
                  }}
                  maxLength={35}
                  pattern="[a-zA-Z\s\-]*"
                  title="Only letters, spaces, and hyphens are allowed. Maximum 35 characters."
                  required
                />

                {/* Validation Messages */}
                {formData.keyContact.firstName && (
                  <>
                    {formData.keyContact.firstName.length >= 2 &&
                      /^[a-zA-Z]+[\sa-zA-Z\-]*[a-zA-Z]$/.test(formData.keyContact.firstName) &&
                      !/\s{2,}/.test(formData.keyContact.firstName) && (
                        <p style={{ color: 'green', fontSize: '12px', marginTop: '4px' }}>
                          ✓ Valid format
                        </p>
                      )}

                    {formData.keyContact.firstName.length === 1 && (
                      <p style={{ color: 'red', fontSize: '12px', marginTop: '4px' }}>
                        Please write your complete First name.
                      </p>
                    )}
                  </>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="keyContact-lastName">Last Name *</label>
                <input
                  type="text"
                  id="keyContact-lastName"
                  value={formData.keyContact.lastName}
                  onChange={(e) => {
                    let value = e.target.value;

                    // Remove any non-letter characters except hyphens and spaces
                    value = value.replace(/[^a-zA-Z\s\-]/g, '');

                    // Limit to maximum 35 characters
                    if (value.length > 35) {
                      value = value.substring(0, 35);
                    }

                    // Replace multiple spaces with single space
                    value = value.replace(/\s+/g, ' ');

                    // Capitalize first letter of each word
                    value = value.replace(/\b\w/g, (char) => char.toUpperCase());

                    // Don't allow starting with space or hyphen
                    if (value.startsWith(' ') || value.startsWith('-')) {
                      value = value.substring(1);
                    }

                    handleContactChange('keyContact', 'lastName', value);
                  }}
                  onBlur={(e) => {
                    let value = e.target.value;
                    // Remove trailing spaces and hyphens on blur
                    value = value.replace(/[\s\-]+$/, '');
                    handleContactChange('keyContact', 'lastName', value);
                  }}
                  maxLength={35}
                  pattern="[a-zA-Z\s\-]*"
                  title="Only letters, spaces, and hyphens are allowed. Maximum 35 characters."
                  required
                />

                {/* Validation Messages */}
                {formData.keyContact.lastName && (
                  <>
                    {formData.keyContact.lastName.length > 30 && (
                      <p style={{ color: 'orange', fontSize: '12px', marginTop: '4px' }}>
                        {35 - formData.keyContact.lastName.length} characters remaining
                      </p>
                    )}

                    {formData.keyContact.lastName.length >= 2 &&
                      /^[a-zA-Z]+[\sa-zA-Z\-]*[a-zA-Z]$/.test(formData.keyContact.lastName) &&
                      !/\s{2,}/.test(formData.keyContact.lastName) && (
                        <p style={{ color: 'green', fontSize: '12px', marginTop: '4px' }}>
                          ✓ Valid format
                        </p>
                      )}

                    {formData.keyContact.lastName.length === 1 && (
                      <p style={{ color: 'red', fontSize: '12px', marginTop: '4px' }}>
                        Please write your complete last name.
                      </p>
                    )}


                  </>
                )}
              </div>



              <div className="form-group">
                <label htmlFor="keyContact-email">Email *</label>
                <input
                  type="email"
                  id="keyContact-email"
                  value={formData.keyContact.email}
                  onKeyDown={(e) => {
                    // Completely prevent space key from being pressed
                    if (e.key === ' ' || e.key === 'Spacebar' || e.keyCode === 32) {
                      e.preventDefault();
                    }
                  }}
                  onChange={(e) => {
                    let value = e.target.value;

                    // Convert to lowercase (case-insensitive)
                    value = value.toLowerCase();

                    // Filter allowed characters: letters, numbers, @, ., -, _
                    // Username part can have: letters, numbers, dots, hyphens, underscores
                    // Domain part can have: letters, numbers, hyphens, dots
                    value = value.replace(/[^a-z0-9@._-]/g, '');

                    // Add maximum length limit (reasonable length)
                    if (value.length > 254) {
                      value = value.substring(0, 254);
                    }

                    // Must have one and only one @ symbol
                    const atCount = (value.match(/@/g) || []).length;
                    if (atCount > 1) {
                      const parts = value.split('@');
                      value = parts[0] + '@' + parts.slice(1).join('');
                    }

                    // Prevent consecutive dots
                    value = value.replace(/\.{2,}/g, '.');

                    // Don't allow starting with @ or .
                    if (value.startsWith('@') || value.startsWith('.')) {
                      value = value.substring(1);
                    }

                    handleContactChange('keyContact', 'email', value);
                  }}
                  onBlur={(e) => {
                    let value = e.target.value;
                    // Remove trailing dots only when user finishes typing (on blur)
                    value = value.replace(/\.+$/, '');
                    handleContactChange('keyContact', 'email', value);
                  }}
                  placeholder="contact@company.com"
                  maxLength={254}
                  required
                />
                <p className='under-inputbox'>Please enter email carefully, as all notifications will be sent to it.</p>

                {/* Complete Validation Messages */}
                {formData.keyContact.email && (
                  <>
                    {/* Must have @ symbol */}
                    {!formData.keyContact.email.includes('@') && (
                      <p className="error-message" style={{ color: 'red', fontSize: '12px', marginTop: '4px' }}>
                        Email must contain @ symbol.
                      </p>
                    )}

                    {/* One and only one @ symbol */}
                    {(formData.keyContact.email.match(/@/g) || []).length > 1 && (
                      <p className="error-message" style={{ color: 'red', fontSize: '12px', marginTop: '4px' }}>
                        Email must contain only one @ symbol.
                      </p>
                    )}

                    {/* Username part validation (before @) */}
                    {formData.keyContact.email.includes('@') && formData.keyContact.email.split('@')[0].length === 0 && (
                      <p className="error-message" style={{ color: 'red', fontSize: '12px', marginTop: '4px' }}>
                        Email must have a username before @ symbol.
                      </p>
                    )}

                    {/* Domain part validation (after @) */}
                    {formData.keyContact.email.includes('@') && (() => {
                      const parts = formData.keyContact.email.split('@');
                      const domain = parts[1];
                      return !domain || domain.length === 0;
                    })() && (
                        <p className="error-message" style={{ color: 'red', fontSize: '12px', marginTop: '4px' }}>
                          Email must have a domain after @ symbol.
                        </p>
                      )}

                    {/* Domain must have at least one dot */}
                    {formData.keyContact.email.includes('@') && (() => {
                      const parts = formData.keyContact.email.split('@');
                      const domain = parts[1];
                      return domain && !domain.includes('.');
                    })() && (
                        <p className="error-message" style={{ color: 'red', fontSize: '12px', marginTop: '4px' }}>
                          Domain must contain at least one dot (e.g., gmail.com).
                        </p>
                      )}

                    {/* No consecutive dots */}
                    {formData.keyContact.email.includes('..') && (
                      <p className="error-message" style={{ color: 'red', fontSize: '12px', marginTop: '4px' }}>
                        Email cannot contain consecutive dots.
                      </p>
                    )}

                    {/* Valid TLD validation (at least 2 letters) */}
                    {formData.keyContact.email.includes('@') && (() => {
                      const parts = formData.keyContact.email.split('@');
                      const domain = parts[1];
                      if (!domain || !domain.includes('.')) return false;

                      const domainParts = domain.split('.');
                      const tld = domainParts[domainParts.length - 1];

                      // TLD must be at least 2 characters and only contain letters
                      return tld.length > 0 && (tld.length < 2 || !/^[a-z]+$/.test(tld));
                    })() && (
                        <p className="error-message" style={{ color: 'red', fontSize: '12px', marginTop: '4px' }}>
                          Domain extension must be at least 2 letters.
                        </p>
                      )}

                    {/* Ending with @ */}
                    {formData.keyContact.email.endsWith('@') && (
                      <p className="error-message" style={{ color: 'red', fontSize: '12px', marginTop: '4px' }}>
                        Please complete the email address with domain name.
                      </p>
                    )}

                    {/* Character limit warning */}
                    {formData.keyContact.email.length > 240 && (
                      <p className="error-message" style={{ color: 'orange', fontSize: '12px', marginTop: '4px' }}>
                        {254 - formData.keyContact.email.length} characters remaining
                      </p>
                    )}

                    {/* Success message for valid email */}
                    {(() => {
                      const emailRegex = /^[a-z0-9._-]+@[a-z0-9-]+\.[a-z]{2,}$/;
                      const isValidFormat = emailRegex.test(formData.keyContact.email);
                      const hasNoConsecutiveDots = !formData.keyContact.email.includes('..');
                      const hasReasonableLength = formData.keyContact.email.length >= 5 && formData.keyContact.email.length <= 254;

                      return isValidFormat && hasNoConsecutiveDots && hasReasonableLength;
                    })() && (
                        <p className="success-message" style={{ color: 'green', fontSize: '12px', marginTop: '4px' }}>
                          ✓ Valid email format
                        </p>
                      )}
                  </>
                )}
              </div>







              <div className="form-group">
                <label htmlFor="keyContact-telephone">Mobile or Telephone Number *</label>
                <TelephoneInput
                  id="keyContact-telephone"
                  value={formData.keyContact.telephone}
                  onChange={(v) => handleContactChange('keyContact', 'telephone', v)}
                  required
                />
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="step-content">
            <h2>Accounts Contact Information</h2>
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="accountsContact-designation">Designation *</label>
                <input
                  type="text"
                  id="accountsContact-designation"
                  value={formData.accountsContact.designation}
                  onChange={(e) => {
                    const value = e.target.value;

                    // Character limit check - prevent input beyond 50 characters
                    if (value.length > 50) {
                      return; // Don't update if exceeds limit
                    }

                    handleContactChange('accountsContact', 'designation', value);
                  }}
                  maxLength={50}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="accountsContact-title">Title *</label>
                <select
                  id="accountsContact-title"
                  value={formData.accountsContact.title}
                  onChange={(e) => handleContactChange('accountsContact', 'title', e.target.value)}
                  required
                >
                  <option value="Mr.">Mr.</option>
                  <option value="Mrs.">Mrs.</option>
                  <option value="Ms.">Ms.</option>
                  <option value="Dr.">Dr.</option>
                </select>
              </div>


              <div className="form-group">
                <label htmlFor="accountsContact-firstName">First Name *</label>
                <input
                  type="text"
                  id="accountsContact-firstName"
                  value={formData.accountsContact.firstName}
                  onChange={(e) => {
                    let value = e.target.value;
                    value = value.replace(/[^a-zA-Z\s\-]/g, '');
                    if (value.length > 35) {
                      value = value.substring(0, 35);
                    }
                    value = value.replace(/\s+/g, ' ');
                    value = value.replace(/\b\w/g, (char) => char.toUpperCase());
                    if (value.startsWith(' ') || value.startsWith('-')) {
                      value = value.substring(1);
                    }
                    handleContactChange('accountsContact', 'firstName', value);
                  }}
                  onBlur={(e) => {
                    let value = e.target.value;
                    // Remove trailing spaces and hyphens on blur
                    value = value.replace(/[\s\-]+$/, '');
                    handleContactChange('accountsContact', 'firstName', value);
                  }}
                  maxLength={35}
                  pattern="[a-zA-Z\s\-]*"
                  title="Only letters, spaces, and hyphens are allowed. Maximum 35 characters."
                  required
                />

                {/* Validation Messages */}
                {formData.accountsContact.firstName && (
                  <>
                    {formData.accountsContact.firstName.length >= 2 &&
                      /^[a-zA-Z]+[\sa-zA-Z\-]*[a-zA-Z]$/.test(formData.accountsContact.firstName) &&
                      !/\s{2,}/.test(formData.accountsContact.firstName) && (
                        <p style={{ color: 'green', fontSize: '12px', marginTop: '4px' }}>
                          ✓ Valid format
                        </p>
                      )}

                    {formData.accountsContact.firstName.length === 1 && (
                      <p style={{ color: 'red', fontSize: '12px', marginTop: '4px' }}>
                        Please write your complete first name.
                      </p>
                    )}
                  </>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="accountsContact-lastName">Last Name *</label>
                <input
                  type="text"
                  id="accountsContact-lastName"
                  value={formData.accountsContact.lastName}
                  onChange={(e) => {
                    let value = e.target.value;

                    // Remove any non-letter characters except hyphens and spaces
                    value = value.replace(/[^a-zA-Z\s\-]/g, '');

                    // Limit to maximum 35 characters
                    if (value.length > 35) {
                      value = value.substring(0, 35);
                    }

                    // Replace multiple spaces with single space
                    value = value.replace(/\s+/g, ' ');

                    // Capitalize first letter of each word
                    value = value.replace(/\b\w/g, (char) => char.toUpperCase());

                    // Don't allow starting with space or hyphen
                    if (value.startsWith(' ') || value.startsWith('-')) {
                      value = value.substring(1);
                    }
                    handleContactChange('accountsContact', 'lastName', value);
                  }}
                  onBlur={(e) => {
                    let value = e.target.value;
                    // Remove trailing spaces and hyphens on blur
                    value = value.replace(/[\s\-]+$/, '');
                    handleContactChange('accountsContact', 'lastName', value);
                  }}
                  maxLength={35}
                  pattern="[a-zA-Z\s\-]*"
                  title="Only letters, spaces, and hyphens are allowed. Maximum 35 characters."
                  required
                />

                {/* Validation Messages */}
                {formData.accountsContact.lastName && (
                  <>
                    {formData.accountsContact.lastName.length >= 2 &&
                      /^[a-zA-Z]+[\sa-zA-Z\-]*[a-zA-Z]$/.test(formData.accountsContact.lastName) &&
                      !/\s{2,}/.test(formData.accountsContact.lastName) && (
                        <p style={{ color: 'green', fontSize: '12px', marginTop: '4px' }}>
                          ✓ Valid format
                        </p>
                      )}

                    {formData.accountsContact.lastName.length === 1 && (
                      <p style={{ color: 'red', fontSize: '12px', marginTop: '4px' }}>
                        Please write your complete last name.
                      </p>
                    )}
                  </>
                )}
              </div>








              <div className="form-group">
                <label htmlFor="accountsContact-email">Accounts Email *</label>
                <input
                  type="email"
                  id="accountsContact-email"
                  value={formData.accountsContact.email}
                  onKeyDown={(e) => {
                    // Completely prevent space key from being pressed
                    if (e.key === ' ' || e.key === 'Spacebar' || e.keyCode === 32) {
                      e.preventDefault();
                    }
                  }}
                  onChange={(e) => {
                    let value = e.target.value;

                    // Convert to lowercase (case-insensitive)
                    value = value.toLowerCase();

                    // Filter allowed characters: letters, numbers, @, ., -, _
                    // Username part can have: letters, numbers, dots, hyphens, underscores
                    // Domain part can have: letters, numbers, hyphens, dots
                    value = value.replace(/[^a-z0-9@._-]/g, '');

                    // Add maximum length limit (reasonable length)
                    if (value.length > 254) {
                      value = value.substring(0, 254);
                    }

                    // Must have one and only one @ symbol
                    const atCount = (value.match(/@/g) || []).length;
                    if (atCount > 1) {
                      const parts = value.split('@');
                      value = parts[0] + '@' + parts.slice(1).join('');
                    }

                    // Prevent consecutive dots
                    value = value.replace(/\.{2,}/g, '.');

                    // Don't allow starting with @ or .
                    if (value.startsWith('@') || value.startsWith('.')) {
                      value = value.substring(1);
                    }

                    handleContactChange('accountsContact', 'email', value);
                  }}
                  onBlur={(e) => {
                    let value = e.target.value;
                    // Remove trailing dots only when user finishes typing (on blur)
                    value = value.replace(/\.+$/, '');
                    handleContactChange('accountsContact', 'email', value);
                  }}
                  placeholder="accounts@company.com"
                  maxLength={254}
                  required
                />

                {/* Complete Validation Messages */}
                {formData.accountsContact.email && (
                  <>
                    {/* Must have @ symbol */}
                    {!formData.accountsContact.email.includes('@') && (
                      <p className="error-message" style={{ color: 'red', fontSize: '12px', marginTop: '4px' }}>
                        Email must contain @ symbol.
                      </p>
                    )}

                    {/* One and only one @ symbol */}
                    {(formData.accountsContact.email.match(/@/g) || []).length > 1 && (
                      <p className="error-message" style={{ color: 'red', fontSize: '12px', marginTop: '4px' }}>
                        Email must contain only one @ symbol.
                      </p>
                    )}

                    {/* Username part validation (before @) */}
                    {formData.accountsContact.email.includes('@') && formData.accountsContact.email.split('@')[0].length === 0 && (
                      <p className="error-message" style={{ color: 'red', fontSize: '12px', marginTop: '4px' }}>
                        Email must have a username before @ symbol.
                      </p>
                    )}

                    {/* Domain part validation (after @) */}
                    {formData.accountsContact.email.includes('@') && (() => {
                      const parts = formData.accountsContact.email.split('@');
                      const domain = parts[1];
                      return !domain || domain.length === 0;
                    })() && (
                        <p className="error-message" style={{ color: 'red', fontSize: '12px', marginTop: '4px' }}>
                          Email must have a domain after @ symbol.
                        </p>
                      )}

                    {/* Domain must have at least one dot */}
                    {formData.accountsContact.email.includes('@') && (() => {
                      const parts = formData.accountsContact.email.split('@');
                      const domain = parts[1];
                      return domain && !domain.includes('.');
                    })() && (
                        <p className="error-message" style={{ color: 'red', fontSize: '12px', marginTop: '4px' }}>
                          Domain must contain at least one dot (e.g., gs1pk.org).
                        </p>
                      )}

                    {/* No consecutive dots */}
                    {formData.accountsContact.email.includes('..') && (
                      <p className="error-message" style={{ color: 'red', fontSize: '12px', marginTop: '4px' }}>
                        Email cannot contain consecutive dots.
                      </p>
                    )}

                    {/* Valid TLD validation (at least 2 letters) */}
                    {formData.accountsContact.email.includes('@') && (() => {
                      const parts = formData.accountsContact.email.split('@');
                      const domain = parts[1];
                      if (!domain || !domain.includes('.')) return false;

                      const domainParts = domain.split('.');
                      const tld = domainParts[domainParts.length - 1];

                      // TLD must be at least 2 characters and only contain letters
                      return tld.length > 0 && (tld.length < 2 || !/^[a-z]+$/.test(tld));
                    })() && (
                        <p className="error-message" style={{ color: 'red', fontSize: '12px', marginTop: '4px' }}>
                          Domain extension must be at least 2 letters.
                        </p>
                      )}

                    {/* Ending with @ */}
                    {formData.accountsContact.email.endsWith('@') && (
                      <p className="error-message" style={{ color: 'red', fontSize: '12px', marginTop: '4px' }}>
                        Please complete the email address with domain name.
                      </p>
                    )}

                    {/* Character limit warning */}
                    {formData.accountsContact.email.length > 240 && (
                      <p className="error-message" style={{ color: 'orange', fontSize: '12px', marginTop: '4px' }}>
                        {254 - formData.accountsContact.email.length} characters remaining
                      </p>
                    )}

                    {/* Success message for valid email */}
                    {(() => {
                      const emailRegex = /^[a-z0-9._-]+@[a-z0-9-]+\.[a-z]{2,}$/;
                      const isValidFormat = emailRegex.test(formData.accountsContact.email);
                      const hasNoConsecutiveDots = !formData.accountsContact.email.includes('..');
                      const hasReasonableLength = formData.accountsContact.email.length >= 5 && formData.accountsContact.email.length <= 254;

                      return isValidFormat && hasNoConsecutiveDots && hasReasonableLength;
                    })() && (
                        <p className="success-message" style={{ color: 'green', fontSize: '12px', marginTop: '4px' }}>
                          ✓ Valid email format
                        </p>
                      )}
                  </>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="accountsContact-telephone">Mobile or Telephone Number *</label>
                <TelephoneInput
                  id="accountsContact-telephone"
                  value={formData.accountsContact.telephone}
                  onChange={(v) => handleContactChange('accountsContact', 'telephone', v)}
                  required
                />
              </div>
            </div>
          </div>
        );

      case 6:
        return (

          <div className="step-content">
            <div className="gln-section">
              <h2>Product Information.</h2>
              {/* Updated Dropdown for Categories */}
              <div className="form-group">
                <label>Select the product category that best represents your business. * </label>
                <div className={`dropdown-container ${isOpen ? 'open' : ''}`} ref={dropdownRef}>
                  <div className="dropdown-header" onClick={toggleDropdown}>
                    <span>
                      {formData.selectedCategories.filter(cat => cat !== 'Other').length > 0
                        ? `${formData.selectedCategories.filter(cat => cat !== 'Other').length} categories selected`
                        : 'Select categories...'
                      }
                    </span>
                    <span className="dropdown-arrow">▼</span>
                  </div>

                  {isOpen && (
                    <div className="dropdown-options">
                      {categories.map((category) => (
                        <label key={category} className="dropdown-option">
                          <input
                            type="checkbox"
                            checked={formData.selectedCategories.includes(category)}
                            onChange={() => handleCategoryChange(category)}
                          />
                          <span>{category}</span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>

                {/* Custom category input field */}
                {formData.selectedCategories.includes('Other') && (
                  <div className="form-group" style={{ marginTop: '10px' }}>
                    <label htmlFor="customCategory">Please specify your category:</label>
                    <input
                      type="text"
                      id="customCategory"
                      value={customCategory}
                      onChange={(e) => handleCustomCategoryChange(e.target.value)}
                      placeholder="Enter your custom category"
                      className="form-control"
                      style={{ marginTop: '5px' }}
                    />
                  </div>
                )}

                {/* Show selected categories - exclude placeholder */}
                {formData.selectedCategories.filter(cat => cat !== 'Other').length > 0 && (
                  <div className="selected-categories">
                    <small>
                      Selected: {formData.selectedCategories
                        .filter(cat => cat !== 'Other')
                        .join(', ')}
                    </small>
                  </div>
                )}
              </div>
            </div>
          </div>
        );

      case 7:
        return (
          <div className="step-content">
            <h2>Declaration & Signature</h2>

            {/* Terms and Conditions Section */}
            <div className="terms-conditions">
              <h3>Terms and Conditions</h3>
              <div className="terms-content">
                <div className="term-item">
                  <strong>1. Grant of License:</strong> GS1 Pakistan grants You a non-exclusive nontransferable license to use the GS1 company prefix in connection with the supply and sale of your products.
                </div>
                <div className="term-item">
                  <strong>2. Term:</strong> The License and these terms and conditions come into effect for You on the date on which GS1 Pakistan notifies You of its acceptance of your GS1 Company Prefix License and GS1 Pakistan Membership and continues until terminated as provided in clause 9.
                </div>

                <div className="term-item">
                  <strong>3. Fees:</strong> You must pay the Membership Fee to GS1 annually within 30 days of the date of GS1s invoice. GS1 may, from time to time, increase the Membership Fee. Where products bearing the GS1 identification numbers issued to You, as well as GS1 identification numbers associated with locations are already in the marketplace at the time the License is terminated, not with standing such termination, you will remain liable for a fee equivalent to the then current Membership Fee for the period that You continue to distribute those Products.
                </div>

                <div className="term-item">
                  <strong>4. Consent:</strong> Members understand and agree that its Data is shared by GS1 Pakistan with data recipients through both local and global GS1 services.
                </div>

                <div className="term-item">
                  <strong>5. Warranties:</strong> The Member represents and warrants that its Data: Originates from, is authorized or approved(validated) by the Member. Does not violate any third-party rights, including privacy rights, copyrights, trademarks, patents or other intellectual property rights of any third party, or violates any applicable laws or regulations, Does not contain any virus, Trojans, worms, logic bombs or any other materials which are malicious or technologically harmful.
                </div>

                <div className="term-item">
                  <strong>6. Data Quality:</strong> Member understands that Data will be validated against and shall comply with the validation rules [set out in the GS1 General Specifications, available via <a href="https://www.gs1.org/standards/barcodesepcrfid-id-keys/gs1-general-specifications" target="_blank" rel="noopener noreferrer">https://www.gs1.org/standards/barcodesepcrfid-id-keys/gs1-general-specifications</a>, the Global Data Dictionary] and any other technical specifications that may be implemented and/or as amended from time to time. Members shall be responsible for the quality of the data.
                </div>
                <div className="term-item">
                  <strong>7. Remedial Action:</strong> If GS1 Pakistan, in its sole discretion, suspects or believes that Data is submitted to or published in GS1 Activate Solution in violation of this agreement (e.g. it violates a third party intellectual property rights), it may take appropriate remedial action (including, without limitation, by temporarily suspending the availability of or definitively removing the said Data from the GS1 Activate and GS1 Registry Platform).
                </div>

                <div className="term-item">
                  <strong>8. Designees:</strong> If Member acts on behalf of (e.g. as an agent, distributor, content provider) a Principal Member (e.g. a manufacturer) to create, maintain, manage and/or deliver its Principal Member Data, Member must be able to demonstrate its authority to provide Principal Member Data for the purpose and grant the license set out in this agreement at all times and on GS1 Pakistan first request.
                </div>

                <div className="term-item">
                  <strong>9. Warranty Disclaimer:</strong> GS1 Pakistan makes no warranties, express or implied, and GS1 specifically disclaims any warranty of merchantability or fitness for a particular purpose. GS1 Pakistan does not guarantee that the GS1 Numbers will meet “all requirements” of Your business.
                </div>

                <div className="term-item">
                  <strong>10. Your Conduct:</strong> You must not at any time during the term of the Membership and License, or after its termination, do or omit to do anything whereby GS1’s goodwill or reputation may be prejudicially affected or brought into disrepute. You must comply with the technical standards set out in the GS1 Pakistan manuals/guidelines and such other directions as GS1 may give from time to time.
                </div>

                <div className="term-item">
                  <strong>11. Use of the GS1 Numbers:</strong> You must only use the GS1 numbers issued to You in connection with the manufacture, sale and identification of Your Products/Locations. You must not alter the GS1 numbers licensed to you in any way; You must not transfer, share, sell, lease, sub‐license or sub‐divide the GS1 numbers and permit them to be used by anyone else. You must recognize GS1 Pakistan’s title to the GS1 numbers and related intellectual property and must not at any time do or allow to be done any act or thing which may in any way impair GS1’s rights in regard to GS1 numbers or related intellectual property.
                </div>

                <div className="term-item">
                  <strong>12. Indemnity:</strong> Member shall fully indemnify, hold harmless and defend GS1 Pakistan, GS1 AISBL, as well as any GS1 Member Organization from and against all claims, actions, damages, liabilities, obligations, losses, settlements, judgments, costs and expenses (including reasonable attorneys’ fees and costs), brought by any consumer, government agency or other third party which arise out of, relate to or result from: Any allegation that any use, publication or distribution of Member Data infringes any patent, copyright, trademark, database right or other intellectual property right. Any breach or alleged breach of this agreement or any applicable laws or regulations by Member and/or its Authorized Users; and/or Any allegation that any Member Data has been made available in breach of the Member warranties given herein.
                </div>

                <div className="term-item">
                  <strong>13. Limitation of Liability:</strong> To the full extent permitted by law, GS1 Pakistan excludes all liability in connection with this License for any indirect or consequential loss or damage, including lost profits and revenue. To the full extent permitted by law, GS1 Pakistan’s total liability to You for loss or damage of any kind arising out of this License which is not excluded by clause 13 is limited, for any and all claims, to the total License Fee paid during the 12‐month period prior to the relevant liability accruing. Members shall be liable for the data it shares in GS1 Activate. To the fullest extent permitted by law, neither GS1 Pakistan, GS1 AISBL nor any other GS1 Member Organization shall be liable to a third party for any harm, effects or damages whatsoever, including but not limited to actual, direct, consequential, indirect, incidental or punitive damages, even if advised of the possibility of such damages, arising out of or in relation to the third party’s use of Member’s Data.
                </div>

                <div className="term-item">
                  <strong>14. Termination:</strong> GS1 Pakistan may terminate the license immediately by giving notice if: You fail to pay the Membership Fee by its due date; You commit a breach of Your obligations under these terms and conditions; You are declared bankrupt, go into liquidation, have a receiver or other controller appointed, or (being a company) are wound up otherwise than for the purpose of a reconstruction. Either GS1 Pakistan or You may terminate this Membership Agreement and License in any other circumstances by giving six months’ written notice to the other party. Termination of this Membership Agreement and License does not relieve either GS1 or You from liability arising from any prior breach of the terms of this Agreement.
                </div>

                <div className="term-item">
                  <strong>15. Consequences of Termination:</strong> On termination of the Membership Agreement, your rights under this Agreement terminate and You must: Immediately cease applying the GS1 Numbers and Barcodes to any of your Products manufactured or sold by You after the termination date, as well as to any locations associated with you and within 30 days, pay to GS1 Pakistan all amounts due to GS1 Pakistan under this License at the termination date. You are not entitled to any rebate or refund of the Membership Fee or any other fees or charges paid under this License, unless this License expressly states otherwise. The termination or expiry of this Agreement does not affect those provisions, which by their nature survive termination, including clause 13 and 14. Notwithstanding termination of the GS1 Pakistan License Agreement, GS1 may retain the data provided by Member. (By default, such data will be shown but marked as no longer updated. Members may however request that GS1 no longer shows the data.)
                </div>

                <div className="term-item">
                  <strong>16. General Provisions:</strong> All notices and other communications in connection with this Membership Agreement and License must be in writing and take effect from the time they are received unless a later time is specified. Notices for You will be sent to the address specified on your Membership application (or such other address as You may notify GS1 Pakistan of from time to time). This Membership Agreement and License is governed by the law in force in Pakistan. Each party submits to the non‐exclusive jurisdiction of the courts of that place.
                </div>


              </div>

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

            <div className="gln-section">
              <div className="form-group">
                <div className="declaration">
                  <p>
                    I/We <strong>{formData.userName || '[Name]'}</strong> hereby confirm that I/We have thoroughly read and fully understood all the Terms and Conditions of GS1 Pakistan, and willingly agree to them in their entirety without any reservations. I/We further affirm that all the information provided is true, accurate, and complete to the best of my/our knowledge and belief.
                  </p>
                </div>
                <label htmlFor="userName">Authorized Person Full Name (as per official records) for Terms & Conditions acceptance.</label>
                <input
                  type="text"
                  id="userName"
                  name="userName"
                  value={formData.userName}
                  onChange={(e) => {
                    const value = e.target.value;
                    // Character limit check - prevent input beyond 100 characters
                    if (value.length > 90) {
                      return; // Don't update if exceeds limit
                    }
                    handleInputChange(e);
                  }}
                  placeholder="Enter your full name"
                  maxLength={90}
                  required
                />
              </div>
            </div>

            <div className="gln-section">
              <div className="form-group">
                <label htmlFor="uploadedImage">Upload the signature of the authorized person.</label>
                <p className='fee-description'>
                  Please upload the scanned image or digital copy of the authorized person’s signature.
                  The authorized person is someone who has the legal right to sign documents and make decisions
                  on behalf of the company.
                  <br /><br />
                  <strong>Guidelines for uploading:</strong>
                  <br />✅ The file should be clear and readable.
                  <br />✅ Acceptable formats: JPG, PNG.
                  <br />✅ Maximum file size:  (less than 1MB).
                  <br />✅ Make sure the signature is of the authorized company representative only.
                </p>
                <input
                  type="file"
                  id="uploadedImage"
                  accept="image/*"
                  onChange={handleImageUpload}
                  required
                />

                {formData.uploadedImage && (
                  <div className="image-preview">
                    <Image
                      src={formData.uploadedImage}
                      alt="Signature Preview"
                      width={300}
                      height={100}
                      unoptimized // ⬅️ Add this line
                    />

                  </div>
                )}
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="form-container">
      <div className="form-header">
        <div className="form-header-title">
          <h1 className="form-header">
            <span className="title-main">GS1 Pakistan </span>
            <span className="title-sub">  Update Form</span>
          </h1>
        </div>
        <div className="progress-bar">
          {[1, 2, 3, 4, 5, 6, 7].map((step) => (
            <div
              key={step}
              className={`progress-step ${currentStep >= step ? 'active' : ''} ${currentStep === step ? 'current' : ''}`}
            >
              <div className="step-number">{step}</div>
              <div className="step-label">
                {step === 1 && 'Company Info'}
                {step === 2 && 'GLN & Billing'}
                {step === 3 && 'CEO Contact'}
                {step === 4 && 'Key Contact'}
                {step === 5 && 'Acct. Contact'}
                {step === 6 && 'Products'}
                {step === 7 && 'Declaration'}
              </div>
            </div>
          ))}
        </div>
      </div>
      <form onSubmit={handleSubmit} className="registration-form">
        {renderStepContent()}
        <div className="form-navigation">
          {currentStep > 1 && (
            <button type="button" onClick={prevStep} className="btn-secondary">
              Previous
            </button>
          )}
          {currentStep < 7 ? (
            <button type="button" onClick={nextStep} className="btn-next">
              Next
            </button>
          ) : (
            <button type="submit" disabled={isSubmitting} className="btn-primary">
              {isSubmitting ? 'Submitting...' : 'Submit Application'}
            </button>
          )}
        </div>
      </form>

      {/* Error Modal */}
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