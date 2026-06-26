export const apiFetch = async (endpoint, options = {}) => {
  const token = localStorage.getItem('token');
  
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  // If there's no body, or if it's GET/HEAD, we just pass options
  return await fetch(endpoint, {
    ...options,
    headers,
  });
};
