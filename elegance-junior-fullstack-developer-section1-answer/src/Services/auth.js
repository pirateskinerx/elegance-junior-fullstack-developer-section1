const API_URL = 'http://localhost:3000/api';

export const loginUser = async (credentials) => {
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify(credentials),
    });

    const data = await response.json();
    
    if (data.status === 'error') {
      throw new Error(data.message);
    }

    if (!data.user) {
      throw new Error('Invalid response from server');
    }

    return data.user;
  } catch (error) {
    console.error('Login error:', error);
    throw new Error(error.message || 'Login failed. Please try again.');
  }
};