import React from 'react';

const Homepage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-blue-600 text-white py-20 text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to I-DevR Code</h1>
        <p className="text-xl max-w-2xl mx-auto">
          Build your custom app, get expert coding solutions, or repair your computer with us.
        </p>
        <div className="mt-8 space-x-4">
          <a href="/app-builder" className="bg-white text-blue-600 px-6 py-3 rounded font-semibold hover:bg-gray-100 transition">
            Try the App Builder
          </a>
          <a href="/services" className="bg-white text-blue-600 px-6 py-3 rounded font-semibold hover:bg-gray-100 transition">
            Get a Quote
          </a>
          <a href="/services#repairs" className="bg-white text-blue-600 px-6 py-3 rounded font-semibold hover:bg-gray-100 transition">
            Request Repair
          </a>
        </div>
      </header>

      <section className="max-w-6xl mx-auto py-16 px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white p-6 rounded shadow hover:shadow-lg transition">
          <h2 className="text-2xl font-semibold mb-2">App Builder</h2>
          <p>Build your custom app with our easy-to-use builder. Preview, pay, and download your app.</p>
        </div>
        <div className="bg-white p-6 rounded shadow hover:shadow-lg transition">
          <h2 className="text-2xl font-semibold mb-2">Custom Coding</h2>
          <p>Expert coding solutions tailored to your project needs. Consultation and quotes available.</p>
        </div>
        <div className="bg-white p-6 rounded shadow hover:shadow-lg transition" id="repairs">
          <h2 className="text-2xl font-semibold mb-2">Computer Repairs</h2>
          <p>Reliable and fast computer repair services. Request a repair appointment today.</p>
        </div>
      </section>
    </div>
  );
};

export default Homepage;
