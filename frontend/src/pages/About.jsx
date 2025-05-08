import React from 'react';

const About = () => {
  return (
    <div className="min-h-screen max-w-6xl mx-auto p-8">
      <h1 className="text-4xl font-bold mb-6">About Us</h1>
      <p className="mb-4">
        At I-DevR Code, our mission is to empower businesses and individuals with custom software solutions tailored to their unique needs.
      </p>
      <p className="mb-4">
        We value quality, innovation, and customer satisfaction. Our team of experts brings years of experience in app development, custom coding, and computer repairs.
      </p>
      <p className="mb-4">
        Based in Worcester, MA, we are proud to serve our local community with reliable and professional services.
      </p>
      <img
        src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg"
        alt="Worcester, MA"
        className="rounded shadow-md mt-6"
      />
    </div>
  );
};

export default About;
