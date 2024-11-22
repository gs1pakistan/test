import React from 'react';
import { Shield, Lock, Cloud, AlertTriangle, UserCheck, Wifi } from 'lucide-react';




const ServiceCard = ({ icon: Icon, title, description }) => (
    <div className="p-6 glass-card rounded-lg transform hover:-translate-y-1">
      <Icon className="h-12 w-12 text-cyan-500 mb-4" />
    <h3 className="text-xl font-bold mb-2">{title}</h3>
    <p className="text-gray-300">{description}</p>
  </div>
);

const Services = () => {
  const services = [
    {
      icon: Shield,
      title: "Threat Detection & Response",
      description: "24/7 monitoring and rapid response to security threats using AI-powered analytics."
    },
    {
      icon: Lock,
      title: "Endpoint Security",
      description: "Comprehensive protection for all devices connected to your network."
    },
    {
      icon: Cloud,
      title: "Cloud Security",
      description: "Secure cloud infrastructure and applications with advanced protection measures."
    },
    {
      icon: AlertTriangle,
      title: "Vulnerability Assessment",
      description: "Regular security audits and penetration testing to identify vulnerabilities."
    },
    {
      icon: UserCheck,
      title: "Identity Management",
      description: "Secure access control and authentication solutions for your organization."
    },
    {
      icon: Wifi,
      title: "Network Security",
      description: "Advanced firewall and network protection against cyber threats."
    }
  ];

  return (
    <div className="min-h-screen py-16">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-6 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
          Our Security Services
        </h1>
        <p className="text-xl text-gray-300 text-center max-w-3xl mx-auto">
          Comprehensive cybersecurity solutions designed to protect your business in an ever-evolving digital landscape.
        </p>
      </div>

      {/* Services Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard key={index} {...service} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;
