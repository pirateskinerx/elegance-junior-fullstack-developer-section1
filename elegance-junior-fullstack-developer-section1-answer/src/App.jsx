import React from 'react';
import { Toaster } from 'react-hot-toast';
import LoginForm from './Components/LoginForm.jsx';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <LoginForm />
      <Toaster position="top-right" />
    </div>
  );
}

export default App;