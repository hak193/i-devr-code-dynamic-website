import React from 'react';

const Services = () => {
  return (
    <div className="min-h-screen max-w-6xl mx-auto p-8 space-y-12">
      <h1 className="text-4xl font-bold mb-6">Our Services</h1>

      <section>
        <h2 className="text-3xl font-semibold mb-4">Custom App Builder</h2>
        <p className="mb-2">
          Build your app with our easy process: Build → Preview (watermarked) → Pay → Download/Access.
        </p>
        <p className="mb-2">Pricing tiers: Basic, Pro, Enterprise.</p>
        <a href="/app-builder" className="text-blue-600 underline hover:text-blue-800">
          Try the App Builder
        </a>
      </section>

      <section>
        <h2 className="text-3xl font-semibold mb-4">Custom Coding Solutions</h2>
        <p className="mb-2">
          We handle various project types using modern tech stacks. Check out our portfolio and case studies.
        </p>
        <a href="/contact" className="text-blue-600 underline hover:text-blue-800">
          Get a Quote
        </a>
      </section>

      <section id="repairs">
        <h2 className="text-3xl font-semibold mb-4">Computer Repairs</h2>
        <p className="mb-2">
          Fast and reliable computer repair services. Request a repair appointment today.
        </p>
        <a href="/contact" className="text-blue-600 underline hover:text-blue-800">
          Request Repair
        </a>
      </section>
    </div>
  );
};

export default Services;
