import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const SolutionAccordion = ({ title, description, features }) => {
    const [isOpen, setIsOpen] = useState(false);
  
    return (
      <div className="glass-card rounded-lg overflow-hidden mb-4">
        <button
        className="w-full px-6 py-4 flex items-center justify-between bg-gray-800 hover:bg-gray-750 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="text-xl font-semibold">{title}</h3>
        {isOpen ? <ChevronUp /> : <ChevronDown />}
      </button>
      
      {isOpen && (
        <div className="px-6 py-4 bg-gray-800/50">
          <p className="text-gray-300 mb-4">{description}</p>
          <ul className="list-disc list-inside text-gray-300 space-y-2">
            {features.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

const Solutions = () => {
  const solutions = [
    {
      title: "Enterprise Security Suite",
      description: "Complete protection for large organizations with complex security needs.",
      features: [
        "Advanced threat detection and response",
        "24/7 security monitoring",
        "Enterprise-wide encryption",
        "Custom security policies",
        "Compliance management"
      ]
    },
    {
      title: "Small Business Protection",
      description: "Tailored security solutions for small and medium-sized businesses.",
      features: [
        "Essential threat protection",
        "Cloud security",
        "Email security",
        "Remote work security",
        "Security awareness training"
      ]
    },
    {
      title: "Government & Infrastructure",
      description: "Specialized security solutions for government agencies and critical infrastructure.",
      features: [
        "Advanced persistent threat protection",
        "Classified data security",
        "Infrastructure security",
        "Zero trust architecture",
        "Compliance with government standards"
      ]
    },
    {
      title: "Healthcare Security",
      description: "HIPAA-compliant security solutions for healthcare organizations.",
      features: [
        "Patient data protection",
        "Medical device security",
        "Healthcare compliance",
        "Secure telehealth solutions",
        "Access control systems"
      ]
    }
  ];

  return (
    <div className="min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-6 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
          Security Solutions
        </h1>
        <p className="text-xl text-gray-300 text-center max-w-3xl mx-auto mb-16">
          Tailored cybersecurity solutions to meet the unique needs of your organization.
        </p>
        
        <div className="space-y-6">
          {solutions.map((solution, index) => (
            <SolutionAccordion key={index} {...solution} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Solutions;