const API_URL = process.env.REACT_APP_API_URL;

export const fetchHomepageData = async () => {
  const response = await fetch(`${API_URL}/api/homepage`);
  if (!response.ok) throw new Error('Failed to fetch homepage data');
  return response.json();
};

export const fetchAboutData = async () => {
  const response = await fetch(`${API_URL}/api/about`);
  if (!response.ok) throw new Error('Failed to fetch about data');
  return response.json();
};

export const fetchServicesData = async () => {
  const response = await fetch(`${API_URL}/api/services`);
  if (!response.ok) throw new Error('Failed to fetch services data');
  return response.json();
};

export const createPaymentIntent = async (amount, currency) => {
  const response = await fetch(`${API_URL}/api/payment/create-intent`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ amount, currency }),
  });
  if (!response.ok) throw new Error('Failed to create payment intent');
  return response.json();
};
